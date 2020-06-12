import React from "react";

import "./evidencia.scss";

function Evidencia(props) {
  const data = { ...props.data };
  //   const data = {
  //     equipo: {
  //       hospital: "UMAE 25",
  //       ciudad: "Monterrey",
  //       delegacion: "Nuevo Leon",
  //       cliente: "IMSS",
  //       sid: "123456",
  //       equipo: "Tomografo",
  //       modelo: "Rev EVO",
  //       serie: "456789",
  //     },
  //   };

  return (
    <div className="evidencia">
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
        </div>
        <h2>EVIDENCIA FOTOGRÁFICA</h2>
        <div className="row2">
          <div className="datoscliente">
            <div>
              <span>Razón Social:</span>
              <span>{data.equipo.hospital}</span>
            </div>
            <div>
              <span>Ciudad / Localidad: </span>
              <span>{data.equipo.ciudad}</span>
            </div>
            <div>
              <span>Delegación:</span>
              <span>{data.equipo.delegacion}</span>
            </div>
            <div>
              <span>Dependencia:</span>
              <span>{data.equipo.cliente}</span>
            </div>
            <div>
              <span>Dirección:</span>
              <span></span>
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
          <div className="row3row">
            <span>Antes</span>
            <img src={data.fotoAntes1} alt="antes1" />
            <img src={data.fotoAntes2} alt="antes2" />
          </div>
          <div className="row3row">
            <span>Durante</span>
            <img src={data.fotoDurante1} alt="durante1" />
            <img src={data.fotoDurante2} alt="durante2" />
          </div>
          <div className="row3row">
            <span>Despues</span>
            <img src={data.fotoDespues1} alt="despues1" />
            <img src={data.fotoDespues2} alt="despues2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evidencia;
