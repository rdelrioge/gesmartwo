import React, { useState, useEffect } from "react";
import "./home.scss";
import moment from "moment";
import "moment/locale/es";

import { MobileStepper, Button, Switch } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import Print from "./hojas/Print";
import SkeletorWO from "./hojas/SkeletorWO";

import AddEvidencia from "./views/AddEvidencia";
import AddDatosISSSTE from "./views/AddDatosISSSTE";
import View1SSO from "./views/View1SSO";
import View2DatosIniciales from "./views/View2DatosIniciales";
import View3DatosDelServicio from "./views/View3DatosDelServicio";
import View4PeriodoDeServicio from "./views/View4PeriodoDeServicio";
import View5Herramientas from "./views/View5Herramientas";
import View6Refacciones from "./views/View6Refacciones";

moment.locale("es");
function Home() {
	// global variables
	const [activeStep, setActiveStep] = useState(0); //7 para ver print
	const [datos, setDatos] = useState({});
	// multicomponent and conditional
	const [inge, setInge] = useState(null);
	const [equipo, setEquipo] = useState(null);
	const [angulos, setAngulos] = useState([]);
	// flags
	const [nextDisabled, setNextDisabled] = useState(true);
	const [flagAddFotos, setFlagAddFotos] = useState(false);
	const [flagManual, setFlagManual] = useState(false);
	const [flagFinish, setFlagFinish] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		if (activeStep === 6) {
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
		if (activeStep === 7) {
			setFlagFinish(true);
		}
	}, [datos]);

	useEffect(() => {
		console.log(activeStep);
		if (activeStep === 7) {
			setFlagFinish(true);
		} else {
			setFlagFinish(false);
		}
	}, [activeStep]);

	return (
		<div className={activeStep === 7 ? "home scrollHome " : "home"}>
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			<div className={flagFinish ? "hideViews" : "showViews"}>
				<SwipeableViews disabled index={activeStep}>
					<div className="views view1">
						<View1SSO
							step={activeStep}
							handleNext={(nD) => {
								setNextDisabled(nD);
							}}
							onDone={(inge) => {
								setInge(inge);
								setDatos({ ...datos, inge });
							}}
						/>
					</div>
					<div className="views view2">
						<View2DatosIniciales
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
								});
							}}
						/>
					</div>
					<div className="views view3">
						<View3DatosDelServicio
							step={activeStep}
							equipo={equipo}
							flagManual={flagManual}
							flag={activeStep === 3 ? true : false}
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
							flag={activeStep === 5 ? true : false}
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
							flag={activeStep === 6 ? true : false}
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
								cliente={equipo.cliente}
								flag={activeStep === 7 ? true : false}
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
								flag={activeStep === 7 ? true : false}
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
										cliente={equipo.cliente}
										flag={activeStep === 7 ? true : false}
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
						steps={7}
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
								{activeStep === 6 ? "Finish" : "Next >"}
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
						onClick={() => setActiveStep(6)}>
						{"<"}
					</Button>
					<b>Revisa la WO </b>
					<Button
						variant="contained"
						color="primary"
						onClick={() => window.print()}>
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

export default Home;
