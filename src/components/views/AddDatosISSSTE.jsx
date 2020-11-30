import React, { useState, useEffect } from "react";

import { TextField, IconButton } from "@material-ui/core";

function AddDatosISSSTE(props) {
	const [bitacora, setBitacora] = useState("");
	const [hrsReales, setHrsReales] = useState("");
	const [vidaUtil, setVidaUtil] = useState("");
	const [ubicacion, setUbicacion] = useState("");
	const [recomendaciones, setRecomendaciones] = useState("");
	const [conclusiones, setConclusiones] = useState("");
	const [fotoNormal, setFotoNormal] = useState(null);
	const [fotoSerie, setFotoSerie] = useState(null);
	const [fotoInventario, setFotoInventario] = useState(null);
	const [fotoPanoramica, setFotoPanoramica] = useState(null);
	const [angulo1, setAngulo1] = useState(0);
	const [angulo2, setAngulo2] = useState(0);
	const [angulo3, setAngulo3] = useState(0);
	const [angulo4, setAngulo4] = useState(0);

	useEffect(() => {
		if (props.flag) {
			props.onDone({
				bitacora,
				hrsReales,
				vidaUtil,
				ubicacion,
				recomendaciones,
				conclusiones,
				fotoNormal,
				fotoSerie,
				fotoInventario,
				fotoPanoramica,
			});
		}
	}, [props.flag]);

	const subirFotoNormal = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoNormal(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoNormal(e);
		}
	};

	const subirFotoSerie = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoSerie(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoSerie(e);
		}
	};

	const subirFotoInventario = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoInventario(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoInventario(e);
		}
	};
	const subirFotoPanoramica = (e) => {
		if (e !== null) {
			let photo = new Image();
			photo.src = URL.createObjectURL(e.target.files[0]);
			setFotoPanoramica(photo.src);
			// URL.revokeObjectURL(photo.src);
		} else {
			setFotoPanoramica(e);
		}
	};

	return (
		<div className="views ISSSTE">
			<h3>Datos ISSSTE</h3>
			<div className="tresFr">
				<TextField
					label="N° Bitacora"
					fullWidth
					variant="outlined"
					type="tel"
					inputProps={{
						maxLength: 8,
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
					type="tel"
					inputProps={{
						maxLength: 2,
					}}
					size="small"
					value={hrsReales}
					onChange={(e) => {
						setHrsReales(e.target.value);
					}}
				/>
				<TextField
					label="Vida útil"
					fullWidth
					variant="outlined"
					type="tel"
					inputProps={{
						maxLength: 2,
					}}
					size="small"
					value={vidaUtil}
					onChange={(e) => {
						setVidaUtil(e.target.value);
					}}
				/>
			</div>
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
				helperText={`${recomendaciones.split(" ").length}/52`}
				inputProps={{
					maxLength:
						recomendaciones.split(" ").length === 53
							? recomendaciones.length
							: 480,
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
				helperText={`${conclusiones.split(" ").length}/52`}
				inputProps={{
					maxLength:
						conclusiones.split(" ").length === 53 ? conclusiones.length : 480,
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
						<b className="btnDelete" onClick={() => subirFotoNormal(null)}>
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
								subirFotoNormal(e);
							}}
							type="file"
						/>
						<label htmlFor="antes1">Foto Normal</label>
						<IconButton color="primary" component="span">
							<span className="material-icons">add_a_photo</span>
						</IconButton>
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
						<b className="btnDelete" onClick={() => subirFotoSerie(null)}>
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
								subirFotoSerie(e);
							}}
							type="file"
						/>
						<label htmlFor="antes2">Placa N° de Serie</label>
						<IconButton color="primary" component="span">
							<span className="material-icons">add_a_photo</span>
						</IconButton>
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
						<b className="btnDelete" onClick={() => subirFotoInventario(null)}>
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
								subirFotoInventario(e);
							}}
							type="file"
						/>
						<label htmlFor="durante1">Placa N° de Inventario</label>
						<IconButton color="primary" component="span">
							<span className="material-icons">add_a_photo</span>
						</IconButton>
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
						<b className="btnDelete" onClick={() => subirFotoPanoramica(null)}>
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
								subirFotoPanoramica(e);
							}}
							type="file"
						/>
						<label htmlFor="durante2">Foto panorámica del bien</label>
						<IconButton color="primary" component="span">
							<span className="material-icons">add_a_photo</span>
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
}

export default AddDatosISSSTE;
