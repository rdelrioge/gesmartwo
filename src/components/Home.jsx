import React, { useState, useEffect } from "react";
import "./home.scss";
import moment from "moment";
import "moment/locale/es";

import { MobileStepper, Button, Switch } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import AddEvidencia from "./AddEvidencia";
import AddDatosISSSTE from "./AddDatosISSSTE";
import View1SSO from "./views/View1SSO";
import View2DatosIniciales from "./views/View2DatosIniciales";
import View3DatosDelServicio from "./views/View3DatosDelServicio";
import View4PeriodoDeServicio from "./views/View4PeriodoDeServicio";
import View5Herramientas from "./views/View5Herramientas";
import View6Refacciones from "./views/View6Refacciones";

moment.locale("es");
function Home() {
	// homeLayout
	const [activeStep, setActiveStep] = useState(0); //7 para ver print
	const [nextDisabled, setNextDisabled] = useState(true);
	const [datos, setDatos] = useState({});
	// view1 SSO [0]
	const [inge, setInge] = useState(null);
	// view2 SID CASE WO [1]
	const [equipo, setEquipo] = useState(null);
	//view 7 Fotos [6] IMSS
	const [fotoAntes1, setFotoAntes1] = useState(null);
	const [fotoAntes2, setFotoAntes2] = useState(null);
	const [fotoDurante1, setFotoDurante1] = useState(null);
	const [fotoDurante2, setFotoDurante2] = useState(null);
	const [fotoDespues1, setFotoDespues1] = useState(null);
	const [fotoDespues2, setFotoDespues2] = useState(null);
	// view 7 ISSSTE
	const [flagFinish, setFlagFinish] = useState(false);
	// view 7
	const [flagAddFotos, setFlagAddFotos] = useState(false);
	// print
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
		if (activeStep !== 7) {
			setFlagFinish(false);
		}
	}, [activeStep]);

	return (
		<div className={activeStep === 7 ? "home scrollHome " : "home"}>
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			{!flagFinish ? (
				<>
					<SwipeableViews disabled index={activeStep}>
						<div className="views view1">
							<View1SSO
								step={activeStep}
								handleNext={(nD) => {
									setNextDisabled(nD);
								}}
								onDone={(_miinge) => {
									setInge(_miinge);
									setDatos({ ...datos, inge: _miinge });
								}}
							/>
						</div>
						<div className="views view2">
							<View2DatosIniciales
								step={activeStep}
								handleNext={(nD) => {
									setNextDisabled(nD);
								}}
								onDone={(_micase, _miwo, _miequipo) => {
									setEquipo(_miequipo);
									setDatos({
										...datos,
										case: _micase,
										wo: _miwo,
										equipo: _miequipo,
									});
								}}
							/>
						</div>
						<div className="views view3">
							<View3DatosDelServicio
								step={activeStep}
								flag={activeStep === 3 ? true : false}
								handleNext={(nD) => {
									setNextDisabled(nD);
								}}
								onDone={(
									_mitipoDeServicio,
									_mitipoDeContrato,
									_misintoma,
									_midescripcion,
									_miapto,
									_mifuncionando,
									_miobservaciones,
									_micondiciones
								) => {
									setDatos({
										...datos,
										tipoDeServicio: _mitipoDeServicio,
										tipoDeContrato: _mitipoDeContrato,
										sintoma: _misintoma,
										descripcion: _midescripcion,
										apto: _miapto,
										funcionando: _mifuncionando,
										observaciones: _miobservaciones,
										condiciones: _micondiciones,
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
								onDone={(_mitiempos) => {
									setDatos({
										...datos,
										tiempos: _mitiempos,
									});
								}}
							/>
						</div>
						<div className="views view5">
							<View5Herramientas
								flag={activeStep === 5 ? true : false}
								onDone={(_miherramientas) => {
									setDatos({
										...datos,
										herramientas: _miherramientas,
									});
								}}
							/>
						</div>
						<div className="views view6">
							<View6Refacciones
								flag={activeStep === 6 ? true : false}
								onDone={(_mirefacciones) => {
									setDatos({
										...datos,
										refacciones: _mirefacciones,
									});
								}}
							/>
						</div>
						{equipo && equipo.cliente === "IMSS" ? (
							<AddEvidencia
								cliente={equipo.cliente}
								fotoAntes1={fotoAntes1}
								fotoAntes2={fotoAntes2}
								fotoDurante1={fotoDurante1}
								fotoDurante2={fotoDurante2}
								fotoDespues1={fotoDespues1}
								fotoDespues2={fotoDespues2}
								changeFotoAntes1={(e) => setFotoAntes1(e)}
								changeFotoAntes2={(e) => setFotoAntes2(e)}
								changeFotoDurante1={(e) => setFotoDurante1(e)}
								changeFotoDurante2={(e) => setFotoDurante2(e)}
								changeFotoDespues1={(e) => setFotoDespues1(e)}
								changeFotoDespues2={(e) => setFotoDespues2(e)}
							/>
						) : equipo && equipo.cliente === "ISSSTE" ? (
							<AddDatosISSSTE
								flag={activeStep === 7 ? true : false}
								onDone={(_midatosISSSTE) => {
									console.log(_midatosISSSTE);
									setDatos({
										...datos,
										datosISSSTE: _midatosISSSTE,
									});
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
										fotoAntes1={fotoAntes1}
										fotoAntes2={fotoAntes2}
										fotoDurante1={fotoDurante1}
										fotoDurante2={fotoDurante2}
										fotoDespues1={fotoDespues1}
										fotoDespues2={fotoDespues2}
										changeFotoAntes1={(e) => setFotoAntes1(e)}
										changeFotoAntes2={(e) => setFotoAntes2(e)}
										changeFotoDurante1={(e) => setFotoDurante1(e)}
										changeFotoDurante2={(e) => setFotoDurante2(e)}
										changeFotoDespues1={(e) => setFotoDespues1(e)}
										changeFotoDespues2={(e) => setFotoDespues2(e)}
									/>
								) : null}
							</div>
						)}
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
				</>
			) : (
				<div className="revisar">
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
						<Print
							// data={{
							// 	sso,
							// 	inge,
							// 	sid,
							// 	caso,
							// 	wo,
							// 	equipo,
							// 	ubicacion,
							// 	tipoDeServicio,
							// 	tipoDeContrato,
							// 	sintoma,
							// 	descripcion,
							// 	apto,
							// 	funcionando,
							// 	observaciones,
							// 	condiciones,
							// 	tiempos,
							// 	herramientas,
							// 	refacciones,
							// 	bitacora,
							// 	hrsReales,
							// 	vidaUtil,
							// 	recomendaciones,
							// 	conclusiones,
							// 	fotoAntes1,
							// 	fotoAntes2,
							// 	fotoDurante1,
							// 	fotoDurante2,
							// 	fotoDespues1,
							// 	fotoDespues2,
							// 	flagAddFotos,
							// }}
							data={datos}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
