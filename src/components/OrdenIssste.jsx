import React from "react";
import "./ordenissste.scss";

function OrdenIssste() {
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
              <b>No. </b> <b>109 </b>
            </div>
            <b></b>
            <div className="hojade">
              <b>Hoja No.</b> <span></span> <b>de:</b> <span></span>
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
              <span></span>
            </div>
            <div className="grayed borderR">Datos Técnicos</div>
            <div>
              <b className="paddingL">Equipo:</b>
              <span>Rayos X Portatil</span>
            </div>
            <div>
              <b className="paddingL">Marca:</b>
              <span>General Electric</span>
            </div>
            <div>
              <b className="paddingL">Modelo:</b>
              <span>AMX 4</span>
            </div>
            <div>
              <b className="paddingL">Serie:</b>
              <span>46261AMX4</span>
            </div>
            <div>
              <b className="paddingL">Inventario:</b>
              <span>615827</span>
            </div>
            <div>
              <b className="paddingL">Ubicación:</b>
              <span></span>
            </div>
            <div className="borderBN"></div>
          </div>
          <div className="row2row row2R">
            <div className="grayed borderL"></div>
            <div>
              <b>Unidad Médica:</b>
              <span className="alignEnd">C.H. Irapuato</span>
            </div>
            <div>
              <b>Domicilio:</b>
              <span className="smallText">
                Av. de la Rivera No. 275 Las Trojes C.P. 36640
              </span>
            </div>
            <div>
              <b>Entidad:</b>
              <span>Irapuato, Guanajuato</span>
            </div>
            <div className="contrato">
              <b>Contrato:</b>
              <span>DNAF/CM/033/2020</span>
              <b>Bitácora:</b>
              <span></span>
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
                <span>07</span>
                <span className="borderL borderR">MAR</span>
                <span>20</span>
              </div>
              <div className="dma borderL">
                <span>07</span>
                <span className="borderR borderL">MAR</span>
                <span>20</span>
              </div>
              <div className="dma borderL ">
                <span>07</span>
                <span className="borderR borderL">03</span>
                <span>20</span>
              </div>
            </div>
            <div className="fechas">
              <b className="paddingL">Término</b>
              <div className="dma borderL">
                <span>07</span>
                <span className="borderL borderR">MAR</span>
                <span>20</span>
              </div>
              <div className="dma borderL">
                <span>07</span>
                <span className="borderR borderL">MAR</span>
                <span>20</span>
              </div>
              <div className="dma borderL ">
                <span>07</span>
                <span className="borderR borderL">03</span>
                <span>20</span>
              </div>
            </div>
            <div className="atraso">
              <b className="paddingL borderL">Días de atraso</b>
              <span className="borderL"></span>
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
              <b className="borderL borderR">X</b>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <b>MANTENIMIENTO CORRECTIVO</b>
            <div className="col5fr">
              <b className="borderL borderR">X</b>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
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
          <div className="grayed">
            Condiciones en las que se deja el Equipo:
          </div>
          <div className="row3row condiciones">
            <b>Funcionando</b>
            <div className="col5fr">
              <b className="borderL borderR">X</b>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <b>Funcionando Parcialmente</b>
            <div className="col5fr">
              <b className="borderL borderR">X</b>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <b>Fuera de Servicio</b>
            <div className="col5fr">
              <b className="borderL borderR">X</b>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <b className="paddingL">Observaciones:</b>
            <span className="paddingL">Aqui van las Observaciones</span>
          </div>
          <div></div>
          <div></div>
          <div className="borderBN"></div>
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
              <span className="centerText">4</span>
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
            <div></div>
            <p className="borderB"></p>
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
      </div>
    </div>
  );
}

export default OrdenIssste;
