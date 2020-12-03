import React, { useState, useEffect } from "react";
import moment from "moment";
import QRCode from "qrcode.react";

import "./workorder.scss";

function WorkOrder(props) {
	const data = { ...props.data };

	console.log(data);

	const [finDelServicio, setFinDelServicio] = useState("");
	const [folio, setFolio] = useState("");
	const [tiempos, setTiempos] = useState(props.data.tiempos);
	const [herramientas, setHerramientas] = useState(props.data.herramientas);
	const [refacciones, setRefacciones] = useState(props.data.refacciones);
	const [shortTDS, setShortTDS] = useState("");

	const calcularFolio = () => {
		let y = moment(data.tiempos[0][1]).format("YY");
		let h = moment(data.tiempos[0][2]).format("HH");
		let m = moment(data.tiempos[0][2]).format("mm");
		let t1 = Number(h) + Number(m);
		let t2 = Number(m) / 5;
		let t = t1 - t2;
		let temp =
			data.inge.iniciales +
			moment(data.tiempos[0][1]).format("D") +
			moment(data.tiempos[0][1]).format("M") +
			y.substr(1) +
			"." +
			t;
		setFolio(temp);
	};

	const calcularFinDeServicio = () => {
		let fin = moment(data.tiempos[data.tiempos.length - 1][3]).format(
			"D [de] MMMM [de] YYYY"
		);
		setFinDelServicio(fin);
	};

	const displayTiempos = () => {
		let arrTemp = [...data.tiempos];
		switch (data.tiempos.length) {
			case 1:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setTiempos(arrTemp);
				break;
			case 2:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setTiempos(arrTemp);
				break;
			case 3:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setTiempos(arrTemp);
				break;
			case 4:
				arrTemp.push([]);
				arrTemp.push([]);
				setTiempos(arrTemp);
				break;
			case 5:
				arrTemp.push([]);
				setTiempos(arrTemp);
				break;
			case 6:
				setTiempos(arrTemp);
				break;

			default:
				break;
		}
	};

	const displayHerramientas = () => {
		let arrTemp = [...data.herramientas];
		switch (data.herramientas.length) {
			case 0:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setHerramientas(arrTemp);
				break;
			case 1:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setHerramientas(arrTemp);
				break;
			case 2:
				arrTemp.push([]);
				arrTemp.push([]);
				setHerramientas(arrTemp);
				break;
			case 3:
				arrTemp.push([]);
				setHerramientas(arrTemp);
				break;
			case 4:
				setHerramientas(arrTemp);
				break;
			default:
				break;
		}
	};

	const displayRefacciones = () => {
		let arrTemp = [...data.refacciones];

		switch (data.refacciones.length) {
			case 0:
				arrTemp.push([]);
				arrTemp.push([]);
				arrTemp.push([]);
				setRefacciones(arrTemp);
				break;
			case 1:
				arrTemp.push([]);
				arrTemp.push([]);
				setRefacciones(arrTemp);
				break;
			case 2:
				arrTemp.push([]);
				setRefacciones(arrTemp);
				break;
			case 3:
				setRefacciones(arrTemp);
				break;
			default:
				break;
		}
	};

	const compressTipoDeServicio = () => {
		switch (data.tipoDeServicio) {
			case "PM (Mantenimiento Preventivo)":
				setShortTDS("PM");
				break;
			case "CM (Mantenimiento Correctivo)":
				setShortTDS("CM");
				break;
			case "FMI":
				setShortTDS("FMI");
				break;
			case "INS (Instalación)":
				setShortTDS("INS");
				break;
			case "Otros":
				setShortTDS("Otro");
				break;
			case "HBS":
				setShortTDS("HBS");
				break;
			case "Aplicaciones":
				setShortTDS("App");
				break;
			case "Desinstalación":
				setShortTDS("DeINS");
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		calcularFinDeServicio();
		calcularFolio();
		displayTiempos();
		displayHerramientas();
		displayRefacciones();
		compressTipoDeServicio();
	}, []);

	return (
		<div className="workorder">
			<div className="rows">
				<div className="row1">
					<div className="logo"></div>
					<div className="datosge">
						<p>
							<b>GE Healthcare</b>
						</p>
						<p>GE SISTEMAS MEDICOS DE MEXICO S.A. DE C.V.</p>
						<p>Antonio Dovali Jaime No. 70, Torre B Piso 5</p>
						<p> Col. Santa Fe Del. Alvaro Obregón, C.P. 01210 CDMX</p>
						<p>Atención a Clientes Servicio 01 800 904 3400</p>
					</div>
					<div className="folios">
						<p>Hoja de servicio</p>
						<div className="foliosAbajo">
							<div className="numerosFolios">
								<div>
									<span>No. De Folio</span>
									<span className="node nodefolio">{folio}</span>
								</div>
								<div>
									<span>No. De CASE</span>
									<span className="node">{data.case}</span>
								</div>
								<div>
									<span>No. De WO</span>
									<span className="node">{data.wo}</span>
								</div>
							</div>
							<div className="qrcode">
								<QRCode
									value={`${data.wo} ${data.case} ${shortTDS} ${data.equipo.cliente} ${data.equipo.sid} ${finDelServicio}`}
									bgColor={"#ffffff"}
									fgColor={"#000000"}
									level={"L"}
									includeMargin={false}
									renderAs={"svg"}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row2">
					<div className="datoscliente">
						<div>
							<span>Razón Social:</span>
							<span>{data.equipo.hospital}</span>
						</div>
						<div>
							<span>Ciudad / Localidad: </span>
							<span>
								{data.equipo.estado
									? data.equipo.ciudad + ", " + data.equipo.estado
									: data.equipo.ciudad}
							</span>
						</div>
						<div>
							<span>Delegación:</span>
							<span>{data.equipo.delegacion}</span>
						</div>
						<div>
							<span>Dependencia:</span>
							<span>
								{data.equipo.cliente === "" ? "" : data.equipo.cliente}
							</span>
						</div>
						<div>
							<span>Dirección:</span>
							<span className="smallText">{data.equipo.direccion}</span>
						</div>
						<div className="telcliente">
							<span>Teléfono:</span>
							<span></span>
						</div>
					</div>
					<div className="datosequipo">
						<div className="sid">
							<span>SID:</span>
							<b>{data.equipo.sid}</b>
						</div>
						<div className="equipo">
							<span>Equipo:</span>
							<span>{data.equipo.equipo}</span>
						</div>
						<div>
							<span>Modelo:</span>
							<span>{data.equipo.modelo}</span>
						</div>
						<div>
							<span>Serie:</span>
							<span>{data.equipo.serie}</span>
						</div>
						<div className="modalidad">
							<span>Modalidad:</span>
							<span></span>
						</div>
					</div>
				</div>
				<div className="row3">
					<div className="row3L">
						<span className="periododeserv">Periodo de Servicio</span>
						<div className="titulosTiempos">
							<span>Tipo de Trabajo</span>
							<span>Fecha de Inicio</span>
							<span>Fecha Final</span>
						</div>
						<div className="row3L-r">
							<b></b>
							<b>Dia</b>
							<b>Hora</b>
							<b>Dia</b>
							<b>Hora</b>
						</div>
						{tiempos &&
							tiempos.map((time, index) => {
								return (
									<div key={index} className="row3L-r">
										<b>{time[0] ? time[0] : null}</b>
										<span>
											{time[1] ? moment(time[1]).format("DD/MM/YY") : null}
										</span>
										<span>
											{time[2] ? moment(time[2]).format("HH:mm") : null}
										</span>
										<span>
											{time[3] ? moment(time[3]).format("DD/MM/YY") : null}
										</span>
										<span>
											{time[4] ? moment(time[4]).format("HH:mm") : null}
										</span>
									</div>
								);
							})}
						<div className="findeservicio">
							<b>Fin de Servicio:</b>
							<b>{finDelServicio}</b>
						</div>
						<b className="descCompleta">DESCRIPCIÓN COMPLETA DEL SERVICIO</b>
						<b className="descripcion">{data.descripcion}</b>
					</div>
					<div className="row3R">
						<b className="rowtitle">Servicio</b>
						<div className="row3R-r">
							<span>Tipo de servicio:</span>
							<b>{data.tipoDeServicio}</b>
						</div>
						<div className="row3R-r">
							<span>Tipo de trabajo:</span>
							<b>{data.tipoDeContrato}</b>
						</div>
						<div className="row3R-r">
							<span>Contrato No.</span>
							<span>{data.equipo.contrato}</span>
						</div>
						<div className="row3R-r">
							<span>GON de Instalación:</span>
							<span></span>
						</div>
						<b className="rowtitle">SINTOMA</b>
						<b className="sintoma">{data.sintoma}</b>
						<b className="rowtitle">HERRAMIENTA UTILIZADA (CALIBRABLE)</b>
						<div className="row3R-rh herrtitles">
							<span>Calibración sig.</span>
							<span>Barcode</span>
							<span>Herramienta</span>
						</div>
						{herramientas &&
							herramientas.map((herr, index) => {
								return (
									<div key={index} className="row3R-rh">
										<span>
											{herr[0] ? moment(herr[0]).format("DD/MM/YY") : null}
										</span>
										<span> {herr[1]} </span>
										<span> {herr[2]} </span>
									</div>
								);
							})}
					</div>
				</div>
				<div className="row4">
					<div>
						<b>
							EL EQUIPO QUEDA OPERATIVAMENTE APTO PARA REALIZAR EL TRABAJO PARA
							LO QUE FUE DISEÑADO
						</b>
						<span>{data.apto ? `SI ✓` : "NO"} </span>
					</div>
					<div>
						<b>FUNCIONANDO AL 100%</b>
						<span> {data.funcionando ? `SI ✓` : "NO"} </span>
					</div>
				</div>
				<div
					className={
						data.condiciones === "Reprogramado"
							? "row5 row5_2fr_en_Reprog"
							: "row5"
					}>
					<b className="obsTitle">Observaciones</b>
					<span className="observaciones"> {data.observaciones} </span>
					<b className="reprogTitle">Reprogramación del servicio:</b>
					<b className="reprog">
						{data.condiciones === "Reprogramado"
							? "En vista de la imposibilidad de realización del mantenimiento preventivo en el periodo designado por el manual, y tomando en consideración la solicitud del cliente, el mantenimiento previsto originalmente para el día:_____________, ahora será llevado a cabo el día:____________."
							: "N/A"}
					</b>
					<div className="condiciones">
						<b>Condiciones en las que se deja el equipo:</b>
						<b>{data.condiciones}</b>
					</div>
				</div>
				<div
					className={
						data.condiciones === "Reprogramado"
							? "row6 row6_5fr"
							: "row6 row6_6fr"
					}>
					<b className="refsTitle">
						Kit y refacciones utilizadas en el servicio
					</b>
					<div className="row6-4c">
						<b>Cant</b>
						<b># Parte / Catálogo</b>
						<b>Descripción</b>
						<b>No. Orden / No. de GON</b>
					</div>
					{refacciones &&
						refacciones.map((refa, index) => {
							return (
								<div key={index} className="row6-4c">
									<span> {refa[0]} </span>
									<span> {refa[1]} </span>
									<span> {refa[2]} </span>
									<span> {refa[3]} </span>
								</div>
							);
						})}
					<div className="sellos sellosTitle">
						<span>Sello de Unidad</span>
						<span>Sello Fechador</span>
						<span>Sello Clave Presupuestal</span>
					</div>
					<div className="sellos">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className="row7">
					<span className="firmasTitle">
						Firmas de Aceptación y Visto Bueno
					</span>
					<div className="firmas">
						<div className="firmaFE">
							<span>{data.inge.nombre} </span>
							<span className="line">Nombre completo</span>
							<span></span>
							<span></span>
							<span className="line">Ingeniero de Servicio</span>
						</div>
						<div className="firmaUsuario">
							<span></span>
							<span className="line">Nombre completo</span>
							<span></span>
							<span className="line">Cargo</span>
							<span></span>
							<span className="line">Matrícula</span>
							<span></span>
							<span></span>
							<span className="line">Jefe de Área / Usuario Responsable</span>
						</div>
						<div className="firmaConser">
							<span></span>
							<span className="line">Nombre completo</span>
							<span></span>
							<span className="line">Cargo</span>
							<span></span>
							<span className="line">Matrícula</span>
							<span></span>
							<span></span>
							<span className="line">Jefe de Conservación</span>
						</div>
					</div>
					<b className="footer">
						Nuestro compromiso es su satisfacción total. Si necesita contactar a
						GE Healthcare y GE Sistemas Medicos de México S.A. de C.V. por
						cualquier otro motivo que no sea una llamada de servicio y los
						canales normales de comunicación no le contestan satisfactoriamente,
						entre en el siguiente sitio web: http://ecso.gehealthcare.com
					</b>
				</div>
			</div>
		</div>
	);
}

export default WorkOrder;
