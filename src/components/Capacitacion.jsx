import React, { useState, useEffect } from "react";
import moment from "moment";

import "./capacitacion.scss";

function Capacitacion(props) {
  const data = { ...props.data };

  const [diahoy, setDiahoy] = useState("");
  const [meshoy, setMeshoy] = useState("");
  const [añohoy, setAñohoy] = useState("");

  console.log(data);

  useEffect(() => {
    let fechafin = data.tiempos[data.tiempos.length - 1][3];
    setDiahoy(moment(fechafin).format("DD"));
    setMeshoy(moment(fechafin).format("MM"));
    setAñohoy(moment(fechafin).format("YYYY"));
    console.log(diahoy, meshoy, añohoy);
  }, []);

  return (
    <div className="capacitacion">
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
        <h2>CONSTANCIA DE CAPACITACIÓN TÉCNICA Y OPERATIVA</h2>
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
          <div className="row3L">
            <span className="fechadecapacitacion">Fecha de Capacitación</span>
            <div className="titulosTiempos">
              <span>Día</span>
              <span>Mes</span>
              <span>Año</span>
            </div>
            <div className="row3L-r">
              <span>{diahoy}</span>
              <span>{meshoy}</span>
              <span>{añohoy}</span>
            </div>
          </div>
          <div className="row3R">
            <b className="rowtitle"></b>
            <div className="row3R-r">
              <span>Tipo de trabajo:</span>
              <b>{data.tipoDeContrato}</b>
            </div>
            <div className="row3R-r">
              <span>Contrato No:</span>
              <span>{data.equipo.contrato}</span>
            </div>
          </div>
        </div>
        <div className="row4">
          <h3 className="refsTitle">Lista de Asistencia </h3>
          <div className="refsTitle row4-6c">
            <b>Nombre completo</b>
            <b>Matrícula</b>
            <b>Área / Servicio</b>
            <b>Cargo / Puesto</b>
            <b>Turno</b>
            <b>Puesto</b>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row4-6c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="row5">
          <div className="sellos sellosTitle">
            <b>Sello de Unidad</b>
            <b>Nombre y firma del Capacitador</b>
          </div>
          <div className="sellos">
            <span></span>
            <span className="fename">{data.inge.nombre} </span>
          </div>
        </div>
        <div className="row6">
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

export default Capacitacion;
