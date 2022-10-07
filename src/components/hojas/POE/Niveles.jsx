import React from "react";

import "./Niveles.scss";

function Niveles() {
	return (
		<div className="nivelesC">
			<div className="mainGrid">
				<div className="row1">
					<div className="row1L"></div>
					<div className="row1R">
						<div className="row1RSup">
							<p>G.E. SISTEMAS MÉDICOS DE MÉXICO, S.A. DE C.V.</p>
							<p className="title">
								AUTORIZACIÓN DE INSTALACIÓN Y MANTENIMIENTO DE CICLOTRONES,
								MÓDULO DE SÍNTESIS Y EQUIPOS P.E.T.
							</p>
						</div>
						<div className="row1RInf">
							<div className="row1RInfCell">CLAVE:</div>
							<div className="row1RInfCell">NOMBRE:</div>
							<div className="row1RInfCell">FECHA:</div>
							<div className="row1RInfCell">PAGINA:</div>
							<div className="row1RInfCell">PA-03</div>
							<div className="row1RInfCell">Bitácoras y Registros</div>
							<div className="row1RInfCell r12cells ">
								<p>Julio 2017</p>
								<p>Versión: 3</p>
							</div>
							<div className="row1RInfCell">13 de 17</div>
						</div>
					</div>
				</div>
				<div className="row2">
					<div className="row2L">
						<div className="row2LSup">
							<div className="row2LSupL"></div>
							<p className="row2LSupR">
								G.E. SISTEMAS MÉDICOS DE MÉXICO, S.A. DE C.V. AUTORIZACIÓN DE
								INSTALACIÓN Y MANTENIMIENTO DE CICLOTRONES, MÓDULO DE SÍNTESIS Y
								EQUIPOS P.E.T.
							</p>
						</div>
						<div className="row2LInf">
							<b>DIRECCIÓN:</b>
							<span></span>
						</div>
					</div>
					<div className="row2R">
						<p>NIVELES DE RADIACIÓN Y CONTAMINACIÓN</p>
						<div className="row2RInf">
							<b>FECHA:</b>
							<span></span>
						</div>
						<div className="row2RInf">
							<b>TEL:</b>
							<span></span>
						</div>
					</div>
				</div>
				<div className="row3"></div>
				<div className="row4"></div>
				<div className="row5"></div>
				<div className="row6"></div>
				<div className="row7"></div>
			</div>
		</div>
	);
}

export default Niveles;
