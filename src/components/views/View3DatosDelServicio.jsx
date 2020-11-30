import React, { useState, useEffect } from "react";

import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";

function View3DatosDelServicio(props) {
	const [tipoDeServicio, setTipoDeServicio] = useState("");
	const [tipoDeContrato, setTipoDeContrato] = useState("Contrato");
	const [sintoma, setSintoma] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [apto, setApto] = useState(true);
	const [funcionando, setFuncionando] = useState(true);
	const [observaciones, setObservaciones] = useState("");
	const [condiciones, setCondiciones] = useState("Funcionando");

	useEffect(() => {
		if (props.step === 2) {
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
		console.log(props.flag);
		if (props.flag) {
			props.onDone(
				tipoDeServicio,
				tipoDeContrato,
				sintoma,
				descripcion,
				apto,
				funcionando,
				observaciones,
				condiciones
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
				<FormControl size="small" fullWidth variant="outlined">
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
						<option value={"APlicaciones"}>Aplicaciones</option>
						<option value={"Desinstalación"}>Desinstalación</option>
					</Select>
				</FormControl>
			</div>
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
			<div className="item3">
				{tipoDeServicio === "PM (Mantenimiento Preventivo)" ? (
					<FormControl size="small" fullWidth variant="outlined">
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
						rows={3}
						variant="outlined"
						helperText={`${sintoma.split(" ").length}/52`}
						inputProps={{
							maxLength:
								sintoma.split(" ").length === 53 ? sintoma.length : 480,
						}}
						onChange={(e) => setSintoma(e.target.value)}
					/>
				)}
			</div>
			<div className="item3">
				<TextField
					label="Descripción del servicio"
					fullWidth
					multiline
					rows={4}
					value={descripcion}
					helperText={`${descripcion.split(" ").length}/52`}
					inputProps={{
						maxLength:
							descripcion.split(" ").length === 53 ? descripcion.length : 480,
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
					helperText={`${observaciones.split(" ").length}/36`}
					inputProps={{
						maxLength:
							observaciones.split(" ").length === 36
								? observaciones.length
								: 480,
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
		</>
	);
}

export default View3DatosDelServicio;
