import React from "react";
import "./fichatecnica.scss";

function FichaTecnica(props) {
	const data = { ...props.data };

	return (
		<div className="fichatecnica">
			<div className="rows">
				<h2 className="grayed centerText">FICHA TÉCNICA</h2>
				<div className="row c3fr4fr">
					<b className="grayed">N° DE ID SMEM V1:</b>
					<p></p>
					<b className="grayed">N° DE ID SMEM V2:</b>
					<p></p>
				</div>
				<div className="row c3fr4fr">
					<b className="grayed">CONTRATO:</b>
					<p>{data.equipo.contrato}</p>
					<b className="grayed">EMPRESA PRESTADORA DE SERVICIO:</b>
					<p>GE Sistemas Médicos de México, S.A. de C.V.</p>
				</div>
				<div className="row c3frauto">
					<b className="grayed">DESCIRPCIÓN DEL BIEN</b>
					<p>{data.equipo.equipo}</p>
				</div>
				<div className="row c6fr">
					<b className="grayed">GRUPO:</b>
					<p></p>
					<b className="grayed">CLAVE:</b>
					<p></p>
					<b className="grayed">NOMBRE GENÉRICO:</b>
					<p></p>
				</div>
				<div className="row c8fr">
					<b className="grayed">MARCA:</b>
					<p>{data.equipo.marca}</p>
					<b className="grayed">MODELO:</b>
					<p>{data.equipo.modelo}</p>
					<b className="grayed">SERIE:</b>
					<p>{data.equipo.serie}</p>
					<b className="grayed">INVENTARIO:</b>
					<p>{data.equipo.inventario}</p>
				</div>
				<div className="row c4fr">
					<b className="grayed">UNIDAD MÉDICA DE ADSCRIPCIÓN:</b>
					<p>{data.equipo.hospital}</p>
					<b className="grayed">UBICACIÓN:</b>
					<p>{data.datosISSSTE && data.datosISSSTE.ubicacion}</p>
				</div>
				<b className="grayed centerText row">REFERENCIAS TÉCNICAS</b>
				<div className="row c2fr3fr">
					<b className="grayed">ESTADO TÉCNICO DEL BIEN:</b>
					<p>
						{data.condiciones === "Funcionando"
							? "Equipo funcionando correctamente"
							: ""}
					</p>
					<b className="grayed">PERIODO ESTIMADO DE VIDA ÚTIL:</b>
					<p>
						{data.datosISSSTE && data.datosISSSTE.vidaUtil !== ""
							? `Aproximadamente ${data.datosISSSTE.vidaUtil} años`
							: ""}
					</p>
					<b className="grayed">DISPONIBILIDAD DE REFERENCIA EN EL MERCADO:</b>
					<p>
						{data.datosISSSTE && data.datosISSSTE.vidaUtil !== ""
							? `Aproximadamente ${data.datosISSSTE.vidaUtil} años`
							: ""}
					</p>
					<b className="grayed">
						ESTADO QUE GUARDAN LOS ACCESORIOS Y CONSUMIBLES DEL EQUIPO:
					</b>
					<p>
						{data.condiciones === "Funcionando"
							? "El equipo se encuentra con accesorios y en buenas condiciones"
							: ""}
					</p>
				</div>
				<b className="grayed centerText row">MEMORIA FOTOGRAFICA DEL EQUIPO</b>
				<div className="row c1fr">
					<b className="grayed">FOTO NORMAL</b>
					<b className="grayed">PLACA N° DE SERIE</b>
					<div className="cuadroContainer">
						<img
							className="cuadro"
							alt="foto"
							src={data.datosISSSTE && data.datosISSSTE.fotoNormal}
							style={{
								transform: `rotate(${props.angulos[0]}deg)`,
								height: "inherit",
							}}></img>
					</div>
					<div className="cuadroContainer">
						<img
							className="cuadro"
							alt="foto"
							src={data.datosISSSTE && data.datosISSSTE.fotoSerie}
							style={{
								transform: `rotate(${props.angulos[1]}deg)`,
								height: "inherit",
							}}></img>
					</div>
				</div>
				<div className="row c1fr">
					<b className="grayed">PLACA N° DE INVENTARIO</b>
					<b className="grayed">FOTO PANORÁMICA DEL BIEN</b>
					<div className="cuadroContainer">
						<img
							className="cuadro"
							alt="foto"
							src={data.datosISSSTE && data.datosISSSTE.fotoInventario}
							style={{
								transform: `rotate(${props.angulos[2]}deg)`,
								height: "inherit",
							}}></img>
					</div>
					<div className="cuadroContainer">
						<img
							className="cuadro"
							alt="foto"
							src={data.datosISSSTE && data.datosISSSTE.fotoPanoramica}
							style={{
								transform: `rotate(${props.angulos[3]}deg)`,
								height: "inherit",
							}}></img>
					</div>
				</div>
				<div className="row c1fr firmas">
					<span className="borderB">{data.inge.nombre}</span>
					<span className="borderB"></span>
					<span>ELABORÓ</span>
					<span>AUTORIZÓ</span>
				</div>
			</div>
		</div>
	);
}

export default FichaTecnica;
