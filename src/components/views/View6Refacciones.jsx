import React, { useState, useEffect } from "react";

import { Button, TextField } from "@material-ui/core";

function View6Refacciones(props) {
	const [refacciones, setRefacciones] = useState([]);
	const [cantidad, setCantidad] = useState("");
	const [parte, setParte] = useState("");
	const [descripcionParte, setDescripcionParte] = useState("");
	const [orden, setOrden] = useState("");

	useEffect(() => {
		if (props.flag) {
			props.onDone(refacciones);
		}
	}, [props.flag]);

	const addRefaccion = () => {
		let arrTemp = [...refacciones];
		arrTemp.push([cantidad, parte, descripcionParte, orden]);
		setRefacciones(arrTemp);
		setParte("");
		setDescripcionParte("");
		setOrden("");
		props.onDone(arrTemp);
	};

	const deleteRefaccion = (i) => {
		let arrTemp = [...refacciones];
		arrTemp.splice(i, 1);
		setRefacciones(arrTemp);
		props.onDone(arrTemp);
	};

	return (
		<>
			<h3>Refacciones</h3>
			<div className="refXAgregar">
				<TextField
					label="Cantidad"
					fullWidth
					type="number"
					variant="outlined"
					size="small"
					value={cantidad}
					onChange={(e) => setCantidad(e.target.value)}
				/>
				<TextField
					label="# Parte / Catálogo"
					fullWidth
					variant="outlined"
					size="small"
					value={parte}
					onChange={(e) => setParte(e.target.value)}
				/>
				<TextField
					label="Descripción"
					fullWidth
					variant="outlined"
					size="small"
					value={descripcionParte}
					onChange={(e) => setDescripcionParte(e.target.value)}
				/>
				<TextField
					label="No. de Orden / No. de GON"
					fullWidth
					variant="outlined"
					size="small"
					value={orden}
					onChange={(e) => setOrden(e.target.value)}
				/>

				<div className="btnAddRef">
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => addRefaccion()}>
						Agregar
					</Button>
				</div>
			</div>
			<div className="refAgregadas">
				{refacciones.length > 0 ? (
					<>
						<ul className="ulref">
							<li>Cant.</li>
							<li># Parte / Catálogo</li>
							<li>Descripción</li>
							<li>No. de Orden / No. de GON</li>
							<li>Borrar</li>
						</ul>

						{refacciones.map((refa, index) => {
							return (
								<ul className="ulref" key={index}>
									<li>{refa[0]}</li>
									<li>{refa[1]}</li>
									<li>{refa[2]}</li>
									<li>{refa[3]}</li>
									<li>
										<b
											className="btnDeleteTime"
											onClick={() => deleteRefaccion(index)}>
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

export default View6Refacciones;
