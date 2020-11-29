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
				onChange={(e) => {
					setConclusiones(e.target.value);
				}}
			/>
			<div className="row">
				{fotoNormal ? (
					<div className="cell">
						<b className="btnDelete" onClick={() => subirFotoNormal(null)}>
							X
						</b>
						<img width="150" height="100" src={fotoNormal} alt="antes1" />
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
						<label htmlFor="antes1">
							Foto Normal
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoSerie ? (
					<div className="cell">
						<b className="btnDelete" onClick={() => subirFotoSerie(null)}>
							X
						</b>
						<img width="150" height="100" src={fotoSerie} alt="antes2" />
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
						<label htmlFor="antes2">
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
						<b className="btnDelete" onClick={() => subirFotoInventario(null)}>
							X
						</b>
						<img width="150" height="100" src={fotoInventario} alt="durante1" />
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
						<label htmlFor="durante1">
							Placa N° de Inventario
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoPanoramica ? (
					<div className="cell">
						<b className="btnDelete" onClick={() => subirFotoPanoramica(null)}>
							X
						</b>
						<img width="150" height="100" src={fotoPanoramica} alt="durante2" />
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
						<label htmlFor="durante2">
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
