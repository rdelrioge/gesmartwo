import React, { useState, useEffect } from "react";
import "./createWO.scss";
import moment from "moment";
import "../../../node_modules/moment/locale/es";
// import "./CreateWO/views/node_modules/moment/locale/es";

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
	const [flagManual, setFlagManual] = useState(false);
	const [flagFinish, setFlagFinish] = useState(false);
	const [loading, setLoading] = useState(true);
	const [tituloOriginal, setTituloOriginal] = useState(document.title);
	const [title, setTitle] = useState(document.title);

	useEffect(() => {
		if (props.edit) {
			console.log(props.data);
			setDatos(props.data.datos);
			setInge(props.data.datos.inge);
			setEquipo(props.data.datos.equipo);
			setAngulos(props.data.angulos);
			setNextDisabled(props.data.nextDisabled);
			setFlagAddFotos(props.data.flagAddFotos);
			setFlagManual(props.data.flagManual);
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
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		console.log(datos);
		if (activeStep === 6) {
			setFlagFinish(true);
			let datosActuales = {
				datos,
				angulos,
				nextDisabled,
				flagAddFotos,
				flagManual,
			};
			console.log(datosActuales);
			localStorage.setItem("datosActuales", JSON.stringify(datosActuales));
		}
	}, [datos]);

	useEffect(() => {
		console.log(activeStep);
		if (activeStep === 6) {
			setFlagFinish(true);
		} else {
			setFlagFinish(false);
			setTitle(tituloOriginal);
		}
	}, [activeStep]);

	useEffect(() => {
		console.log(title);
		document.title = title;
		if (activeStep === 6) {
			window.print();
		}
	}, [title]);

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
								console.log(manualFlag);
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
								sintoma,
								descripcion,
								apto,
								funcionando,
								observaciones,
								condiciones
							) => {
								equipo.cliente === ""
									? setDatos({
											...datos,
											tipoDeServicio,
											tipoDeContrato,
											equipo: {
												...equipo,
												contrato,
											},
											sintoma,
											descripcion,
											apto,
											funcionando,
											observaciones,
											condiciones,
									  })
									: setDatos({
											...datos,
											tipoDeServicio,
											tipoDeContrato,
											sintoma,
											descripcion,
											apto,
											funcionando,
											observaciones,
											condiciones,
									  });
							}}
						/>
					</div>
					<div className="views view4">
						<View4PeriodoDeServicio
							edit={props.edit}
							data={props.data}
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
							flag={activeStep === 5 ? true : false}
							onDone={(refacciones) => {
								setDatos({
									...datos,
									refacciones,
								});
							}}
						/>
					</div>
					<div>
						{equipo && equipo.cliente === "IMSS" ? (
							<AddEvidencia
								edit={props.edit}
								data={props.data}
								cliente={equipo.cliente}
								flag={activeStep === 6 ? true : false}
								onDone={(fotos) => {
									console.log(fotos);
									setDatos({
										...datos,
										fotos,
									});
								}}
								onAngulos={(angs) => {
									console.log(angs);
									setAngulos(angs);
								}}
							/>
						) : equipo && equipo.cliente === "ISSSTE" ? (
							<AddDatosISSSTE
								edit={props.edit}
								data={props.data}
								flag={activeStep === 6 ? true : false}
								onDone={(datosISSSTE) => {
									console.log(datosISSSTE);
									setDatos({
										...datos,
										datosISSSTE,
									});
								}}
								onAngulos={(angs) => {
									console.log(angs);
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
											console.log(fotos);
											setDatos({
												...datos,
												fotos,
											});
										}}
										onAngulos={(angs) => {
											console.log(angs);
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
								{activeStep === 5 ? "Finish" : "Next >"}
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
						onClick={() => setActiveStep(5)}>
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
									} ${datos.tiempos[datos.tiempos.length - 1][3].format(
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
					<Print data={datos} flagAddFotos={flagAddFotos} angulos={angulos} />
				)}
			</div>
		</div>
	);
}

export default CreateWO;
