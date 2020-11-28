import React, { useState, useEffect } from "react";
import "./home.scss";
import moment from "moment";
import "moment/locale/es";

import {
	MobileStepper,
	Button,
	TextField,
	InputLabel,
	FormControl,
	Select,
	Switch,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import { db } from "../index";
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
	const [sso, setSSO] = useState("");
	const [inge, setInge] = useState(null);
	// view2 SID CASE WO [1]
	const [sid, setSID] = useState("");
	const [caso, setCaso] = useState("");
	const [wo, setWO] = useState("");
	const [equipo, setEquipo] = useState(null);
	const [showAddManual, setShowAddManual] = useState(false);
	const [openAddManualDrawer, setOpenAddManualDrawer] = useState(false);
	// view3 Servicio [2]
	const [tipoDeServicio, setTipoDeServicio] = useState("");
	const [tipoDeContrato, setTipoDeContrato] = useState("Contrato");
	const [sintoma, setSintoma] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [apto, setApto] = useState(true);
	const [funcionando, setFuncionando] = useState(true);
	const [observaciones, setObservaciones] = useState("");
	const [condiciones, setCondiciones] = useState("Funcionando");
	// view 4 Tiempos [3]
	const [tiempos, setTiempos] = useState([]);
	const [tipoDeTrabajo, setTipoDeTrabajo] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [endTime, setEndTime] = useState(null);
	// view 5 Herramientas [4]
	const [herramientas, setHerramientas] = useState([]);
	const [calibracion, setCalibracion] = useState(null);
	const [barcode, setBarcode] = useState("");
	const [herramienta, setHerramienta] = useState("");
	// view 6 Refacciones [5]
	const [refacciones, setRefacciones] = useState([]);
	const [cantidad, setCantidad] = useState("");
	const [parte, setParte] = useState("");
	const [descripcionParte, setDescripcionParte] = useState("");
	const [orden, setOrden] = useState("");
	//view 7 Fotos [6] IMSS
	const [fotoAntes1, setFotoAntes1] = useState(null);
	const [fotoAntes2, setFotoAntes2] = useState(null);
	const [fotoDurante1, setFotoDurante1] = useState(null);
	const [fotoDurante2, setFotoDurante2] = useState(null);
	const [fotoDespues1, setFotoDespues1] = useState(null);
	const [fotoDespues2, setFotoDespues2] = useState(null);
	// view 7 ISSSTE
	const [bitacora, setBitacora] = useState("");
	const [hrsReales, setHrsReales] = useState("");
	const [vidaUtil, setVidaUtil] = useState("");
	const [ubicacion, setUbicacion] = useState("");
	const [recomendaciones, setRecomendaciones] = useState("");
	const [conclusiones, setConclusiones] = useState("");
	// view 7
	const [flagAddFotos, setFlagAddFotos] = useState(false);
	// print
	const [hideInfo, setHideInfo] = useState(true);
	const [loading, setLoading] = useState(false);

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

	// Habilitar o deshabilitar el next button
	// useEffect(() => {
	// 	switch (activeStep) {
	// 		case 0:
	// 			// inge ? setNextDisabled(false) : setNextDisabled(true);
	// 			break;
	// 		case 1:
	// 			// if (caso !== "" && wo !== "" && equipo) {
	// 			// 	setNextDisabled(false);
	// 			// } else {
	// 			// 	setNextDisabled(true);
	// 			// }
	// 			break;
	// 		case 2:
	// 			if (
	// 				tipoDeServicio !== "" &&
	// 				tipoDeContrato !== "" &&
	// 				sintoma !== "" &&
	// 				descripcion !== "" &&
	// 				condiciones !== ""
	// 			) {
	// 				setNextDisabled(false);
	// 			} else {
	// 				setNextDisabled(true);
	// 			}
	// 			break;
	// 		case 3:
	// 			tiempos.length > 0 ? setNextDisabled(false) : setNextDisabled(true);
	// 			break;
	// 		case 4:
	// 			setNextDisabled(false);
	// 			break;
	// 		case 5:
	// 			setNextDisabled(false);
	// 			break;
	// 		case 6:
	// 			// if (equipo.cliente === "" || equipo.cliente === "Otro") {
	// 			//   handleNext();
	// 			// }
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }, [
	// 	activeStep,
	// 	tipoDeServicio,
	// 	tipoDeContrato,
	// 	sintoma,
	// 	descripcion,
	// 	tiempos,
	// 	caso,
	// 	wo,
	// 	equipo,
	// ]);

	useEffect(() => {
		console.log(datos);
	}, [datos]);

	return (
		<div className={activeStep === 7 ? "home scrollHome " : "home"}>
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			{activeStep < 7 ? (
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
									setCaso(_micase);
									setWO(_miwo);
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
									setTipoDeServicio(_mitipoDeServicio);
									setTipoDeContrato(_mitipoDeContrato);
									setSintoma(_misintoma);
									setDescripcion(_midescripcion);
									setApto(_miapto);
									setFuncionando(_mifuncionando);
									setObservaciones(_miobservaciones);
									setCondiciones(_micondiciones);
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
									setTiempos(_mitiempos);
									setDatos({
										...datos,
										tiempos: _mitiempos,
									});
								}}
							/>
						</div>
						<div className="views view5">
							<View5Herramientas
								onDone={(_miherramientas) => {
									setHerramientas(_miherramientas);
									setDatos({
										...datos,
										herramientas: _miherramientas,
									});
								}}
							/>
						</div>
						<div className="views view6">
							<View6Refacciones
								onDone={(_mirefacciones) => {
									setRefacciones(_mirefacciones);
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
								bitacora={bitacora}
								hrsReales={hrsReales}
								vidaUtil={vidaUtil}
								ubicacion={ubicacion}
								recomendaciones={recomendaciones}
								conclusiones={conclusiones}
								fotoAntes1={fotoAntes1}
								fotoAntes2={fotoAntes2}
								fotoDurante1={fotoDurante1}
								fotoDurante2={fotoDurante2}
								changeBitacora={(e) => setBitacora(e)}
								changeHrsReales={(e) => setHrsReales(e)}
								changeVidaUtil={(e) => setVidaUtil(e)}
								changeUbicacion={(e) => setUbicacion(e)}
								changeRecomendaciones={(e) => setRecomendaciones(e)}
								changeConclusiones={(e) => setConclusiones(e)}
								changeFotoAntes1={(e) => setFotoAntes1(e)}
								changeFotoAntes2={(e) => setFotoAntes2(e)}
								changeFotoDurante1={(e) => setFotoDurante1(e)}
								changeFotoDurante2={(e) => setFotoDurante2(e)}
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
						{/* <Pdf targetRef={refPDF} filename="code-example.pdf">
              {({ toPdf }) => (
                <Button variant="contained" color="primary" onClick={toPdf}>
                  PDF
                </Button>
              )}
            </Pdf> */}
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
							data={{
								sso,
								inge,
								sid,
								caso,
								wo,
								equipo,
								ubicacion,
								tipoDeServicio,
								tipoDeContrato,
								sintoma,
								descripcion,
								apto,
								funcionando,
								observaciones,
								condiciones,
								tiempos,
								herramientas,
								refacciones,
								bitacora,
								hrsReales,
								vidaUtil,
								recomendaciones,
								conclusiones,
								fotoAntes1,
								fotoAntes2,
								fotoDurante1,
								fotoDurante2,
								fotoDespues1,
								fotoDespues2,
								flagAddFotos,
							}}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
