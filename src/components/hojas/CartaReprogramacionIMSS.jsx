import moment from "moment";
import React from "react";
import "./cartaReprogramacionIMSS.scss";

function CartaReprogramacionIMSS(props) {
	console.log(props);

	const ciudad = props.data.equipo.ciudad;
	const cliente = props.data.equipo.hospital;
	const domicilio = props.data.equipo.direccion;
	const sid = props.data.equipo.sid;
	const hoy = props.data.tiempos[0][1];
	const fechaReprog = props.data.fechaDeReprogramacion;
	const representante = "José Ávila Muñóz";

	return (
		<div className="cartaReprogramacionIMSSC">
			<div className="header">
				<b>GE Sistemas Médicos de México S.A. de C.V.</b>
				<span>Antonio Dovalí Jaime No. 70, Torre A piso 4</span>
				<span>Col. Santa Fe, Álvaro Obregón</span>
				<span>Ciudad de México, 01210</span>
			</div>
			<div className="fecha">
				<div className="logo"></div>
				<div className="ciudad">
					<span>{ciudad.toLowerCase()}</span>, a{" "}
					{moment(hoy).format("DD [de] MMMM [de] YYYY")}
				</div>
			</div>
			<div className="cliente">
				<h4>{cliente}</h4>
				<h4>{domicilio}</h4>
				<p>PRESENTE</p>
				<span>
					Re: <u>Reprogramación de mantenimiento preventivo</u>
				</span>
			</div>
			<div className="body">
				<p>Estimado cliente:</p>
				<p>
					En relacion con el equipo identificado con el número de serie (SID){" "}
					{sid}, y toda vez que para garantizar el perfecto funcionamiento y
					cumplir con las epecificaciones técnicas de los equipos de diagnóstico
					por imagen de la marca GE, es recomendable que los mantenimientos
					preventivos sean realizados de acuerdo a las especificaciones de
					fábrica.
				</p>
				<p>
					En dichos mantenimientos se verifican todos los rubros designados para
					limpieza, calibración, comprobación, etc., y deben ser realizados
					durante horas hábiles y durante el periodo de cobertura acordado en el
					contrato correspondiente.
				</p>
				<p>
					En vista de la imposibilidad de realización del mantenimiento
					preventivo en el periodo designado por el manual, y tomando en
					consideración su solicitud, el mantenimiento previsto originalmente
					para el día {moment(hoy).format("DD [de] MMMM [de] YYYY")}, ahora será
					llevado a cado el día{" "}
					{moment(fechaReprog).format("DD [de] MMMM [de] YYYY")}.
				</p>
				<p>
					Al firmar la presente carta, las partes aceptan en comun acuerdo
					modificar la fecha de ejecución del Mantenimiento Preventivo
				</p>
			</div>
			<div className="atte">
				<p>Atentamente,</p>
				<b className="ge">GE Sistemas Médicos de México, S.A. de C.V.</b>
				<b>De conformidad:</b>
				<h4>{cliente}</h4>
				<div className="firma"></div>
				<p>{representante}</p>
				<p>Representante legal</p>
			</div>
		</div>
	);
}

export default CartaReprogramacionIMSS;
