import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

import {
  MobileStepper,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  IconButton,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "./home.scss";
import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import { db } from "../index";

moment.locale("es");
function Home() {
  // homeLayout
  const [activeStep, setActiveStep] = useState(5);
  const [nextDisabled, setNextDisabled] = useState(true);
  // view1
  const [sso, setSSO] = useState("");
  const [inge, setInge] = useState("Ricardo Del Rio");
  // view2
  const [sid, setSID] = useState("");
  const [equipo, setEquipo] = useState(null);
  // view3
  const [tipoDeServicio, setTipoDeServicio] = useState("");
  const [sintoma, setSintoma] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [apto, setApto] = useState(true);
  const [funcionando, setFuncionando] = useState(true);
  const [observaciones, setObservaciones] = useState("");
  const [condiciones, setCondiciones] = useState(true);
  // view 4
  const [tiempos, setTiempos] = useState([]);
  const [tipoDeTrabajo, setTipoDeTrabajo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // view 5
  const [herramientas, setHerramientas] = useState([]);
  const [calibracion, setCalibracion] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [herramienta, setHerramienta] = useState("");
  // view 6
  const [refacciones, setRefacciones] = useState([]);
  const [parte, setParte] = useState("");
  const [descripcionParte, setDescripcionParte] = useState("");
  const [orden, setOrden] = useState("");
  //view 7
  const [foto, setFoto] = useState(null);

  // print
  const [hideInfo, setHideInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 6) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const changeSSO = (value) => {
    setSSO(value);
    if (value.length === 9) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };
  const validateSSO = () => {
    console.log(sso);
  };

  const changeSID = (value) => {
    setSID(value);
    if (equipo) {
      setHideInfo(true);
      setNextDisabled(true);
      setEquipo(null);
    }
  };
  const buscarSID = () => {
    db.collection("equipos")
      .where("sid", "==", sid)
      .get()
      .then((data) => {
        if (data.empty) {
          setEquipo(null);
          setHideInfo(true);
          setNextDisabled(true);
          alert("No existe el SID en la base de datos");
        } else {
          data.forEach((refa) => {
            let eq = { ...refa.data(), uid: refa.id };
            console.log(eq);
            setEquipo(eq);
            setHideInfo(false);
            setNextDisabled(false);
          });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const changeTipoDeServicio = (tds) => {
    setTipoDeServicio(tds);
    if (tds === "PM") {
      setDescripcion(
        `Se realiza mantenimiento preventivo segun especificaciones técnicas 
        del fabricante asi como pruebas de funcionamiento satisfactorias. El 
        equipo se encuentra operando correctamente.`
      );
    } else {
      setDescripcion("");
    }
  };

  const addTime = () => {
    let arrTemp = [...tiempos];
    arrTemp.push([tipoDeTrabajo, startDate, startTime, endDate, endTime]);
    setTiempos(arrTemp);
    setTipoDeTrabajo("");
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
  };

  const deleteTime = (i) => {
    let arrTemp = [...tiempos];
    arrTemp.splice(i, 1);
    setTiempos(arrTemp);
  };

  const addHerramienta = () => {
    let arrTemp = [...herramientas];
    arrTemp.push([calibracion, barcode, herramienta]);
    setHerramientas(arrTemp);
    setCalibracion(null);
    setBarcode("");
    setHerramienta("");
  };

  const deleteHerramienta = (i) => {
    let arrTemp = [...herramientas];
    arrTemp.splice(i, 1);
    setHerramientas(arrTemp);
  };

  const addRefaccion = () => {
    let arrTemp = [...refacciones];
    arrTemp.push([parte, descripcionParte, orden]);
    setRefacciones(arrTemp);
    setParte("");
    setDescripcionParte("");
    setOrden("");
  };

  const deleteRefaccion = (i) => {
    let arrTemp = [...refacciones];
    arrTemp.splice(i, 1);
    setRefacciones(arrTemp);
  };

  const subirfoto = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFoto(photo.src);
  };
  useEffect(() => {
    console.log(activeStep);
    console.log(tiempos);
    switch (activeStep) {
      case 0:
        sso ? setNextDisabled(false) : setNextDisabled(true);
        break;
      case 1:
        equipo ? setNextDisabled(false) : setNextDisabled(true);
        break;
      case 2:
        if (tipoDeServicio !== "" && sintoma !== "" && descripcion !== "") {
          setNextDisabled(false);
        } else {
          setNextDisabled(true);
        }
        break;
      case 3:
        tiempos.length > 0 ? setNextDisabled(false) : setNextDisabled(true);
        break;
      case 4:
        setNextDisabled(false);
        break;
      case 5:
        setNextDisabled(false);
        break;
      default:
        break;
    }
  }, [activeStep, tipoDeServicio, sintoma, descripcion, tiempos]);

  return (
    <div className={activeStep === 7 ? "home scrollHome " : "home"}>
      <div className="nav-bar">
        <div className="logo"></div>
        <a href="/">Smart WO</a>
      </div>
      {activeStep < 7 ? (
        <>
          <SwipeableViews disabled index={activeStep}>
            <div className="views view1">
              <h3>Ingresa tu SSO</h3>
              <TextField
                label="SSO"
                required
                color="secondary"
                variant="outlined"
                inputProps={{
                  maxLength: 9,
                }}
                type="text"
                onChange={(ev) =>
                  changeSSO(ev.target.value.replace(/[^0-9]/g, ""))
                }
                value={sso}
              />
              <Button onClick={() => validateSSO()}>Vallidate</Button>
            </div>
            <div className="views view2">
              <h3>Ingresa el SID</h3>
              <TextField
                label="SID"
                required
                color="secondary"
                variant="outlined"
                inputProps={{
                  maxLength: 20,
                }}
                type="text"
                onChange={(ev) => changeSID(ev.target.value)}
                value={sid}
              />
              <Button
                className="btnSID"
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  buscarSID();
                }}>
                Buscar equipo
              </Button>
              <div className={hideInfo ? "info hideinfo" : "info"}>
                {equipo ? (
                  <>
                    <p>
                      <b>Cliente: </b>
                      {equipo.cliente}
                    </p>
                    <p>
                      <b>Hospital: </b>
                      {equipo.hospital}
                    </p>
                    <p>
                      <b>Delegación: </b>
                      {equipo.delegacion}
                    </p>
                    <p>
                      <b>Ciudad: </b>
                      {equipo.ciudad}
                    </p>
                    <p>
                      <b>Estado: </b>
                      {equipo.estado}
                    </p>
                    <p>
                      <b>Equipo: </b>
                      {equipo.equipo}
                    </p>
                    <p>
                      <b>Modelo: </b>
                      {equipo.modelo}
                    </p>
                    <p>
                      <b>Serie: </b>
                      {equipo.serie}
                    </p>
                    <p>
                      <b>Contrato: </b>
                      {equipo.contrato}
                    </p>
                  </>
                ) : (
                  <div className="nada"></div>
                )}
              </div>
            </div>
            <div className="views view3">
              <h3>Datos del Servicio</h3>
              <div className="item3">
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel htmlFor="selectTipoDeServ">
                    Tipo de servicio
                  </InputLabel>
                  <Select
                    native
                    value={tipoDeServicio}
                    onChange={(e) => changeTipoDeServicio(e.target.value)}
                    label="Tipo de servicio"
                    inputProps={{
                      name: "tipoDeServicio",
                      id: "selectTipoDeServ",
                    }}>
                    <option aria-label="None" value="" />
                    <option value={"PM"}>Preventivo</option>
                    <option value={"CM"}>Correctivo</option>
                    <option value={"FMI"}>FMI</option>
                    <option value={"INS"}>Instalación</option>
                    <option value={"SS"}>Otros</option>
                    <option value={"HBS"}>HBS</option>
                    <option value={"AP"}>Aplicaciones</option>
                    <option value={"DES"}>Desinstalación</option>
                  </Select>
                </FormControl>
              </div>
              <div className="item3">
                {tipoDeServicio === "PM" ? (
                  <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel htmlFor="numeroPM">Síntoma</InputLabel>
                    <Select
                      native
                      value={sintoma}
                      onChange={(e) => setSintoma(e.target.value)}
                      label="Sintoma"
                      inputProps={{
                        name: "sintoma",
                        id: "sintoma",
                      }}>
                      <option aria-label="None" value="" />
                      <option value={"PM1"}>1er PM</option>
                      <option value={"PM2"}>2o PM</option>
                      <option value={"PM3"}>3er PM</option>
                      <option value={"PM4"}>4to PM</option>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label="Síntoma"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={(e) => setSintoma(e.target.value)}
                  />
                )}
              </div>
              <div className="item3">
                <TextField
                  label="Descripción del servicio"
                  fullWidth
                  multiline
                  rows={4}
                  value={descripcion}
                  variant="outlined"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="item3 preguntas">
                <b>
                  ¿El equipo queda operativamente apto para realizar el trabajo
                  para lo que fue diseñado?
                </b>
                <input
                  type="checkbox"
                  checked={apto}
                  onChange={(e) => setApto(e.target.checked)}
                />
                <b>¿Funcionando al 100%?</b>
                <input
                  type="checkbox"
                  checked={funcionando}
                  onChange={(e) => setFuncionando(e.target.checked)}
                />
              </div>
              <div className="item3">
                <TextField
                  label="Observaciones"
                  fullWidth
                  multiline
                  value={observaciones}
                  rows={2}
                  variant="outlined"
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>
              <div className="item3">
                <input
                  type="radio"
                  id="funcional"
                  checked={condiciones}
                  name="condiciones"
                  onChange={() => setCondiciones(true)}
                />
                <label htmlFor="funcional">Funcionando</label>
                <input
                  type="radio"
                  id="nofuncional"
                  checked={!condiciones}
                  name="condiciones"
                  onChange={() => setCondiciones(false)}
                />
                <label htmlFor="nofuncional">No Funcionando</label>
              </div>
            </div>
            <div className="views view4">
              <h3>Periodo de servicio</h3>
              <div className="agregartiempo">
                <div className="tipodetrabajo">
                  <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel htmlFor="selectTipoDeTrabajo">
                      Tipo de trabajo
                    </InputLabel>
                    <Select
                      native
                      value={tipoDeTrabajo}
                      onChange={(e) => setTipoDeTrabajo(e.target.value)}
                      label="Tipo de trabajo"
                      inputProps={{
                        name: "tipoDeTrabajo",
                        id: "selectTipoDeTrabajo",
                      }}>
                      <option aria-label="None" value="" />
                      <option value={"Viaje"}>Viaje</option>
                      <option value={"En espera"}>En Espera</option>
                      <option value={"Mantenimiento planificado"}>
                        Mantenimiento planificado
                      </option>
                      <option value={"Reparacion"}>Reparacion</option>
                      <option value={"Instalación"}>Instalación</option>
                      <option value={"Administración"}>Administración</option>
                      <option value={"Solución de problemas"}>
                        Solución de problemas
                      </option>
                      <option value={"Instalación - Opciones"}>
                        Instalación - Opciones
                      </option>
                      <option value={"Configuración de conectividad"}>
                        Configuración de conectividad
                      </option>
                      <option value={"Monitoreo del sistema"}>
                        Monitoreo del sistema
                      </option>
                      <option
                        value={"Entrega de materiales, embalaje, desembalaje."}>
                        Entrega de materiales, embalaje, desembalaje.
                      </option>
                      <option value={"Potencia y puesta a tierra "}>
                        Potencia y puesta a tierra{" "}
                      </option>
                      <option
                        value={"Rcarga de helio / mantenimiento de Cryogenos"}>
                        Rcarga de helio / mantenimiento de Cryogenos
                      </option>
                      <option value={"OJT en entrenamiento de trabajo"}>
                        OJT en entrenamiento de trabajo
                      </option>
                      <option value={"Soporte telefónico"}>
                        Soporte telefónico
                      </option>
                      <option value={"Auditoria del sitio"}>
                        Auditoria del sitio
                      </option>
                      <option value={"Inspección del lugar"}>
                        Inspección del lugar
                      </option>
                      <option value={"Preparación del sitio"}>
                        Preparación del sitio
                      </option>
                      <option value={"Solicitud de cliente"}>
                        Solicitud de cliente
                      </option>
                      <option value={"Reunión de clientes"}>
                        Reunión de clientes
                      </option>
                      <option value={"Tarea de servicio"}>
                        Tarea de servicio
                      </option>
                      <option value={"Objetos perdidos"}>
                        Objetos perdidos
                      </option>
                      <option value={"Soporte de ventas"}>
                        Soporte de ventas
                      </option>
                      <option value={"Chatarra"}>Chatarra</option>
                    </Select>
                  </FormControl>
                </div>
                <div className="timers">
                  <div className="inicio">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        margin="dense"
                        disableFuture
                        inputVariant="outlined"
                        autoOk
                        disableToolbar
                        showTodayButton
                        todayLabel="hoy"
                        clearable
                        clearLabel="borrar"
                        okLabel=""
                        cancelLabel=""
                        format="DD/MM/YY"
                        id="startDate"
                        label="fecha inicio"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e);
                        }}
                      />
                      <TimePicker
                        margin="dense"
                        inputVariant="outlined"
                        autoOk
                        disableToolbar
                        ampm={false}
                        showTodayButton
                        todayLabel="hoy"
                        clearable
                        clearLabel="borrar"
                        okLabel=""
                        cancelLabel=""
                        id="startTime"
                        label="hora inicio"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="final">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        margin="dense"
                        disableFuture
                        inputVariant="outlined"
                        autoOk
                        disableToolbar
                        showTodayButton
                        todayLabel="hoy"
                        clearable
                        clearLabel="borrar"
                        okLabel=""
                        cancelLabel=""
                        format="DD/MM/YY"
                        id="endDate"
                        label="fecha final"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e);
                        }}
                      />
                      <TimePicker
                        margin="dense"
                        inputVariant="outlined"
                        autoOk
                        disableToolbar
                        ampm={false}
                        showTodayButton
                        todayLabel="hoy"
                        clearable
                        clearLabel="borrar"
                        okLabel=""
                        cancelLabel=""
                        id="endTime"
                        label="hora final"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className="btnAddTiempo">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addTime()}>
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="tiemposagregados">
                {tiempos.length > 0 ? (
                  <>
                    <ul className="ultime">
                      <li>Tipo de trabajo</li>
                      <li>Fecha de inicio</li>
                      <li>Hora inicial</li>
                      <li>Fecha final</li>
                      <li>Hora final</li>
                      <li>Borrar</li>
                    </ul>

                    {tiempos.map((time, index) => {
                      return (
                        <ul className="ultime" key={index}>
                          <li>{time[0]}</li>
                          <li>{moment(time[1]).format("DD/MM/YY")}</li>
                          <li>{moment(time[2]).format("HH:MM")}</li>
                          <li>{moment(time[3]).format("DD/MM/YY")}</li>
                          <li>{moment(time[4]).format("HH:MM")}</li>
                          <li>
                            <b
                              className="btnDeleteTime"
                              onClick={() => deleteTime(index)}>
                              X
                            </b>
                          </li>
                        </ul>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
            <div className="views view5">
              <h3>Herramientas</h3>
              <div className="herrXagregar">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    margin="dense"
                    inputVariant="outlined"
                    autoOk
                    disableToolbar
                    showTodayButton
                    todayLabel="hoy"
                    clearable
                    clearLabel="borrar"
                    okLabel=""
                    cancelLabel=""
                    format="DD/MM/YY"
                    id="calibracion"
                    label="Sig. Calibracion"
                    value={calibracion}
                    onChange={(e) => {
                      setCalibracion(e);
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  label="Barcode"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
                <TextField
                  label="Herramienta"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={herramienta}
                  onChange={(e) => setHerramienta(e.target.value)}
                />

                <div className="btnAddHerr">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addHerramienta()}>
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="herrAgregadas">
                {herramientas.length > 0 ? (
                  <>
                    <ul className="ulherr">
                      <li>Sig. Calibración</li>
                      <li>Barcode</li>
                      <li>Herramienta</li>
                      <li>Borrar</li>
                    </ul>

                    {herramientas.map((herr, index) => {
                      return (
                        <ul className="ulherr" key={index}>
                          <li>{moment(herr[0]).format("DD/MM/YY")}</li>
                          <li>{herr[1]}</li>
                          <li>{herr[2]}</li>
                          <li>
                            <b
                              className="btnDeleteTime"
                              onClick={() => deleteHerramienta(index)}>
                              X
                            </b>
                          </li>
                        </ul>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
            <div className="views view6">
              <h3>Refacciones</h3>
              <div className="refXAgregar">
                <TextField
                  label="# Parte / Catálogo"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={parte}
                  onChange={(e) => setParte(e.target.value)}
                />
                <TextField
                  label="Descripción"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={descripcionParte}
                  onChange={(e) => setDescripcionParte(e.target.value)}
                />
                <TextField
                  label="No. de Orden / No. de GON"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                />

                <div className="btnAddRef">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addRefaccion()}>
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="refAgregadas">
                {refacciones.length > 0 ? (
                  <>
                    <ul className="ulref">
                      <li># Parte / Catálogo</li>
                      <li>Descripción</li>
                      <li>No. de Orden / No. de GON</li>
                      <li>Borrar</li>
                    </ul>

                    {refacciones.map((herr, index) => {
                      return (
                        <ul className="ulref" key={index}>
                          <li>{herr[0]}</li>
                          <li>{herr[1]}</li>
                          <li>{herr[2]}</li>
                          <li>
                            <b
                              className="btnDeleteTime"
                              onClick={() => deleteRefaccion(index)}>
                              X
                            </b>
                          </li>
                        </ul>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
            <div className="views view7">
              <h3>Fotos</h3>
              <div className="btnAddRef">
                <input
                  accept="image/*"
                  className="inputPhoto"
                  id="icon-button-photo"
                  onChange={(e) => subirfoto(e)}
                  type="file"
                />
                <label htmlFor="icon-button-photo">
                  <IconButton color="primary" component="span">
                    <span className="material-icons">add_a_photo</span>
                  </IconButton>
                </label>
                {foto ? (
                  <img width="200" height="100" src={foto} alt="mifoto" />
                ) : null}
              </div>
            </div>
          </SwipeableViews>
          <MobileStepper
            steps={7}
            position="bottom"
            variant="progress"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={nextDisabled}>
                {activeStep === 6 ? "Finish" : "Next >"}
              </Button>
            }
            backButton={
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleBack}
                disabled={activeStep === 0}>
                {"<"} Back
              </Button>
            }
          />
        </>
      ) : (
        <div className="revisar">
          <div className="revHeader">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setActiveStep(6)}>
              {"<"}
            </Button>
            <b>Revisa la WO </b>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.print()}>
              Print
            </Button>
          </div>
          {loading ? (
            <>
              <SkeletorWO />
            </>
          ) : (
            <Print
              data={{
                sso,
                inge,
                sid,
                equipo,
                tipoDeServicio,
                sintoma,
                descripcion,
                apto,
                funcionando,
                observaciones,
                condiciones,
                tiempos,
                herramientas,
                refacciones,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
