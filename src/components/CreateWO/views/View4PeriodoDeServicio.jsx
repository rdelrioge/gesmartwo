import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/es";

import { Button, InputLabel, FormControl, Select } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function View4PeriodoDeServicio(props) {
	const [tiempos, setTiempos] = useState([]);
	const [tipoDeTrabajo, setTipoDeTrabajo] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [disableAddBtn, SetDisableAddBtn] = useState(true);

	useEffect(() => {
		if (props.edit) {
			setTiempos(props.data.datos.tiempos);
		}
	}, []);

	useEffect(() => {
		if (props.step === 2) {
			tiempos.length > 0 ? props.handleNext(false) : props.handleNext(true);
		}
	}, [tiempos, props]);

	useEffect(() => {
		if (
			tipoDeTrabajo !== "" &&
			startDate !== null &&
			startTime !== null &&
			endDate !== null &&
			endTime !== null
		) {
			SetDisableAddBtn(false);
		} else {
			SetDisableAddBtn(true);
		}
	}, [tipoDeTrabajo, startDate, startTime, endDate, endTime]);

	const addTime = () => {
		let sdts = startDate.startOf("day").valueOf();
		let stts = startTime.valueOf();
		let edts = endDate.startOf("day").valueOf();
		let etts = endTime.valueOf();
		if (edts < sdts) {
			alert("Revisa que las fechas sean correctas");
		} else {
			if (etts < stts) {
				alert("Revisa que las horas sean correctas");
			} else {
				let arrTemp = [...tiempos];
				arrTemp.push([tipoDeTrabajo, startDate, startTime, endDate, endTime]);
				setTiempos(arrTemp);
				setTipoDeTrabajo("");
				setStartDate(null);
				setStartTime(null);
				setEndDate(null);
				setEndTime(null);
				props.onDone(arrTemp);
			}
		}
	};

	const deleteTime = (i) => {
		let arrTemp = [...tiempos];
		arrTemp.splice(i, 1);
		setTiempos(arrTemp);
		props.onDone(arrTemp);
	};

	return (
		<>
			<h3>Periodo de servicio</h3>
			<div className="agregartiempo">
				<div className="tipodetrabajo">
					<FormControl size="small" fullWidth variant="outlined">
						<InputLabel htmlFor="selectTipoDeTrabajo">
							Tipo de trabajo
						</InputLabel>
						<Select
							native
							value={tipoDeTrabajo}
							onChange={(e) => setTipoDeTrabajo(e.target.value)}
							label="Tipo de trabajo"
							inputProps={{
								name: "tipoDeTrabajo",
								id: "selectTipoDeTrabajo",
							}}>
							<option aria-label="None" value="" />
							<option value={"Viaje"}>Viaje</option>
							<option value={"En espera"}>En Espera</option>
							<option value={"Administración"}>Administración</option>
							{props.tps === "PM (Mantenimiento Preventivo)" ? (
								<option value={"Preventivo"}>Preventivo</option>
							) : (
								<>
									<option value={"Diagnóstico"}>Diagnóstico</option>
									<option value={"Reparación"}>Reparacion</option>
									<option value={"Instalación"}>Instalación</option>
									<option value={"Solución de problemas"}>
										Solución de problemas
									</option>
									<option value={"Instalación - Opciones"}>
										Instalación - Opciones
									</option>
									<option value={"Conectividad"}>Conectividad</option>
									<option value={"Monitoreo del sistema"}>
										Monitoreo del sistema
									</option>
									<option
										value={"Entrega de materiales, embalaje, desembalaje."}>
										Entrega de materiales, embalaje, desembalaje.
									</option>
									<option value={"Potencia y puesta a tierra "}>
										Potencia y puesta a tierra
									</option>
									<option
										value={"Rcarga de helio / mantenimiento de Cryogenos"}>
										Rcarga de helio / mantenimiento de Cryogenos
									</option>
									<option value={"OJT en entrenamiento de trabajo"}>
										OJT en entrenamiento de trabajo
									</option>
									<option value={"Soporte telefónico"}>
										Soporte telefónico
									</option>
									<option value={"Auditoria del sitio"}>
										Auditoria del sitio
									</option>
									<option value={"Inspección del lugar"}>
										Inspección del lugar
									</option>
									<option value={"Preparación del sitio"}>
										Preparación del sitio
									</option>
									<option value={"Solicitud de cliente"}>
										Solicitud de cliente
									</option>
									<option value={"Reunión de clientes"}>
										Reunión de clientes
									</option>
									<option value={"Tarea de servicio"}>Tarea de servicio</option>
									<option value={"Objetos perdidos"}>Objetos perdidos</option>
									<option value={"Soporte de ventas"}>Soporte de ventas</option>
									<option value={"Chatarra"}>Chatarra</option>
								</>
							)}
						</Select>
					</FormControl>
				</div>
				<div className="timers">
					<div className="inicio">
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<DatePicker
								margin="dense"
								disableFuture
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
								id="startDate"
								label="fecha inicio"
								value={startDate}
								onChange={(e) => {
									setStartDate(e);
								}}
							/>
							<TimePicker
								margin="dense"
								inputVariant="outlined"
								autoOk
								disableToolbar
								ampm={false}
								showTodayButton
								todayLabel="hoy"
								clearable
								minutesStep={15}
								format="HH:mm"
								clearLabel="borrar"
								okLabel=""
								cancelLabel=""
								id="startTime"
								label="hora inicio"
								value={startTime}
								onChange={(e) => {
									setStartTime(e);
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="final">
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<DatePicker
								margin="dense"
								disableFuture
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
								id="endDate"
								label="fecha final"
								value={endDate}
								onChange={(e) => {
									setEndDate(e);
								}}
							/>
							<TimePicker
								margin="dense"
								inputVariant="outlined"
								autoOk
								disableToolbar
								format="HH:mm"
								ampm={false}
								showTodayButton
								minutesStep={15}
								todayLabel="hoy"
								clearable
								clearLabel="borrar"
								okLabel=""
								cancelLabel=""
								id="endTime"
								label="hora final"
								value={endTime}
								onChange={(e) => {
									setEndTime(e);
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
				<div className="btnAddTiempo">
					<Button
						size="small"
						variant="contained"
						disabled={disableAddBtn}
						color="primary"
						onClick={() => addTime()}>
						Agregar
					</Button>
				</div>
			</div>
			<div className="tiemposagregados">
				{tiempos.length > 0 ? (
					<>
						<ul className="ultime">
							<li>Tipo de trabajo</li>
							<li>Fecha de inicio</li>
							<li>Hora inicial</li>
							<li>Fecha final</li>
							<li>Hora final</li>
							<li>Borrar</li>
						</ul>

						{tiempos.map((time, index) => {
							return (
								<ul className="ultime" key={index}>
									<li>{time[0]}</li>
									<li>{moment(time[1]).format("DD/MM/YY")}</li>
									<li>{moment(time[2]).format("HH:mm")}</li>
									<li>{moment(time[3]).format("DD/MM/YY")}</li>
									<li>{moment(time[4]).format("HH:mm")}</li>
									<li>
										<b
											className="btnDeleteTime"
											onClick={() => deleteTime(index)}>
											X
										</b>
									</li>
								</ul>
							);
						})}
					</>
				) : null}
			</div>
		</>
	);
}

export default View4PeriodoDeServicio;
