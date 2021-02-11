import React, { useState, useEffect } from "react";

import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function View3DatosDelServicio(props) {
	const [tipoDeServicio, setTipoDeServicio] = useState("");
	const [tipoDeContrato, setTipoDeContrato] = useState("Contrato");
	const [contrato, setContrato] = useState("");
	const [sintoma, setSintoma] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [apto, setApto] = useState(true);
	const [funcionando, setFuncionando] = useState(true);
	const [observaciones, setObservaciones] = useState("");
	const [condiciones, setCondiciones] = useState("Funcionando");
	const [reprogramado, setReprogramado] = useState("");
	const [fechaDeReprogramacion, setFechaDeReprogramacion] = useState(
		Date.now()
	);

	useEffect(() => {
		if (props.edit) {
			if (props.data) {
				setTipoDeServicio(props.data.datos.tipoDeServicio);
				setTipoDeContrato(props.data.datos.tipoDeContrato);
				setContrato(props.data.datos.equipo.contrato);
				setSintoma(props.data.datos.sintoma);
				setDescripcion(props.data.datos.descripcion);
				setApto(props.data.datos.apto);
				setFuncionando(props.data.datos.funcionando);
				setObservaciones(props.data.datos.observaciones);
				setCondiciones(props.data.datos.condiciones);
				setReprogramado(props.data.datos.reprogramado);
				setFechaDeReprogramacion(props.data.datos.fechaDeReprogramacion);
			}
		}
	}, []);

	useEffect(() => {
		if (props.step === 1) {
			if (
				tipoDeServicio !== "" &&
				tipoDeContrato !== "" &&
				sintoma !== "" &&
				descripcion !== "" &&
				condiciones !== ""
			) {
				props.handleNext(false);
			} else {
				props.handleNext(true);
			}
		}
	}, [
		props,
		tipoDeServicio,
		tipoDeContrato,
		sintoma,
		descripcion,
		condiciones,
	]);

	useEffect(() => {
		if (condiciones === "Reprogramado") {
			setReprogramado("ProximoMes");
		}
	}, [condiciones]);
	useEffect(() => {
		console.log(props);
		if (props.flag) {
			props.onDone(
				tipoDeServicio,
				tipoDeContrato,
				contrato,
				sintoma,
				descripcion,
				apto,
				funcionando,
				observaciones,
				condiciones,
				reprogramado,
				fechaDeReprogramacion
			);
		}
	}, [props.flag]);

	const changeTipoDeServicio = (tds) => {
		setTipoDeServicio(tds);
		if (tds === "PM (Mantenimiento Preventivo)") {
			setDescripcion(
				`Se realiza mantenimiento preventivo según especificaciones técnicas del fabricante así como pruebas de funcionamiento satisfactorias. El equipo se encuentra operando correctamente.`
			);
			setSintoma("");
		} else {
			setDescripcion("");
			setSintoma("");
		}
	};

	return (
		<>
			<h3>Datos del Servicio</h3>
			<div className="item3">
				<FormControl size="small" fullWidth required variant="outlined">
					<InputLabel htmlFor="selectTipoDeServ">Tipo de servicio</InputLabel>
					<Select
						native
						value={tipoDeServicio}
						onChange={(e) => changeTipoDeServicio(e.target.value)}
						label="Tipo de servicio"
						inputProps={{
							name: "tipoDeServicio",
							id: "selectTipoDeServ",
						}}>
						<option aria-label="None" value="" />
						<option value={"PM (Mantenimiento Preventivo)"}>Preventivo</option>
						<option value={"CM (Mantenimiento Correctivo)"}>Correctivo</option>
						<option value={"FMI"}>FMI</option>
						<option value={"INS (Instalación)"}>Instalación</option>
						<option value={"Otros"}>Otros</option>
						<option value={"HBS"}>HBS</option>
						<option value={"Aplicaciones"}>Aplicaciones</option>
						<option value={"Desinstalación"}>Desinstalación</option>
					</Select>
				</FormControl>
			</div>
			{props.flagManual ? (
				<div className="item3">
					<FormControl size="small" fullWidth variant="outlined">
						<InputLabel htmlFor="selectTipoDeContrato">
							Tipo de trabajo
						</InputLabel>
						<Select
							native
							value={tipoDeContrato}
							onChange={(e) => setTipoDeContrato(e.target.value)}
							label="Tipo de trabajo"
							inputProps={{
								name: "tipoDeContrato",
								id: "selectTipoDeContrato",
							}}>
							<option value={"Contrato"}>Contrato</option>
							<option value={"Garantía"}>Garantia</option>
							<option value={"Facturable"}>Facturable</option>
							<option value={"FMI"}>FMI</option>
							<option value={"On demand"}>On demand</option>
						</Select>
					</FormControl>
				</div>
			) : null}
			{props.flagManual && tipoDeContrato === "Contrato" ? (
				<div className="item3">
					<TextField
						label="No. de Contrato"
						fullWidth
						variant="outlined"
						size="small"
						value={contrato}
						onChange={(e) => setContrato(e.target.value)}
					/>
				</div>
			) : null}
			<div className="item3">
				{tipoDeServicio === "PM (Mantenimiento Preventivo)" ? (
					<FormControl size="small" fullWidth required variant="outlined">
						<InputLabel htmlFor="numeroPM">Síntoma</InputLabel>
						<Select
							native
							value={sintoma}
							onChange={(e) => setSintoma(e.target.value)}
							label="Sintoma"
							inputProps={{
								name: "sintoma",
								id: "sintoma",
							}}>
							<option aria-label="None" value="" />
							<option value={"Mantenimiento Preventivo"}>
								Mantenimiento Preventivo
							</option>
							<option value={"1er Mantenimiento Preventivo"}>1er MP</option>
							<option value={"2do Mantenimiento Preventivo"}>2do MP</option>
							<option value={"3er Mantenimiento Preventivo"}>3er MP</option>
							<option value={"4to Mantenimiento Preventivo"}>4to MP</option>
						</Select>
					</FormControl>
				) : (
					<TextField
						label="Síntoma"
						fullWidth
						multiline
						required
						rows={3}
						variant="outlined"
						helperText={`${sintoma.split(" ").length - 1}/52`}
						inputProps={{
							maxLength:
								sintoma.split(" ").length === 53 ? sintoma.length : 800,
						}}
						onChange={(e) => setSintoma(e.target.value)}
						value={sintoma}
					/>
				)}
			</div>
			<div className="item3">
				<TextField
					label="Descripción del servicio"
					fullWidth
					multiline
					required
					rows={4}
					value={descripcion}
					helperText={`${descripcion.split(" ").length - 1}/52`}
					inputProps={{
						maxLength:
							descripcion.split(" ").length === 53 ? descripcion.length : 800,
					}}
					variant="outlined"
					onChange={(e) => setDescripcion(e.target.value)}
				/>
			</div>
			<div className="item3 preguntas">
				<b>
					¿El equipo queda operativamente apto para realizar el trabajo para lo
					que fue diseñado?
				</b>
				<input
					type="checkbox"
					checked={apto}
					onChange={(e) => setApto(e.target.checked)}
				/>
				<b>¿Funcionando al 100%?</b>
				<input
					type="checkbox"
					checked={funcionando}
					onChange={(e) => setFuncionando(e.target.checked)}
				/>
			</div>
			<div className="item3">
				<TextField
					label="Observaciones"
					fullWidth
					multiline
					value={observaciones}
					rows={2}
					helperText={`${observaciones.split(" ").length - 1}/36`}
					inputProps={{
						maxLength:
							observaciones.split(" ").length === 37
								? observaciones.length
								: 800,
					}}
					variant="outlined"
					onChange={(e) => setObservaciones(e.target.value)}
				/>
			</div>
			<div className="item3">
				<FormControl size="small" fullWidth variant="outlined">
					<InputLabel htmlFor="selectCondiciones">
						Condiciones en las que se deja el equipo
					</InputLabel>
					<Select
						native
						value={condiciones}
						onChange={(e) => setCondiciones(e.target.value)}
						label="Condiciones en las que se deja el equipo"
						inputProps={{
							name: "condiciones",
							id: "selectCondiciones",
						}}>
						<option value={"Funcionando"}>Funcionando</option>
						<option value={"Parcialmente funcionando"}>
							Parcialmente funcionando
						</option>
						<option value={"No funcional"}>No funcional</option>
						<option value={"No localizado"}>No localizado</option>
						<option value={"Baja"}>Baja</option>
						<option value={"Reprogramado"}>Reprogramado</option>
					</Select>
				</FormControl>
			</div>
			{condiciones === "Reprogramado" ? (
				<div className="item3">
					<FormControl size="small" fullWidth variant="outlined">
						<InputLabel htmlFor="selectReprogramación">
							Reprogramado para:
						</InputLabel>
						<Select
							native
							value={reprogramado}
							onChange={(e) => setReprogramado(e.target.value)}
							label="Reprogramado para:"
							inputProps={{
								name: "reprogramado",
								id: "selectReprogramación",
							}}>
							<option value={"ProximoMes"}>Próximo Mes</option>
							<option value={"FechaTentativa"}>Fecha Tentativa</option>
						</Select>
					</FormControl>
				</div>
			) : null}
			{condiciones === "Reprogramado" && reprogramado === "FechaTentativa" ? (
				<>
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
							id="reprogDate"
							label="fecha tentativa"
							value={fechaDeReprogramacion}
							onChange={(e) => {
								setFechaDeReprogramacion(e.startOf("day").valueOf());
							}}
						/>
					</MuiPickersUtilsProvider>
				</>
			) : null}
		</>
	);
}

export default View3DatosDelServicio;
