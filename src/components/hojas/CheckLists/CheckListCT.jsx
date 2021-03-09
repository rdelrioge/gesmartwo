import React from "react";
import moment from "moment";

import "./checklistCT.scss";

function CheckListCT(props) {
	const data = { ...props.data };

	let enrango = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	let gantrysino = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let sistemasino = [1, 2, 3, 4, 5, 6, 7, 8];
	let dassino = [1, 2, 3];
	let pdusino = [1, 2];
	let generadorsino = [1, 2, 3, 4, 5, 6];
	let mesasino = [1, 2, 3, 4, 5];
	let consolasino = [1, 2, 3, 4, 5, 6];
	return (
		<div className="chkCTC">
			<div className="rows">
				<div className="row1">
					<div className="logo" onClick={() => window.print()}></div>
					<h1 href="/">Mantenimiento a equipos de Tomografía</h1>
				</div>
				<div className="row2">
					<div className="row2-1">
						<p>Cliente:</p>
						<span className="line">{data.equipo.hospital}</span>
						<p>Fecha:</p>
						<span className="line">
							{moment(data.tiempos[data.tiempos.length - 1][3]).format(
								"DD - MMM - YYYY"
							)}
						</span>
					</div>
					<div className="row2-2">
						<p>Equipo:</p>
						<span className="line">Tomógrafo Computarizado</span>
						<span></span>
						<span></span>
						<p>Modelo:</p>
						<span className="line">{data.equipo.modelo}</span>
						<p>Case:</p>
						<span className="line">{data.case}</span>
						<p>SID:</p>
						<span className="line">{data.equipo.sid}</span>
						<p>Mantenimiento:</p>
						<span className="line">Trimestral</span>
						<p>Serie:</p>
						<span className="line">{data.equipo.serie}</span>
						<p>Ubicación:</p>
						<span className="line"></span>
					</div>
					<div className="row2-3">
						<p>Número de disparos del tubo:</p>
						<span className="line"></span>
						<p>Número total de mAs</p>
						<span className="line"></span>
						<p>Número de revoluciones:</p>
						<span className="line"></span>
						<p>Número de pacientes:</p>
						<span className="line"></span>
					</div>
				</div>

				<div className="row3">
					<div className="row3-header">
						<p className="rowTitle">
							Sistema (Especificaciones de la Norma NOM-229 SSA)
						</p>
						<b>En Rango:</b>
						<b>Valor:</b>
					</div>
					<div className="row3-cols">
						<div className="row3-c1">
							<b>Inspección y Certificación:</b>
							<span>Calibración del No. de CT</span>
							<span>Constancia del No. de CT</span>
							<span>Uniformidad del No. de CT</span>
							<span>Dependencia del No. de CT del espesor del corte</span>
							<span>Dependencia del No. de CT al tamaño del phantom</span>
							<span>
								Dependencia del No. de CT del algoritmo de reconstrucción
							</span>
							<span>Resolución de bajo contraste</span>
							<span>Resolución de alto contraste</span>
							<span>Coincidencia de la imagen impresa y la del monitor</span>
							<span>Exactitud del Indicador</span>
							<span>Reposicionamiento de la Mesa</span>
							<span>Exactitud del Indicador del desplazamiento por pasos</span>
							<span>Espesor del corte</span>
						</div>
						<div className="row3-c2">
							<b>Forma:</b>
							<span>Phantom agua/aire</span>
							<span>Phantom de agua</span>
							<span>Phantom de agua/35cm/42cm</span>
							<span>Phantom de agua</span>
							<span>Phantom de QA/Agua</span>
							<span>Phantom de agua</span>
							<span>Phantom de QA</span>
							<span>Phantom de QA</span>
							<span>Comparación visual</span>
							<span>Medir mesa con flexómetro</span>
							<span>Coincidencia del Haz con el Punto</span>
							<span className="hidden">Hidden</span>
							<span>Software</span>
						</div>
						<div className="row3-c3">
							<div className="row3-c3-sino">
								<b>Si</b>
								<b>No</b>
							</div>
							{enrango.map((e, index) => (
								<div key={index} className="row3-c3-sino">
									<span className="cuadrito"></span>
									<span className="cuadrito"></span>
								</div>
							))}
						</div>
						<div className="row3-c4">
							<b>Agua</b>
							<b>Aire</b>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
				<div className="row4">
					<div className="gantry">
						<div className="row4-header">
							<p className="rowTitle">Gantry</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Limpieza del mylar</li>
								<li>Limpieza de cubiertas del gantry</li>
								<li>Verificación de luces de alineación</li>
								<li>Verificación de anclaje / aislamiento del gantry</li>
								<li>Engrasado de baleros</li>
								<li>Verificación de tensión de bandas</li>
								<li>Inspección y limpieza de anillos (slip ring)</li>
								<li>Inspección y limpieza de escobillas</li>
								<li>Inspección del transmisor / receptor (antena) de RF</li>
								<li>Torque de componentes del gantry</li>
							</ol>
							<div className="row4-c2">
								{gantrysino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="sistema">
						<div className="row4-header">
							<p className="rowTitle">Sistema</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Verificación de paros de emergencia</li>
								<li>Verificación de luz de aviso</li>
								<li>Operación de botón de abortar estudio</li>
								<li>Verificación de etiquetas de advertencia</li>
								<li>Verificación de archivo de errores</li>
								<li>Comunicación HIS / RIS</li>
								<li>Comunicación PACS</li>
								<li>Comunicación AW</li>
							</ol>
							<div className="row4-c2">
								{sistemasino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="das">
						<div className="row4-header">
							<p className="rowTitle">Detector / DAS</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Limpieza y verificación del detector</li>
								<li>Verificación de funcionamiento de ventiladores</li>
								<li>Limpieza de filtros</li>
							</ol>
							<div className="row4-c2">
								{dassino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="pdu">
						<div className="row4-header">
							<p className="rowTitle">Unidad de distribución de poder (PDU)</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Verificación de terminales de cables</li>
								<li>Verificación de voltaje de alimentación</li>
							</ol>
							<div className="row4-c2">
								{pdusino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="generador">
						<div className="row4-header">
							<p className="rowTitle">Generador de RX</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Verificación / Limpieza de ventiladores del radiador</li>
								<li>Cambio de aceite de alta tensión en terminales de tubo</li>
								<li>
									Cambio de aceite de alta tensión en terminales del tanque
								</li>
								<li>Verificación de KV y de mA</li>
								<li>Inspección de cables de alta tensión</li>
								<li>Torque de tornillos y tuercas en sistema de RX</li>
							</ol>
							<div className="row4-c2">
								{generadorsino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="consola">
						<div className="row4-header">
							<p className="rowTitle">Consola de operador</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Verificación de ventiladores</li>
								<li>Limpieza de filtros de aire</li>
								<li>Verificación de la operación correcta del mouse</li>
								<li>Limpieza de monitores / exterior de la consola</li>
								<li>Verificación de cables / terminales de cables de poder</li>
								<li>Verificación de funciones de audio</li>
							</ol>
							<div className="row4-c2">
								{consolasino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="mesa">
						<div className="row4-header">
							<p className="rowTitle">Mesa de paciente</p>
							<div>
								<b>Si</b>
								<b>No</b>
								<b>N/A</b>
							</div>
						</div>
						<div className="row4-cols">
							<ol className="row4-c1">
								<li>Verificación / Limpieza de cubiertas</li>
								<li>Verificación / Limpieza de rieles</li>
								<li>Verificación de que no existan fugas de aceite</li>
								<li>Verificación de anclajes / Aislamiento de la mesa</li>
								<li>Verificación de la función de liberación de la mesa</li>
							</ol>
							<div className="row4-c2">
								{mesasino.map((e, index) => (
									<div key={index} className="row4-c2-sino">
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
										<span className="cuadrito"></span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="comentarios">
						<b>Comentarios:</b>
						<span className="line"></span>
						<span className="line"></span>
						<span className="line"></span>
						<span className="line"></span>
						<span className="line"></span>
					</div>
				</div>
				<div className="row5-firmas">
					<span className="line firmas"></span>
					<span className="line firmas"></span>
					<b>Nombre y firma</b>
					<b>Nombre y firma</b>
					<b>Ing. de GE</b>
					<b>Cliente</b>
				</div>
			</div>
		</div>
	);
}

export default CheckListCT;
