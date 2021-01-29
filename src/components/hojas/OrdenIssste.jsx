import React, { useState, useEffect } from "react";
import moment from "moment";

import "./ordenissste.scss";

function OrdenIssste(props) {
	const data = { ...props.data };

	console.log(data);
	const [finDelServicio, setFinDelServicio] = useState("");
	const [finDeMes, setFinDeMes] = useState("");
	const [misRefacciones, setMisRefacciones] = useState([]);

	const calcularFinDeServicio = () => {
		let fin = moment(data.tiempos[data.tiempos.length - 1][3]);
		let finmes = moment(fin).endOf("month").format("DD");
		setFinDeMes(finmes);
		setFinDelServicio(fin);
	};

	const cortarTexto = (mydata) => {
		let midesc = [];
		let des0 = [];
		let des1 = [];
		let des2 = [];
		let des3 = [];
		mydata ? (des0 = mydata.split(" ")) : (des0 = []);
		if (des0.length > 13) {
			for (let i = 13; i < des0.length; i++) {
				des1.push(des0[i]);
			}
			des0.splice(13, des0.length);
			midesc.push(des0.join(" "));
		} else {
			midesc.push(des0.join(" "));
		}
		if (des1.length > 13) {
			for (let i = 13; i < des1.length; i++) {
				des2.push(des1[i]);
			}
			des1.splice(13, des1.length);
			midesc.push(des1.join(" "));
		} else {
			midesc.push(des1.join(" "));
		}
		if (des2.length > 13) {
			for (let i = 13; i < des2.length; i++) {
				des3.push(des2[i]);
			}
			des2.splice(13, des2.length);
			midesc.push(des2.join(" "));
			midesc.push(des3.join(" "));
		} else {
			midesc.push(des2.join(" "));
			midesc.push(des3.join(" "));
		}
		console.log(midesc);
		return (
			<>
				{midesc.map((desc, index) => (
					<div key={index} className={"centerText"}>
						{/* {`${index}.- ${desc}`} */}
						{desc}
					</div>
				))}
			</>
		);
	};

	const displayRefacciones = () => {
		let arrTemp = [
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
		];
		switch (data.refacciones.length) {
			case 0:
				break;
			case 1:
				arrTemp = [
					[
						data.refacciones[0][1],
						data.refacciones[0][2],
						data.refacciones[0][0],
						"pza",
					],
					["", "", "", ""],
					["", "", "", ""],
				];
				break;
			case 2:
				arrTemp = [
					[
						data.refacciones[0][1],
						data.refacciones[0][2],
						data.refacciones[0][0],
						"pza",
					],
					[
						data.refacciones[1][1],
						data.refacciones[1][2],
						data.refacciones[1][0],
						"pza",
					],
					["", "", "", ""],
				];
				break;
			case 3:
				arrTemp = [
					[
						data.refacciones[0][1],
						data.refacciones[0][2],
						data.refacciones[0][0],
						"pza",
					],
					[
						data.refacciones[1][1],
						data.refacciones[1][2],
						data.refacciones[1][0],
						"pza",
					],
					[
						data.refacciones[2][1],
						data.refacciones[2][2],
						data.refacciones[2][0],
						"pza",
					],
				];
				break;
			default:
				break;
		}
		setMisRefacciones(arrTemp);
	};
	useEffect(() => {
		calcularFinDeServicio();
		displayRefacciones();
	}, []);

	return (
		<div className="ordenissste">
			<div className="rows">
				<div className="row1">
					<div className="logo"></div>
					<div className="datosissste">
						<b>DIRECCIÓN DE ADMINISTRACIÓN</b>
						<b>SUBDIRECCIÓN DE CONSERVACIÓN Y MANTENIMIENTO</b>
						<b></b>
						<b>ÁCTA ENTREGA-RECEPCIÓN</b>
						<b></b>
						<b>MANTENIMIENTO PREVENTIVO - CORRECTIVO</b>
						<b></b>
					</div>
					<div className="folios">
						<b></b>
						<b></b>
						<b></b>
						<b></b>
						<div className="numero">
							<b>No. </b> <b>{data.equipo.consecutivo} </b>
						</div>
						<b></b>
						<div className="hojade">
							<b>Hoja No.</b> <span>1</span> <b>de:</b> <span>1</span>
						</div>
					</div>
				</div>
				<div className="row2">
					<div className="row2row row2L">
						<div className="grayed borderR"> Datos de la Empresa </div>
						<div>
							<b className="paddingL">Empresa:</b>
							<span>GE Sistemas Medicos de Mexico , S.A. de C.V.</span>
						</div>
						<div>
							<b className="paddingL">Domiciio:</b>
							<span className="smallText">
								Antonio Dovali Jaime #70 Torre B Piso 4 Col. Santa Fe C.P. 01210
							</span>
						</div>
						<div>
							<b className="paddingL">Ciudad:</b>
							<span>México D.F.</span>
						</div>
						<div>
							<b className="paddingL">Teléfono:</b>
							<span>55-9177-0300</span>
						</div>
						<div className="bottom paddingL">
							<b>Técnico:</b>
							<span> {data.inge.nombre} </span>
						</div>
						<div className="grayed borderR">Datos Técnicos</div>
						<div>
							<b className="paddingL">Equipo:</b>
							<span>{data.equipo.equipo}</span>
						</div>
						<div>
							<b className="paddingL">Marca:</b>
							<span>{data.equipo.marca}</span>
						</div>
						<div>
							<b className="paddingL">Modelo:</b>
							<span>{data.equipo.modelo}</span>
						</div>
						<div>
							<b className="paddingL">Serie:</b>
							<span>{data.equipo.serie}</span>
						</div>
						<div>
							<b className="paddingL">Inventario:</b>
							<span>{data.equipo.inventario}</span>
						</div>
						<div>
							<b className="paddingL">Ubicación:</b>
							<span>{data.datosISSSTE && data.datosISSSTE.ubicacion} </span>
						</div>
						<div className="borderBN"></div>
					</div>
					<div className="row2row row2R">
						<div className="grayed borderL"></div>
						<div>
							<b>Unidad Médica:</b>
							<span className="alignEnd">{data.equipo.hospital}</span>
						</div>
						<div>
							<b>Domicilio:</b>
							<span className="smallText">{data.equipo.direccion}</span>
						</div>
						<div>
							<b>Entidad:</b>
							<span>{data.equipo.ciudad + ", " + data.equipo.estado}</span>
						</div>
						<div className="contrato">
							<b>Contrato:</b>
							<span>{data.equipo.contrato} </span>
							<b>Bitácora:</b>
							<span>{data.datosISSSTE && data.datosISSSTE.bitacora}</span>
						</div>
						<div className="grayed borderL">
							Matenimiento Preventivo-Correctivo
						</div>
						<div></div>
						<div className="fechas">
							<b className="paddingL smallText">Fecha del Mantenimiento</b>
							<div className="fechaHeader">
								<b className="borderB">Programado</b>
								<div className="dma">
									<b>D</b>
									<b className="borderR borderL">M</b>
									<b>A</b>
								</div>
							</div>
							<div className="fechaHeader">
								<b className="borderB">Real</b>
								<div className="dma">
									<b>D</b>
									<b className="borderR borderL">M</b>
									<b>A</b>
								</div>
							</div>
							<div className="fechaHeader">
								<b className="borderB">Diferencia</b>
								<div className="dma">
									<b>D</b>
									<b className="borderR borderL">M</b>
									<b>A</b>
								</div>
							</div>
						</div>
						<div className="fechas">
							<b className="paddingL">Inicio</b>
							<div className="dma borderL">
								{data.tipoDeServicio !== "PM (Mantenimiento Preventivo)" ? (
									<span>{moment(finDelServicio).format("DD")}</span>
								) : (
									<span>01</span>
								)}
								<span className="borderR borderL">
									{moment(finDelServicio).format("MMM")}
								</span>
								<span>{moment(finDelServicio).format("YY")} </span>
							</div>
							<div className="dma borderL">
								<span>{moment(finDelServicio).format("DD")} </span>
								<span className="borderR borderL">
									{moment(finDelServicio).format("MMM")}
								</span>
								<span>{moment(finDelServicio).format("YY")} </span>
							</div>
							<div className="dma borderL ">
								<span>-</span>
								<span className="borderR borderL">-</span>
								<span>-</span>
							</div>
						</div>
						<div className="fechas">
							<b className="paddingL">Término</b>
							<div className="dma borderL">
								{data.tipoDeServicio !== "PM (Mantenimiento Preventivo)" ? (
									<span>{moment(finDelServicio).format("DD")}</span>
								) : (
									<span>{finDeMes}</span>
								)}
								<span className="borderR borderL">
									{moment(finDelServicio).format("MMM")}
								</span>
								<span>{moment(finDelServicio).format("YY")} </span>
							</div>
							<div className="dma borderL">
								<span>{moment(finDelServicio).format("DD")} </span>
								<span className="borderR borderL">
									{moment(finDelServicio).format("MMM")}
								</span>
								<span>{moment(finDelServicio).format("YY")} </span>
							</div>
							<div className="dma borderL ">
								<span>-</span>
								<span className="borderR borderL">-</span>
								<span>-</span>
							</div>
						</div>
						<div className="atraso">
							<b className="paddingL borderL">Días de atraso</b>
							<span className="borderL centerText">0</span>
							<span className="borderL"></span>
						</div>
						<div className="borderBN"></div>
					</div>
				</div>
				<div className="row3">
					<div className="grayed">Descripción completa del Servicio</div>
					<div className="row3row mantenimientos">
						<b>MANTENIMIENTO PREVENTIVO</b>
						<div className="col5fr">
							<b className="borderL borderR">
								{data.tipoDeServicio === "PM (Mantenimiento Preventivo)"
									? "X"
									: null}
							</b>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<b>MANTENIMIENTO CORRECTIVO</b>
						<div className="col5fr">
							<b className="borderL borderR">
								{data.tipoDeServicio !== "PM (Mantenimiento Preventivo)"
									? "X"
									: null}
							</b>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					{cortarTexto(data.sintoma)}
					{cortarTexto(data.descripcion)}
					<div></div>
					<div className="grayed">
						Condiciones en las que se deja el Equipo:
					</div>
					<div className="row3row condiciones">
						<b>Funcionando</b>
						<div className="col5fr">
							<b className="borderL borderR">
								{data.condiciones === "Funcionando" ? "X" : null}
							</b>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<b>Funcionando Parcialmente</b>
						<div className="col5fr">
							<b className="borderL borderR">
								{data.condiciones === "Parcialmente funcionando" ? "X" : null}
							</b>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<b>Fuera de Servicio</b>
						<div className="col5fr">
							<b className="borderL borderR">
								{data.condiciones === "No funcional" ? "X" : null}
							</b>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					<div className="observaciones">
						<div className="obsIzq">
							<b className="paddingL borderB">Observaciones:</b>
							<div></div>
							<div></div>
							<div></div>
							<div className="borderBN"></div>
						</div>
						<div className="obsDer">{cortarTexto(data.observaciones)}</div>
					</div>
				</div>
				<div className="row4">
					<div className="row4L borderR borderL">
						<div className="grayed borderB">
							Kit y refacciones utilizadas en el servicio
						</div>
						<div className="row4Lrow">
							<b className="borderR">No. Parte/Código</b>
							<b className="borderR">Descripción</b>
							<b className="borderR">Cant</b>
							<b>Unidad</b>
						</div>
						{misRefacciones &&
							misRefacciones.map((refa, index) => {
								return (
									<div key={index} className="row4Lrow">
										<span className="borderR">{refa[0]}</span>
										<span className="borderR">{refa[1]}</span>
										<span className="borderR">{refa[2]}</span>
										<span>{refa[3]}</span>
									</div>
								);
							})}
						<div className="row4Lrow">
							<span className="borderR"></span>
							<span className="borderR"></span>
							<span className="borderR"></span>
							<span></span>
						</div>
						<div className="row4Lrow">
							<span className="borderR"></span>
							<span className="borderR"></span>
							<span className="borderR"></span>
							<span></span>
						</div>

						<div className="horasreales">
							<b className="paddingL">
								HORAS REALES UTILIZADAS EN LA REPARACIÓN
							</b>
							<span className="centerText">
								{data.datosISSSTE && data.datosISSSTE.hrsReales}
							</span>
							<b className="centerText">HRS.</b>
						</div>
					</div>
					<div className="row4R">
						<b>Unidad</b>
						<b></b>
						<b></b>
						<b></b>
						<b></b>
						<b></b>
						<b></b>
						<b>Sello con fecha, Nombre y Firma</b>
					</div>
				</div>
				<div className="row5">
					<div className="row5col">
						<div></div>
						<b>Contratista</b>
						<div></div>
						<span> {data.inge.nombre} </span>
						<p className="borderB">
							{moment(finDelServicio).format("DD-MMM-YYYY")}
						</p>
						<span>INGENIERO</span>
						<span>Nombre, Firma y Fecha </span>
						<div></div>
					</div>
					<div className="row5col">
						<div></div>
						<b>Conforme</b>
						<div></div>
						<div></div>
						<p className="borderB"></p>
						<span>OPERADOR DEL EQUIPO</span>
						<span>Nombre, Firma y Fecha </span>
						<div></div>
					</div>
					<div className="row5col">
						<div></div>
						<b>Vo. Bo.</b>
						<div></div>
						<div></div>
						<p className="borderB"></p>
						<span>RESIDENTE Y/O J. DE DEPTO. Y/O RESPONSABLE DE LA UNIDAD</span>
						<span>Nombre, Firma y Fecha </span>
						<div></div>
					</div>
					<div className="row5col">
						<div></div>
						<b>Autorizó</b>
						<div></div>
						<div></div>
						<p className="borderB"></p>
						<span></span>
						<div></div>
						<div></div>
					</div>
				</div>
				<b className="centerText borderL borderR borderB">
					BAJO MI RESPONSABILIDAD SE AUTORIZAN CONCEPTOS Y RENDIMIENTOS PARA SU
					TRAMITE DE PAGO.
				</b>
				<span className="centerText borderL borderR borderB">
					NOTAS ACLARATORIAS AL REVERSO ( TURNAR COPIA ORIGINAL AL RESIDENTE )
				</span>
				<br />
				<br />
				<div className="row6">
					<div className="row6col row6L borderL">
						<div className="grayed borderT borderB borderR">GENERALIDADES</div>
						<div></div>
						<div className="servAnterior">
							<span>Servicio Anterior por Mantenimiento:</span>
							<b>Prev.</b>
							<div className="borderB borderT centerText">
								{data.tipoDeServicio === "PM (Mantenimiento Preventivo)"
									? "X"
									: null}
							</div>
							<b>Correc.</b>
							<div className="borderB borderT borderR centerText">
								{data.tipoDeServicio !== "PM (Mantenimiento Preventivo)"
									? "X"
									: null}
							</div>
							<div></div>
							<b>Autorización SMEM</b>
						</div>
						<div className="row6Lcol_5fr_2fr">
							<span>Fecha de último servicio:</span>
							<div className="borderB"></div>
							<b className="paddingL borderL borderB">N°:</b>
							<div className="borderR borderB"></div>
						</div>
						<div className="row6Lcol_5fr_2fr">
							<span>Numero de personal técnico:</span>
							<div className="borderB"></div>
							<b className="paddingL borderL borderB"></b>
							<div className="borderR borderB"></div>
						</div>
						<div className="row6Lcol_5fr">
							<span>Nombre del Técnico:</span>
							<div className="borderB"></div>
						</div>
						<div className="row6Lcol_5fr">
							<span></span>
							<div className="borderB"></div>
						</div>
						<div className="row6Lcol_5fr">
							<span>Fecha próximo servicio:</span>
							<div className="borderB"></div>
						</div>
						<div className="row6Lcol_7fr">
							<span>Tiempo de garantía en refacciones:</span>
							<div className="borderB"></div>
						</div>
						<div className="row6Lcol_7fr">
							<span>Hrs. efectivas en Mano de Obra:</span>
							<div className="borderB"></div>
						</div>
						<div className="row6Lcol_7fr">
							<span>Tiempo de garantía en Mano de Obra :</span>
							<div className="borderB"></div>
						</div>
						<div></div>
					</div>
					<div className="row6col row6R borderR">
						<div className="grayed borderT borderL borderB">
							Anexos (Copias)
						</div>
						<div></div>
						<div>1.-Hojas de Bitácoras del Equipo ( Hoja rosa )</div>
						<div></div>
						<div>2.-Orden de Servicio de la Compañía (En su caso)</div>
						<div></div>
						<div>3.-Carta de Garantía P/Ref. Originales (En su caso)</div>
						<div></div>
						<div>
							4.-Registros de hora Mano de Obra en Bitácora (En su caso)
						</div>
						<div></div>
						<div>5.-Informes requeridos conforme a ciontrato (En su caso)</div>
						<div></div>
					</div>
				</div>
				<div className="row7">
					<div className="grayed">Recomendaciones</div>
					<div></div>
					<div></div>
					{data.datosISSSTE && cortarTexto(data.datosISSSTE.recomendaciones)}
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div className="grayed">Observaciones y Conclusiones </div>
					<div></div>
					<div></div>
					{data.datosISSSTE && cortarTexto(data.datosISSSTE.conclusiones)}
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div className="borderBN"></div>
				</div>
			</div>
		</div>
	);
}

export default OrdenIssste;
