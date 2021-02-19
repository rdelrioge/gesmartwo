import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/es";

import { Button, TextField } from "@material-ui/core";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function View5Herramientas(props) {
	const [herramientas, setHerramientas] = useState([]);
	const [calibracion, setCalibracion] = useState(null);
	const [barcode, setBarcode] = useState("");
	const [herramienta, setHerramienta] = useState("");
	const [disableAddBtnH, SetDisableAddBtnH] = useState(true);

	useEffect(() => {
		if (props.edit) {
			if (props.data) {
				setHerramientas(props.data.datos.herramientas);
			}
		}
	}, []);

	useEffect(() => {
		if (props.flag) {
			props.onDone(herramientas);
		}
		if (props.step === 3) {
			props.handleNext(false);
		}
	}, [props.flag, props.step]);

	useEffect(() => {
		if (barcode !== "" && herramienta !== "" && calibracion !== null) {
			SetDisableAddBtnH(false);
		} else {
			SetDisableAddBtnH(true);
		}
	}, [calibracion, barcode, herramienta]);

	const addHerramienta = () => {
		let arrTemp = [...herramientas];
		arrTemp.push([calibracion, barcode, herramienta]);
		setHerramientas(arrTemp);
		setCalibracion(null);
		setBarcode("");
		setHerramienta("");
		props.onDone(arrTemp);
	};

	const deleteHerramienta = (i) => {
		let arrTemp = [...herramientas];
		arrTemp.splice(i, 1);
		setHerramientas(arrTemp);
		props.onDone(arrTemp);
	};

	return (
		<>
			<h3>Herramientas</h3>
			<div className="herrXagregar">
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
						id="calibracion"
						label="Sig. Calibracion"
						value={calibracion}
						onChange={(e) => {
							setCalibracion(e);
						}}
					/>
				</MuiPickersUtilsProvider>
				<TextField
					label="Barcode"
					fullWidth
					variant="outlined"
					size="small"
					value={barcode}
					onChange={(e) => setBarcode(e.target.value)}
				/>
				<TextField
					label="Herramienta"
					fullWidth
					variant="outlined"
					size="small"
					value={herramienta}
					onChange={(e) => setHerramienta(e.target.value)}
				/>

				<div className="btnAddHerr">
					<Button
						size="small"
						variant="contained"
						disabled={disableAddBtnH}
						color="primary"
						onClick={() => addHerramienta()}>
						Agregar
					</Button>
				</div>
			</div>
			<div className="herrAgregadas">
				{herramientas.length > 0 ? (
					<>
						<ul className="ulherr">
							<li>Sig. Calibración</li>
							<li>Barcode</li>
							<li>Herramienta</li>
							<li>Borrar</li>
						</ul>

						{herramientas.map((herr, index) => {
							return (
								<ul className="ulherr" key={index}>
									<li>{moment(herr[0]).format("DD/MM/YY")}</li>
									<li>{herr[1]}</li>
									<li>{herr[2]}</li>
									<li>
										<b
											className="btnDeleteTime"
											onClick={() => deleteHerramienta(index)}>
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

export default View5Herramientas;
