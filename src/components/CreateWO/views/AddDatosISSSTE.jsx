import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/es";

import { TextField, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function AddDatosISSSTE(props) {
	const [bitacora, setBitacora] = useState("");
	const [hrsReales, setHrsReales] = useState("");
	const [vidaUtil, setVidaUtil] = useState("");
	const [progStart, setProgStart] = useState(null);
	const [progEnd, setProgEnd] = useState(null);
	const [ubicacion, setUbicacion] = useState("");
	const [recomendaciones, setRecomendaciones] = useState("");
	const [conclusiones, setConclusiones] = useState("");
	const [fotoNormal, setFotoNormal] = useState(null);
	const [fotoSerie, setFotoSerie] = useState(null);
	const [fotoInventario, setFotoInventario] = useState(null);
	const [fotoPanoramica, setFotoPanoramica] = useState(null);
	const [angulo1, setAngulo1] = useState(0);
	const [angulo2, setAngulo2] = useState(0);
	const [angulo3, setAngulo3] = useState(0);
	const [angulo4, setAngulo4] = useState(0);
	const [dateError, setDateError] = useState(false);

	useEffect(() => {
		if (props.edit) {
			setBitacora(props.data.datos.datosISSSTE.bitacora);
			setHrsReales(props.data.datos.datosISSSTE.hrsReales);
			setVidaUtil(props.data.datos.datosISSSTE.vidaUtil);
			setProgStart(props.data.datos.datosISSSTE.progStart);
			setProgEnd(props.data.datos.datosISSSTE.progEnd);
			setUbicacion(props.data.datos.datosISSSTE.ubicacion);
			setRecomendaciones(props.data.datos.datosISSSTE.recomendaciones);
			setConclusiones(props.data.datos.datosISSSTE.conclusiones);
			setFotoNormal(props.data.datos.datosISSSTE.fotoNormal);
			setFotoSerie(props.data.datos.datosISSSTE.fotoSerie);
			setFotoInventario(props.data.datos.datosISSSTE.fotoInventario);
			setFotoPanoramica(props.data.datos.datosISSSTE.fotoPanoramica);
			setAngulo1(props.data.angulos.angulo1);
			setAngulo2(props.data.angulos.angulo2);
			setAngulo3(props.data.angulos.angulo3);
			setAngulo4(props.data.angulos.angulo4);
		}
	}, []);

	useEffect(() => {
		console.log(props);
		if (props.step === 5) {
			props.handleNext(true);
			if (progStart !== null && progEnd !== null) {
				let sdts = moment(progStart).startOf("day").valueOf();
				let edts = moment(progEnd).startOf("day").valueOf();
				console.log(sdts);
				console.log(edts);
				if (edts < sdts) {
					setDateError(true);
				} else {
					props.handleNext(false);
					setDateError(false);
				}
			}
		}
	}, [progStart, progEnd]);

	useEffect(() => {
		if (props.flag) {
			props.onDone({
				bitacora,
				hrsReales,
				vidaUtil,
				progStart,
				progEnd,
				ubicacion,
				recomendaciones,
				conclusiones,
				fotoNormal,
				fotoSerie,
				fotoInventario,
				fotoPanoramica,
			});
			props.onAngulos([angulo1, angulo2, angulo3, angulo4]);
		}
	}, [props.flag]);

	const subirFotoNormal = (e) => {
		if (e !== null) {
			let photo = new Image();
			console.log(e.target.files[0]);
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoNormal(photo.src);

			// localStorage.setItem("fotoNormalCache", JSON.stringify(photo.src));
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoNormal(e);
		}
	};

	const subirFotoSerie = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoSerie(photo.src);
			localStorage.setItem("fotoSerieCache", photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoSerie(e);
		}
	};

	const subirFotoInventario = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoInventario(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoInventario(e);
		}
	};
	const subirFotoPanoramica = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoPanoramica(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoPanoramica(e);
		}
	};

	return (
		<div className="views ISSSTE">
			<h3>Datos ISSSTE</h3>
			<div className="tresFr">
				<TextField
					label="N° Bitacora"
					fullWidth
					variant="outlined"
					type="text"
					inputProps={{
						maxLength: 4,
						inputMode: "numeric",
					}}
					size="small"
					value={bitacora}
					onChange={(e) => {
						setBitacora(e.target.value);
					}}
				/>
				<TextField
					label="Hrs reales"
					fullWidth
					variant="outlined"
					type="text"
					inputProps={{
						maxLength: 5,
						inputMode: "decimal",
					}}
					size="small"
					value={hrsReales}
					onChange={(e) => {
						setHrsReales(e.target.value);
					}}
				/>
				<TextField
					label="Vida útil (años)"
					fullWidth
					variant="outlined"
					id="vidaUtil"
					type="text"
					inputProps={{
						maxLength: 2,
						inputMode: "numeric",
					}}
					size="small"
					value={vidaUtil}
					onChange={(e) => {
						setVidaUtil(e.target.value);
					}}
				/>
			</div>
			<p id="programado">Programado:</p>
			<div className="timers">
				<div className="inicio">
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DatePicker
							margin="dense"
							inputVariant="outlined"
							autoOk
							disableToolbar
							showTodayButton
							todayLabel="hoy"
							clearable
							clearLabel="borrar"
							okLabel=""
							cancelLabel=""
							format="DD/MM/YY"
							id="progStartProg"
							label="fecha inicio"
							value={progStart}
							onChange={(e) => {
								setProgStart(e);
							}}
						/>
					</MuiPickersUtilsProvider>
				</div>
				<div className="final">
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DatePicker
							margin="dense"
							inputVariant="outlined"
							autoOk
							disableToolbar
							showTodayButton
							todayLabel="hoy"
							clearable
							clearLabel="borrar"
							okLabel=""
							cancelLabel=""
							format="DD/MM/YY"
							id="progEndProg"
							label="fecha final"
							value={progEnd}
							onChange={(e) => {
								setProgEnd(e);
							}}
						/>
					</MuiPickersUtilsProvider>
				</div>
			</div>
			{dateError ? (
				<p id="dateError">Verifica que las fechas sean correctas</p>
			) : null}
			<TextField
				label="Ubicación"
				fullWidth
				variant="outlined"
				size="small"
				type="text"
				value={ubicacion}
				onChange={(e) => {
					setUbicacion(e.target.value);
				}}
			/>
			<TextField
				label="Recomendaciones"
				fullWidth
				multiline
				rows={2}
				value={recomendaciones}
				variant="outlined"
				helperText={`${recomendaciones.split(" ").length - 1}/52`}
				inputProps={{
					maxLength:
						recomendaciones.split(" ").length === 53
							? recomendaciones.length
							: 800,
				}}
				onChange={(e) => {
					setRecomendaciones(e.target.value);
				}}
			/>
			<TextField
				label="Conclusiones"
				fullWidth
				multiline
				rows={2}
				value={conclusiones}
				variant="outlined"
				helperText={`${conclusiones.split(" ").length - 1}/52`}
				inputProps={{
					maxLength:
						conclusiones.split(" ").length === 53 ? conclusiones.length : 800,
				}}
				onChange={(e) => {
					setConclusiones(e.target.value);
				}}
			/>
			<div className="row">
				{fotoNormal ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo1((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo1((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b className="btnDelete" onClick={() => subirFotoNormal(null)}>
							X
						</b>
						<img
							src={fotoNormal}
							alt="antes1"
							style={{
								transform: `rotate(${angulo1}deg)`,
								width: "inherit",
								height: "inherit",
							}}
						/>
					</div>
				) : (
					<div className="cell">
						<input
							accept="image/*"
							className="inputPhoto"
							id="antes1"
							onChange={(e) => {
								subirFotoNormal(e);
							}}
							type="file"
						/>
						<label className="labelImg" htmlFor="antes1">
							Foto Normal
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoSerie ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo2((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo2((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b className="btnDelete" onClick={() => subirFotoSerie(null)}>
							X
						</b>
						<img
							src={fotoSerie}
							alt="antes2"
							style={{
								transform: `rotate(${angulo2}deg)`,
								width: "inherit",
								height: "inherit",
							}}
						/>
					</div>
				) : (
					<div className="cell">
						<input
							accept="image/*"
							className="inputPhoto"
							id="antes2"
							onChange={(e) => {
								subirFotoSerie(e);
							}}
							type="file"
						/>
						<label className="labelImg" htmlFor="antes2">
							Placa N° de Serie
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
			</div>
			<div className="row">
				{fotoInventario ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo3((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo3((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b className="btnDelete" onClick={() => subirFotoInventario(null)}>
							X
						</b>
						<img
							src={fotoInventario}
							alt="durante1"
							style={{
								transform: `rotate(${angulo3}deg)`,
								width: "inherit",
								height: "inherit",
							}}
						/>
					</div>
				) : (
					<div className="cell">
						<input
							accept="image/*"
							className="inputPhoto"
							id="durante1"
							onChange={(e) => {
								subirFotoInventario(e);
							}}
							type="file"
						/>
						<label className="labelImg" htmlFor="durante1">
							Placa N° de Inventario
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoPanoramica ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo4((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo4((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b className="btnDelete" onClick={() => subirFotoPanoramica(null)}>
							X
						</b>
						<img
							src={fotoPanoramica}
							alt="durante2"
							style={{
								transform: `rotate(${angulo4}deg)`,
								width: "inherit",
								height: "inherit",
							}}
						/>
					</div>
				) : (
					<div className="cell">
						<input
							accept="image/*"
							className="inputPhoto"
							id="durante2"
							onChange={(e) => {
								subirFotoPanoramica(e);
							}}
							type="file"
						/>
						<label className="labelImg" htmlFor="durante2">
							Foto panorámica del bien
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
			</div>
		</div>
	);
}

export default AddDatosISSSTE;
