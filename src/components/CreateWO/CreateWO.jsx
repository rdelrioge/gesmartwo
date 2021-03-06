import React, { useState, useEffect } from "react";
import "./createWO.scss";
import moment from "moment";
import "../../../node_modules/moment/locale/es";

import { localdb } from "../../index";

import { MobileStepper, Button, Switch, IconButton } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import Print from "../hojas/Print";
import SkeletorWO from "../hojas/SkeletorWO";

import AddEvidencia from "./views/AddEvidencia";
import AddDatosISSSTE from "./views/AddDatosISSSTE";
import View2DatosIniciales from "./views/View2DatosIniciales";
import View3DatosDelServicio from "./views/View3DatosDelServicio";
import View4PeriodoDeServicio from "./views/View4PeriodoDeServicio";
import View5Herramientas from "./views/View5Herramientas";
import View6Refacciones from "./views/View6Refacciones";

moment.locale("es");
function CreateWO(props) {
	// global variables
	const [activeStep, setActiveStep] = useState(0); //6 para ver print
	const [datos, setDatos] = useState({});
	// multicomponent and conditional
	const [inge, setInge] = useState(props.inge);
	const [equipo, setEquipo] = useState(null);
	const [angulos, setAngulos] = useState([]);
	// flags
	const [nextDisabled, setNextDisabled] = useState(true);
	const [flagAddFotos, setFlagAddFotos] = useState(false);
	const [flagAddCapacitacion, setFlagAddCapacitacion] = useState(false);
	const [flagManual, setFlagManual] = useState(false);
	const [flagFinish, setFlagFinish] = useState(false);
	const [loading, setLoading] = useState(true);
	const [tituloOriginal, setTituloOriginal] = useState(document.title);
	const [title, setTitle] = useState(document.title);

	useEffect(() => {
		if (props.edit) {
			if (props.data) {
				console.log(props.data);
				setDatos(props.data.datos);
				setInge(props.data.datos.inge);
				setEquipo(props.data.datos.equipo);
				setAngulos(props.data.angulos);
				setNextDisabled(props.data.nextDisabled);
				setFlagAddFotos(props.data.flagAddFotos);
				setFlagAddCapacitacion(props.data.flagAddCapacitacion);
				setFlagManual(props.data.flagManual);
			}
		}
	}, []);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		if (activeStep === 5) {
			setLoading(true);
			const timer = setTimeout(() => {
				setLoading(false);
			}, 2500);
			return () => clearTimeout(timer);
		}
	};

	const handleBack = () => {
		if (
			equipo?.cliente === "ISSSTE" &&
			datos.condiciones === "Reprogramado" &&
			activeStep === 5
		) {
			setActiveStep(2);
		} else {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		}
	};

	useEffect(() => {
		if (equipo && equipo.cliente === "ISSSTE") {
			setDatos((prevDatos) => ({ ...prevDatos, fotos: "" }));
		}
		if (equipo && equipo.cliente === "IMSS") {
			setDatos((prevDatos) => ({ ...prevDatos, datosISSSTE: "" }));
		}
	}, [equipo]);

	useEffect(() => {
		if (equipo && equipo.cliente === "ISSSTE") {
			if (datos.condiciones === "Reprogramado") {
				if (activeStep === 3) {
					setActiveStep(5);
				}
			}
		} else {
			if (activeStep === 3 && datos.condiciones === "Reprogramado") {
				setFlagFinish(true);
				setLoading(true);
				const timer = setTimeout(() => {
					setLoading(false);
					setActiveStep(6);
				}, 2500);
				return () => {
					clearTimeout(timer);
				};
			}
		}

		if (activeStep === 6) {
			setFlagFinish(true);
		} else {
			setFlagFinish(false);
			setTitle(tituloOriginal);
		}
	}, [activeStep]);

	useEffect(() => {
		document.title = title;
		if (activeStep === 6) {
			window.print();
		}
	}, [title]);

	useEffect(() => {
		console.log(datos);
		if (flagFinish) {
			let datosActuales = {
				datos,
				angulos,
				nextDisabled,
				flagAddFotos,
				flagAddCapacitacion,
				flagManual,
			};
			console.log("Guardando en cache");
			console.log(datosActuales);
			localdb.datosRecientes.put({
				id: 1,
				name: "reciente",
				value: datosActuales,
			});
		}
	}, [datos]);

	return (
		<div className={activeStep === 6 ? "home scrollHome " : "home"}>
			<IconButton
				className={flagFinish ? "hideViews" : "closeIcn  material-icons"}
				onClick={() => props.close()}>
				close
			</IconButton>
			<div className={flagFinish ? "hideViews" : "showViews"}>
				<SwipeableViews disabled index={activeStep}>
					<div className="views view2">
						<View2DatosIniciales
							edit={props.edit}
							data={props.data}
							step={activeStep}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							onDone={(caso, wo, equipo, manualFlag) => {
								setEquipo(equipo);
								setFlagManual(manualFlag);
								setDatos({
									...datos,
									case: caso,
									wo,
									equipo,
									inge,
								});
							}}
						/>
					</div>
					<div className="views view3">
						<View3DatosDelServicio
							edit={props.edit}
							data={props.data}
							step={activeStep}
							equipo={equipo}
							flagManual={flagManual}
							flag={activeStep === 2 ? true : false}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							onDone={(
								tipoDeServicio,
								tipoDeContrato,
								contrato,
								gonDeInstalacion,
								sintoma,
								descripcion,
								apto,
								funcionando,
								observaciones,
								condiciones,
								reprogramado,
								fechaDeReprogramacion
							) => {
								// equipo.cliente === ""
								// 	?
								setDatos({
									...datos,
									tipoDeServicio,
									tipoDeContrato,
									equipo: {
										...equipo,
										contrato,
									},
									sintoma,
									gonDeInstalacion,
									descripcion,
									apto,
									funcionando,
									observaciones,
									condiciones,
									reprogramado,
									fechaDeReprogramacion,
								});
								// 		: setDatos({
								// 				...datos,
								// 				tipoDeServicio,
								// 				tipoDeContrato,
								// 				gonDeInstalacion,
								// 				sintoma,
								// 				descripcion,
								// 				apto,
								// 				funcionando,
								// 				observaciones,
								// 				condiciones,
								// 				reprogramado,
								// 				fechaDeReprogramacion,
								// 		  });
							}}
						/>
					</div>
					<div className="views view4">
						<View4PeriodoDeServicio
							edit={props.edit}
							datos={datos}
							tps={datos.tipoDeServicio}
							step={activeStep}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							onDone={(tiempos) => {
								setDatos({
									...datos,
									tiempos,
								});
							}}
						/>
					</div>

					<div className="views view5">
						<View5Herramientas
							edit={props.edit}
							data={props.data}
							step={activeStep}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							flag={activeStep === 4 ? true : false}
							onDone={(herramientas) => {
								setDatos({
									...datos,
									herramientas,
								});
							}}
						/>
					</div>
					<div className="views view6">
						<View6Refacciones
							edit={props.edit}
							data={props.data}
							step={activeStep}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							flag={activeStep === 5 ? true : false}
							onDone={(refacciones) => {
								setDatos({
									...datos,
									refacciones,
								});
							}}
						/>
					</div>
					<div className=" views viewPorCliente">
						{equipo && equipo.cliente === "IMSS" ? (
							<>
								<AddEvidencia
									edit={props.edit}
									data={props.data}
									cliente={equipo.cliente}
									flag={activeStep === 6 ? true : false}
									onDone={(fotos) => {
										setDatos({
											...datos,
											fotos,
										});
									}}
									onAngulos={(angs) => {
										setAngulos(angs);
									}}
								/>
								<div className="switchHojaCapacitacion">
									<b>Desea incluir la hoja de Capacitacion?</b>
									<Switch
										onChange={(e) => setFlagAddCapacitacion(e.target.checked)}
									/>
								</div>
							</>
						) : equipo && equipo.cliente === "ISSSTE" ? (
							<AddDatosISSSTE
								edit={props.edit}
								datos={datos}
								angulos={props.data.angulos}
								flag={activeStep === 6 ? true : false}
								step={activeStep}
								handleNext={(nD) => {
									setNextDisabled(nD);
								}}
								onDone={(datosISSSTE) => {
									console.log(datosISSSTE);
									setDatos({
										...datos,
										datosISSSTE,
									});
								}}
								onAngulos={(angs) => {
									setAngulos(angs);
								}}
							/>
						) : equipo && equipo.cliente === "ISAPEG" ? (
							<div className="views ISAPEG">
								<h3>Datos ISAPEG</h3>
							</div>
						) : (
							<div className="views">
								<div className="headerAddFotos">
									<b>¿Agregar Evidencia Fotográfica?</b>
									<Switch onChange={(e) => setFlagAddFotos(e.target.checked)} />
								</div>
								{equipo && flagAddFotos ? (
									<AddEvidencia
										edit={props.edit}
										data={props.data}
										cliente={equipo.cliente}
										flag={activeStep === 6 ? true : false}
										onDone={(fotos) => {
											setDatos({
												...datos,
												fotos,
											});
										}}
										onAngulos={(angs) => {
											setAngulos(angs);
										}}
									/>
								) : null}
							</div>
						)}
					</div>
				</SwipeableViews>
				{inge ? (
					<MobileStepper
						steps={6}
						position="bottom"
						variant="progress"
						activeStep={activeStep}
						nextButton={
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={handleNext}
								disabled={nextDisabled}>
								{equipo?.cliente === "IMSS" &&
								datos.condiciones === "Reprogramado" &&
								activeStep === 2
									? "Finish"
									: activeStep === 5
									? "Finish"
									: "Next >"}
							</Button>
						}
						backButton={
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={handleBack}
								disabled={activeStep === 0}>
								{"<"} Back
							</Button>
						}
					/>
				) : null}
			</div>
			<div className={flagFinish ? "showRevisar" : "hideRevisar"}>
				<div className="revHeader">
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							equipo.cliente === "IMSS" && datos.condiciones === "Reprogramado"
								? setActiveStep(2)
								: setActiveStep(5);
						}}>
						{"<"}
					</Button>
					<b>Revisa la WO </b>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							if (title === tituloOriginal) {
								setTitle(
									`SmartWO ${datos.wo} ${datos.equipo.hospital} ${
										datos.equipo.sid
									} ${moment(datos.tiempos[datos.tiempos.length - 1][3]).format(
										"DD-MMM-YYYY"
									)}`
								);
							} else {
								window.print();
							}
						}}>
						Print
					</Button>
				</div>
				{loading ? (
					<>
						<SkeletorWO />
					</>
				) : (
					<Print
						data={datos}
						flagAddFotos={flagAddFotos}
						flagAddCapacitacion={flagAddCapacitacion}
						angulos={angulos}
						editFlag={props.edit}
					/>
				)}
			</div>
		</div>
	);
}

export default CreateWO;
