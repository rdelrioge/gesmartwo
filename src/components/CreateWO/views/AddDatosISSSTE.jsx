import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/es";

import { localdb } from "../../../index";

import { TextField, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function AddDatosISSSTE(props) {
	const datosISSSTE = { ...props.data?.datos.datosISSSTE };
	const angulos = { ...props.data?.angulos };

	const [bitacora, setBitacora] = useState("");
	const [hrsReales, setHrsReales] = useState("");
	const [vidaUtil, setVidaUtil] = useState("");
	const [progStart, setProgStart] = useState(null);
	const [progEnd, setProgEnd] = useState(null);
	const [ubicacion, setUbicacion] = useState("");
	const [recomendaciones, setRecomendaciones] = useState("Ninguna");
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
			setBitacora(datosISSSTE.bitacora);
			setHrsReales(datosISSSTE.hrsReales);
			setVidaUtil(datosISSSTE.vidaUtil);
			setProgStart(datosISSSTE.progStart);
			setProgEnd(datosISSSTE.progEnd);
			setUbicacion(datosISSSTE.ubicacion);
			setRecomendaciones(datosISSSTE.recomendaciones);
			setConclusiones(datosISSSTE.conclusiones);
			// setFotoNormal(fotoNormalCache ? fotoNormalCache : null);
			localdb.fotos
				.where("name")
				.equals("fotoNormalCache")
				.first((foto) => {
					foto ? setFotoNormal(foto.value) : setFotoNormal(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoSerieCache")
				.first((foto) => {
					foto ? setFotoSerie(foto.value) : setFotoSerie(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoInventarioCache")
				.first((foto) => {
					foto ? setFotoInventario(foto.value) : setFotoInventario(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoPanoramicaCache")
				.first((foto) => {
					foto ? setFotoPanoramica(foto.value) : setFotoPanoramica(null);
				});
			// setFotoSerie(datosISSSTE.fotoSerie);
			// setFotoInventario(datosISSSTE.fotoInventario);
			// setFotoPanoramica(datosISSSTE.fotoPanoramica);
			setAngulo1(angulos[0]);
			setAngulo2(angulos[1]);
			setAngulo3(angulos[2]);
			setAngulo4(angulos[3]);
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
	}, [props, progStart, progEnd]);

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

	const subirFoto = (e, cualFoto) => {
		if (e !== null) {
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");
			let photo = new Image();
			photo.onload = () => {
				canvas.width = photo.width;
				canvas.height = photo.height;
				ctx.drawImage(photo, 0, 0);
				let prevImg64 = canvas.toDataURL("image/png");

				resizeBase64Img(prevImg64, 300, 150).then((dataURL) => {
					console.log(dataURL);
					if (cualFoto === "fotoNormal") {
						localdb.fotos.put({ name: "fotoNormalCache", value: dataURL });
						setFotoNormal(photo.src);
					}
					if (cualFoto === "fotoSerie") {
						localdb.fotos.put({ name: "fotoSerieCache", value: dataURL });
						setFotoSerie(photo.src);
					}
					if (cualFoto === "fotoInventario") {
						localdb.fotos.put({
							name: "fotoInventarioCache",
							value: dataURL,
						});
						setFotoInventario(photo.src);
					}
					if (cualFoto === "fotoPanoramica") {
						localdb.fotos.put({
							name: "fotoPanoramicaCache",
							value: dataURL,
						});
						setFotoPanoramica(photo.src);
					}
				});
			};
			photo.src = URL.createObjectURL(e.target.files[0]);
		} else {
			if (cualFoto === "fotoNormal") {
				localdb.fotos.put({ name: "fotoNormalCache", value: null });
				setFotoNormal(e);
			}
			if (cualFoto === "fotoSerie") {
				localdb.fotos.put({ name: "fotoSerieCache", value: null });
				setFotoSerie(e);
			}
			if (cualFoto === "fotoInventario") {
				localdb.fotos.put({
					name: "fotoInventarioCache",
					value: null,
				});
				setFotoInventario(e);
			}
			if (cualFoto === "fotoPanoramica") {
				localdb.fotos.put({
					name: "fotoPanoramicaCache",
					value: null,
				});
				setFotoPanoramica(e);
			}
		}
	};

	const resizeBase64Img = (base64, newWidth, newHeight) => {
		return new Promise((resolve, reject) => {
			var canvas = document.createElement("canvas");
			canvas.style.width = newWidth.toString() + "px";
			canvas.style.height = newHeight.toString() + "px";
			let context = canvas.getContext("2d");
			let img = document.createElement("img");
			img.src = base64;
			img.onload = function () {
				context.scale(newWidth / img.width, newHeight / img.height);
				context.drawImage(img, 0, 0);
				resolve(canvas.toDataURL());
			};
		});
	};

	// const subirFotoSerie = (e) => {
	// 	if (e !== null) {
	// 		let photo = new Image();
	// 		photo.src = URL.createObjectURL(e.target.files[0]);
	// 		setFotoSerie(photo.src);
	// 		// URL.revokeObjectURL(photo.src);
	// 	} else {
	// 		setFotoSerie(e);
	// 	}
	// };

	// const subirFotoInventario = (e) => {
	// 	if (e !== null) {
	// 		let photo = new Image();
	// 		photo.src = URL.createObjectURL(e.target.files[0]);
	// 		setFotoInventario(photo.src);
	// 		// URL.revokeObjectURL(photo.src);
	// 	} else {
	// 		setFotoInventario(e);
	// 	}
	// };
	// const subirFotoPanoramica = (e) => {
	// 	if (e !== null) {
	// 		let photo = new Image();
	// 		photo.src = URL.createObjectURL(e.target.files[0]);
	// 		setFotoPanoramica(photo.src);
	// 		// URL.revokeObjectURL(photo.src);
	// 	} else {
	// 		setFotoPanoramica(e);
	// 	}
	// };

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
							required
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
								setProgStart(e.startOf("day").valueOf());
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
							required
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
								setProgEnd(e.startOf("day").valueOf());
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
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoNormal")}>
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
								subirFoto(e, "fotoNormal");
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
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoSerie")}>
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
								subirFoto(e, "fotoSerie");
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
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoInventario")}>
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
								subirFoto(e, "fotoInventario");
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
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoPanoramica")}>
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
								subirFoto(e, "fotoPanoramica");
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
