import React, { useState, useEffect } from "react";

import { Button, TextField } from "@material-ui/core";

import AddManual from "./AddManual";
import { db } from "../../index";

function View2DatosIniciales(props) {
	const [sid, setSID] = useState("");
	const [caso, setCaso] = useState("");
	const [wo, setWO] = useState("");
	const [equipo, setEquipo] = useState(null);
	const [showAddManual, setShowAddManual] = useState(false);
	const [openAddManualDrawer, setOpenAddManualDrawer] = useState(false);
	const [hideInfo, setHideInfo] = useState(true);
	const [editar, setEditar] = useState(false);

	useEffect(() => {
		if (props.step === 1) {
			if (caso !== "" && wo !== "" && equipo) {
				equipo.hospital !== ""
					? props.handleNext(false)
					: props.handleNext(true);
			} else {
				props.handleNext(true);
			}
		}
	}, [caso, wo, equipo, props]);

	const changeSID = (value) => {
		setSID(value);
		if (equipo) {
			setHideInfo(true);
			props.handleNext(true);
			setEquipo(null);
			setShowAddManual(false);
			setEditar(false);
		}
	};
	const buscarSID = () => {
		db.collection("equipos")
			.where("sid", "==", sid)
			.get()
			.then((data) => {
				if (data.empty) {
					setEquipo({
						cliente: "",
						hospital: "",
						direccion: "",
						ciudad: "",
						estado: "",
						equipo: "",
						modelo: "",
						serie: "",
						contrato: "",
					});
					setHideInfo(true);
					props.handleNext(true);
					alert(
						"No existe el SID en la base de datos. Considera agregarlo manualmente"
					);
					setShowAddManual(true);
				} else {
					data.forEach((refa) => {
						let eq = { ...refa.data(), uid: refa.id };
						console.log(eq);
						setEquipo(eq);
						setHideInfo(false);
						props.onDone(caso, wo, eq);
						// setNextDisabled(false);
					});
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
			});
	};

	const closeAddManual = (eq, flag) => {
		if (flag) {
			setEquipo(eq);
			setHideInfo(false);
			console.log(equipo);
			props.onDone(caso, wo, eq);
		}
		setOpenAddManualDrawer(false);
	};

	return (
		<>
			<h3>Datos iniciales</h3>
			<TextField
				label="Case"
				fullWidth
				variant="outlined"
				type="tel"
				size="small"
				inputProps={{
					maxLength: 8,
				}}
				value={caso}
				onChange={(e) => setCaso(e.target.value)}
			/>
			<TextField
				label="Work Order"
				fullWidth
				variant="outlined"
				type="tel"
				inputProps={{
					maxLength: 11,
				}}
				size="small"
				value={wo}
				onFocus={() => {
					wo === "" ? setWO("WO-") : console.log();
				}}
				onChange={(e) => setWO(e.target.value.toUpperCase())}
			/>
			<TextField
				label="SID"
				required
				color="secondary"
				variant="outlined"
				size="small"
				inputProps={{
					maxLength: 20,
				}}
				type="text"
				onChange={(ev) => changeSID(ev.target.value.toUpperCase())}
				value={sid}
			/>
			<div className="searchAddBtns">
				<Button
					className="btnSID"
					size="small"
					variant="contained"
					color="primary"
					onClick={() => {
						buscarSID();
					}}>
					Buscar equipo
				</Button>
				{showAddManual ? (
					<>
						<Button
							className="btnSID"
							size="small"
							variant="contained"
							color="primary"
							onClick={() => {
								setOpenAddManualDrawer(true);
							}}>
							{editar ? "Editar equipo" : "Agregar equipo"}
						</Button>
						<AddManual
							open={openAddManualDrawer}
							equipo={equipo}
							sid={sid}
							title={editar ? "Editar" : "Agregar"}
							onClose={(eq, f) => {
								console.log(eq);
								if (eq) {
									setSID(eq.sid);
									closeAddManual(eq, f);
									setEditar(true);
								} else {
									closeAddManual(eq, f);
								}
							}}
						/>
					</>
				) : null}
			</div>

			<div className={hideInfo ? "info hideinfo" : "info"}>
				{hideInfo === false ? (
					<>
						<p>
							<b>Cliente: </b>
							{equipo.cliente}
						</p>
						<p>
							<b>Hospital: </b>
							{equipo.hospital}
						</p>
						<p>
							<b>Ciudad: </b>
							{equipo.ciudad}
						</p>
						<p>
							<b>Estado: </b>
							{equipo.estado}
						</p>
						<p>
							<b>Equipo: </b>
							{equipo.equipo}
						</p>
						<p>
							<b>Modelo: </b>
							{equipo.modelo}
						</p>
						<p>
							<b>Serie: </b>
							{equipo.serie}
						</p>
						<p>
							<b>Contrato: </b>
							{equipo.contrato}
						</p>
					</>
				) : (
					<div className="nada"></div>
				)}
			</div>
		</>
	);
}

export default View2DatosIniciales;
