import React from "react";
import "./workorder.scss";

function WorkOrder() {
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
            <div>
              <span>No. De Folio</span>
              <span className="node nodefolio">AM920.34</span>
            </div>
            <div>
              <span>No. De CASE</span>
              <span className="node">04441649</span>
            </div>
            <div>
              <span>No. De WO</span>
              <span className="node">WO-02457864</span>
            </div>
          </div>
        </div>
        <div className="row2">
          <div className="datoscliente">
            <div>
              <span>Razón Social:</span>
              <span>HGSZ/MF No. 3</span>
            </div>
            <div>
              <span>Ciudad / Localidad: </span>
              <span>CHILPANCINGO</span>
            </div>
            <div>
              <span>Delegación:</span>
              <span>GUERRERO</span>
            </div>
            <div>
              <span>Dependencia:</span>
              <span>IMSS</span>
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
              <b>57618</b>
            </div>
            <div className="equipo">
              <span>Equipo:</span>
              <span>Ventilador de traslado pediátrico-adulto</span>
            </div>
            <div>
              <span>Modelo:</span>
              <span>Falcon 202 Evo</span>
            </div>
            <div>
              <span>Serie:</span>
              <span>57618</span>
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
            <div className="row3L-r">
              <b>Viaje</b>
              <span>04-feb-20</span>
              <span>10:30</span>
              <span>04-feb-20</span>
              <span>11:00</span>
            </div>
            <div className="row3L-r">
              <b>En Espera</b>
              <span>04-feb-20</span>
              <span>11:00</span>
              <span>04-feb-20</span>
              <span>11:30</span>
            </div>
            <div className="row3L-r">
              <b>Preventivo</b>
              <span>04-feb-20</span>
              <span>11:30</span>
              <span>04-feb-20</span>
              <span>15:30</span>
            </div>
            <div className="row3L-r">
              <b>Administrativo</b>
              <span>04-feb-20</span>
              <span>15:30</span>
              <span>04-feb-20</span>
              <span>16:00</span>
            </div>
            <div className="row3L-r">
              <b>Viaje</b>
              <span>04-feb-20</span>
              <span>16:00</span>
              <span>04-feb-20</span>
              <span>16:30</span>
            </div>
            <div className="row3L-r">
              <b></b>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="findeservicio">
              <b>Fin de Servicio:</b>
              <b>04 de febrero de 2020</b>
            </div>
            <b className="descCompleta">DESCRIPCIÓN COMPLETA DEL SERVICIO</b>
            <b className="descripcion">
              Se realiza mantenimiento preventivo segun especificaciones
              técnicas del fabricante asi como pruebas de funcionamiento
              satisfactorias
            </b>
          </div>
          <div className="row3R">
            <b className="rowtitle">Servicio</b>
            <div className="row3R-r">
              <span>Tipo de servicio:</span>
              <b>PM (Mantenimiento Preventivo)</b>
            </div>
            <div className="row3R-r">
              <span>Tipo de trabajo:</span>
              <b>Contrato</b>
            </div>
            <div className="row3R-r">
              <span>Contrato No.</span>
              <span>19BI0127</span>
            </div>
            <div className="row3R-r">
              <span>GON de Instalación:</span>
              <span></span>
            </div>
            <b className="rowtitle">SINTOMA</b>
            <b className="sintoma">4to MANTENIMIENTO PREVENTIVO</b>
            <b className="rowtitle">HERRAMIENTA UTILIZADA (CALIBRABLE)</b>
            <div className="row3R-rh herrtitles">
              <span>Calibración sig.</span>
              <span>Barcode</span>
              <span>Herramienta</span>
            </div>
            <div className="row3R-rh">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="row3R-rh">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="row3R-rh">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="row3R-rh">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="row4">
          <div>
            <b>
              EL EQUIPO QUEDA OPERATIVAMENTE APTO PARA REALIZAR EL TRABAJO PARA
              LO QUE FUE DISEÑADO
            </b>
            <span>SI</span>
          </div>
          <div>
            <b>FUNCIONANDO AL 100%</b>
            <span>SI</span>
          </div>
        </div>
        <div className="row5">
          <b className="obsTitle">Observaciones</b>
          <span className="observaciones"></span>
          <b className="reprogTitle">Reprogramación del servicio:</b>
          <b className="reprog">N/A</b>
          <div className="condiciones">
            <b>Condiciones en las que se deja el equipo:</b>
            <b>FUNCIONAL</b>
          </div>
        </div>
        <div className="row6">
          <b className="refsTitle">
            Kit y refacciones utilizadas en el servicio
          </b>
          <div className="row6-4c">
            <b>Cant</b>
            <b># Parte / Catálogo</b>
            <b>Descripción</b>
            <b>No. Orden / No. de GON</b>
          </div>
          <div className="row6-4c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row6-4c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row6-4c">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
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
              <span></span>
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
