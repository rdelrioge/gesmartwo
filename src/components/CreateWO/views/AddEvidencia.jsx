import React, { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";

import { localdb } from "../../../index";

function AddEvidencia(props) {
	const fotos = { ...props.data.datos.fotos };
	const angulos = { ...props.data.datos.angulos };

	const cliente = props.cliente;
	const [fotoAntes1, setFotoAntes1] = useState("");
	const [fotoAntes2, setFotoAntes2] = useState("");
	const [fotoDurante1, setFotoDurante1] = useState("");
	const [fotoDurante2, setFotoDurante2] = useState("");
	const [fotoDespues1, setFotoDespues1] = useState("");
	const [fotoDespues2, setFotoDespues2] = useState("");
	const [angulo1, setAngulo1] = useState(0);
	const [angulo2, setAngulo2] = useState(0);
	const [angulo3, setAngulo3] = useState(0);
	const [angulo4, setAngulo4] = useState(0);
	const [angulo5, setAngulo5] = useState(0);
	const [angulo6, setAngulo6] = useState(0);

	useEffect(() => {
		if (props.edit) {
			localdb.fotos
				.where("name")
				.equals("fotoAntes1")
				.first((foto) => {
					foto ? setFotoAntes1(foto.value) : setFotoAntes1(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoAntes2")
				.first((foto) => {
					foto ? setFotoAntes2(foto.value) : setFotoAntes2(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoDurante1")
				.first((foto) => {
					foto ? setFotoDurante1(foto.value) : setFotoDurante1(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoDurante2")
				.first((foto) => {
					foto ? setFotoDurante2(foto.value) : setFotoDurante2(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoDespues1")
				.first((foto) => {
					foto ? setFotoDespues1(foto.value) : setFotoDespues1(null);
				});
			localdb.fotos
				.where("name")
				.equals("fotoDespues2")
				.first((foto) => {
					foto ? setFotoDespues2(foto.value) : setFotoDespues2(null);
				});
			setAngulo1(angulos.angulo1 ? angulos.angulo1 : "");
			setAngulo2(angulos.angulo2 ? angulos.angulo2 : "");
			setAngulo3(angulos.angulo3 ? angulos.angulo3 : "");
			setAngulo4(angulos.angulo4 ? angulos.angulo4 : "");
			setAngulo5(angulos.angulo5 ? angulos.angulo5 : "");
			setAngulo6(angulos.angulo6 ? angulos.angulo6 : "");
		}
	}, []);

	useEffect(() => {
		if (props.flag) {
			props.onDone({
				fotoAntes1,
				fotoAntes2,
				fotoDurante1,
				fotoDurante2,
				fotoDespues1,
				fotoDespues2,
			});
			props.onAngulos([angulo1, angulo2, angulo3, angulo4, angulo5, angulo6]);
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
					switch (cualFoto) {
						case "fotoAntes1":
							localdb.fotos.put({ name: "fotoAntes1", value: dataURL });
							setFotoAntes1(photo.src);
							break;
						case "fotoAntes2":
							localdb.fotos.put({ name: "fotoAntes2", value: dataURL });
							setFotoAntes2(photo.src);
							break;
						case "fotoDurante1":
							localdb.fotos.put({ name: "fotoDurante1", value: dataURL });
							setFotoDurante1(photo.src);
							break;
						case "fotoDurante2":
							localdb.fotos.put({ name: "fotoDurante2", value: dataURL });
							setFotoDurante2(photo.src);
							break;
						case "fotoDespues1":
							localdb.fotos.put({ name: "fotoDespues1", value: dataURL });
							setFotoDespues1(photo.src);
							break;
						case "fotoDespues2":
							localdb.fotos.put({ name: "fotoDespues2", value: dataURL });
							setFotoDespues2(photo.src);
							break;
						default:
							break;
					}
				});
			};
			photo.src = URL.createObjectURL(e.target.files[0]);
		} else {
			switch (cualFoto) {
				case "fotoAntes1":
					localdb.fotos.put({ name: "fotoAntes1", value: null });
					setFotoAntes1(e);
					break;
				case "fotoAntes2":
					localdb.fotos.put({ name: "fotoAntes2", value: null });
					setFotoAntes2(e);
					break;
				case "fotoDurante1":
					localdb.fotos.put({ name: "fotoDurante1", value: null });
					setFotoDurante1(e);
					break;
				case "fotoDurante2":
					localdb.fotos.put({ name: "fotoDurante2", value: null });
					setFotoDurante2(e);
					break;
				case "fotoDespues1":
					localdb.fotos.put({ name: "fotoDespues1", value: null });
					setFotoDespues1(e);
					break;
				case "fotoDespues2":
					localdb.fotos.put({ name: "fotoDespues2", value: null });
					setFotoDespues2(e);
					break;
				default:
					break;
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

	return (
		<div className="IMSS">
			{cliente === "IMSS" ? <h3>Evidencia IMSS</h3> : <b></b>}
			<div className="row antes">
				{fotoAntes1 ? (
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
							onClick={() => subirFoto(null, "fotoAntes1")}>
							X
						</b>
						<img
							src={fotoAntes1}
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
							onChange={(e) => subirFoto(e, "fotoAntes1")}
							type="file"
						/>
						<label htmlFor="antes1">
							Antes
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoAntes2 ? (
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
							onClick={() => subirFoto(null, "fotoAntes2")}>
							X
						</b>
						<img
							src={fotoAntes2}
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
							onChange={(e) => subirFoto(e, "fotoAntes2")}
							type="file"
						/>
						<label htmlFor="antes2">
							Antes
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
			</div>
			<div className="row durante">
				{fotoDurante1 ? (
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
							onClick={() => subirFoto(null, "fotoDurante1")}>
							X
						</b>
						<img
							src={fotoDurante1}
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
							onChange={(e) => subirFoto(e, "fotoDurante1")}
							type="file"
						/>
						<label htmlFor="durante1">
							Durante
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoDurante2 ? (
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
							onClick={() => subirFoto(null, "fotoDurante2")}>
							X
						</b>
						<img
							src={fotoDurante2}
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
							onChange={(e) => subirFoto(e, "fotoDurante2")}
							type="file"
						/>
						<label htmlFor="durante2">
							Durante
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
			</div>
			<div className="row despues">
				{fotoDespues1 ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo5((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo5((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoDespues1")}>
							X
						</b>
						<img
							src={fotoDespues1}
							alt="despues1"
							style={{
								transform: `rotate(${angulo5}deg)`,
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
							id="despues1"
							onChange={(e) => subirFoto(e, "fotoDespues1")}
							type="file"
						/>
						<label htmlFor="despues1">
							Despues
							<IconButton color="primary" component="span">
								<span className="material-icons">add_a_photo</span>
							</IconButton>
						</label>
					</div>
				)}
				{fotoDespues2 ? (
					<div className="cell">
						<b
							className="btnRotateLeft"
							onClick={() =>
								setAngulo6((prevAngulo) =>
									prevAngulo === -270 ? (prevAngulo = 0) : prevAngulo - 90
								)
							}>
							L
						</b>
						<b
							className="btnRotateRight"
							onClick={() =>
								setAngulo6((prevAngulo) =>
									prevAngulo === 270 ? (prevAngulo = 0) : prevAngulo + 90
								)
							}>
							R
						</b>
						<b
							className="btnDelete"
							onClick={() => subirFoto(null, "fotoDespues2")}>
							X
						</b>
						<img
							src={fotoDespues2}
							alt="despues2"
							style={{
								transform: `rotate(${angulo6}deg)`,
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
							id="despues2"
							onChange={(e) => subirFoto(e, "fotoDespues2")}
							type="file"
						/>
						<label htmlFor="despues2">
							Etiqueta
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

export default AddEvidencia;
