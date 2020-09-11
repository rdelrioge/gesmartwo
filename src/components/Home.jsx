import React, { useState, useEffect } from "react";
import "./home.scss";
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
  Drawer,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import { db } from "../index";
import AddManual from "./AddManual";

moment.locale("es");
function Home() {
  // homeLayout
  const [activeStep, setActiveStep] = useState(0); //7 para ver print
  const [nextDisabled, setNextDisabled] = useState(true);
  // view1 SSO [0]
  const [sso, setSSO] = useState("");
  const [inge, setInge] = useState(null);
  // view2 SID CASE WO [1]
  const [sid, setSID] = useState("");
  const [caso, setCaso] = useState("");
  const [wo, setWO] = useState("");
  const [equipo, setEquipo] = useState(null);
  const [ubicacion, setUbicacion] = useState("");
  const [showAddManual, setShowAddManual] = useState(false);
  const [openAddManualDrawer, setOpenAddManualDrawer] = useState(false);
  // view3 Servicio [2]
  const [tipoDeServicio, setTipoDeServicio] = useState("");
  const [tipoDeContrato, setTipoDeContrato] = useState("Contrato");
  const [sintoma, setSintoma] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [apto, setApto] = useState(true);
  const [funcionando, setFuncionando] = useState(true);
  const [observaciones, setObservaciones] = useState("");
  const [condiciones, setCondiciones] = useState("Funcionando");
  // view 4 Tiempos [3]
  const [tiempos, setTiempos] = useState([]);
  const [tipoDeTrabajo, setTipoDeTrabajo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // view 5 Herramientas [4]
  const [herramientas, setHerramientas] = useState([]);
  const [calibracion, setCalibracion] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [herramienta, setHerramienta] = useState("");
  // view 6 Refacciones [5]
  const [refacciones, setRefacciones] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [parte, setParte] = useState("");
  const [descripcionParte, setDescripcionParte] = useState("");
  const [orden, setOrden] = useState("");
  //view 7 Fotos [6] IMSS
  const [fotoAntes1, setFotoAntes1] = useState(null);
  const [fotoAntes2, setFotoAntes2] = useState(null);
  const [fotoDurante1, setFotoDurante1] = useState(null);
  const [fotoDurante2, setFotoDurante2] = useState(null);
  const [fotoDespues1, setFotoDespues1] = useState(null);
  const [fotoDespues2, setFotoDespues2] = useState(null);
  // view 7 ISSSTE
  const [bitacora, setBitacora] = useState("");
  const [hrsReales, setHrsReales] = useState("");
  const [vidaUtil, setVidaUtil] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [conclusiones, setConclusiones] = useState("");
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
    if (inge) {
      setNextDisabled(true);
      setInge(null);
    }
  };
  const validateSSO = () => {
    console.log(sso);
    db.collection("users")
      .where("sso", "==", sso)
      .get()
      .then((data) => {
        if (data.empty) {
          setNextDisabled(true);
          alert("No existe el usuario");
        } else {
          data.forEach((user) => {
            let us = { ...user.data(), uid: user.id };
            console.log(us);
            setInge(us);
            setNextDisabled(false);
          });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const changeSID = (value) => {
    setSID(value);
    if (equipo) {
      setHideInfo(true);
      setNextDisabled(true);
      setEquipo(null);
      setShowAddManual(false);
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
          alert(
            "No existe el SID en la base de datos. Considera agregarlo manualmente"
          );
          setShowAddManual(true);
        } else {
          data.forEach((refa) => {
            let eq = { ...refa.data(), uid: refa.id };
            console.log(eq);
            setEquipo(eq);
            setHideInfo(false);
            // setNextDisabled(false);
          });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const closeAddManual = (eq) => {
    setEquipo(eq);
    setHideInfo(false);
    console.log(equipo);
    setOpenAddManualDrawer(false);
  };

  const changeTipoDeServicio = (tds) => {
    setTipoDeServicio(tds);
    if (tds === "PM (Mantenimiento Preventivo)") {
      setDescripcion(
        `Se realiza mantenimiento preventivo segun especificaciones técnicas del fabricante asi como pruebas de funcionamiento satisfactorias. El equipo se encuentra operando correctamente.`
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
    arrTemp.push([cantidad, parte, descripcionParte, orden]);
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

  const subirFotoAntes1 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoAntes1(photo.src);
    // URL.revokeObjectURL(photo.src);
  };
  const subirFotoAntes2 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoAntes2(photo.src);
    // URL.revokeObjectURL(photo.src);
  };
  const subirFotoDurante1 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoDurante1(photo.src);
    // URL.revokeObjectURL(photo.src);
  };
  const subirFotoDurante2 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoDurante2(photo.src);
    // URL.revokeObjectURL(photo.src);
  };
  const subirFotoDespues1 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoDespues1(photo.src);
    // URL.revokeObjectURL(photo.src);
  };
  const subirFotoDespues2 = (e) => {
    let photo = new Image();
    photo.src = URL.createObjectURL(e.target.files[0]);
    setFotoDespues2(photo.src);
    // URL.revokeObjectURL(photo.src);
  };

  useEffect(() => {
    switch (activeStep) {
      case 0:
        inge ? setNextDisabled(false) : setNextDisabled(true);
        break;
      case 1:
        if (caso !== "" && wo !== "" && equipo) {
          setNextDisabled(false);
        } else {
          setNextDisabled(true);
        }
        break;
      case 2:
        if (
          tipoDeServicio !== "" &&
          tipoDeContrato !== "" &&
          sintoma !== "" &&
          descripcion !== "" &&
          condiciones !== ""
        ) {
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
  }, [
    activeStep,
    tipoDeServicio,
    tipoDeContrato,
    sintoma,
    descripcion,
    tiempos,
    caso,
    wo,
    equipo,
  ]);

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
                color="secondary"
                variant="outlined"
                type="tel"
                inputProps={{
                  maxLength: 9,
                }}
                onChange={(ev) => changeSSO(ev.target.value)}
                value={sso}
              />
              {inge ? (
                <p className="nombreInge">{inge.nombre}</p>
              ) : (
                <Button
                  className="btnValidate"
                  size="small"
                  variant="contained"
                  disabled={sso.length === 9 ? false : true}
                  color="primary"
                  onClick={() => validateSSO()}
                >
                  Validar
                </Button>
              )}
              <b className="version">Version 1.0.1</b>
            </div>
            <div className="views view2">
              <h3>Datos iniciales</h3>
              <TextField
                label="Case"
                fullWidth
                variant="outlined"
                type="tel"
                size="small"
                inputProps={{
                  maxLength: 8,
                }}
                value={caso}
                onChange={(e) => setCaso(e.target.value)}
              />
              <TextField
                label="Work Order"
                fullWidth
                variant="outlined"
                type="tel"
                inputProps={{
                  maxLength: 11,
                }}
                size="small"
                value={wo}
                onFocus={() => {
                  wo === "" ? setWO("WO-") : console.log();
                }}
                onChange={(e) => setWO(e.target.value.toUpperCase())}
              />
              <TextField
                label="SID"
                required
                color="secondary"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 20,
                }}
                type="text"
                onChange={(ev) => changeSID(ev.target.value.toUpperCase())}
                value={sid}
              />
              {equipo ? (
                equipo.cliente === "ISSSTE" ? (
                  <TextField
                    label="Ubicación"
                    color="secondary"
                    variant="outlined"
                    size="small"
                    inputProps={{
                      maxLength: 20,
                    }}
                    type="text"
                    onChange={(ev) => setUbicacion(ev.target.value)}
                    value={ubicacion}
                  />
                ) : null
              ) : (
                <div className="searchAddBtns">
                  <Button
                    className="btnSID"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      buscarSID();
                    }}
                  >
                    Buscar equipo
                  </Button>
                  {showAddManual ? (
                    <Button
                      className="btnSID"
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setOpenAddManualDrawer(true);
                      }}
                    >
                      Agregar equipo
                    </Button>
                  ) : null}
                </div>
              )}
              <AddManual
                open={openAddManualDrawer}
                equipo={equipo}
                onClose={(eq) => closeAddManual(eq)}
              />

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
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"PM (Mantenimiento Preventivo)"}>
                      Preventivo
                    </option>
                    <option value={"CM (Mantenimiento Correctivo)"}>
                      Correctivo
                    </option>
                    <option value={"FMI"}>FMI</option>
                    <option value={"INS (Instalación)"}>Instalación</option>
                    <option value={"Otros"}>Otros</option>
                    <option value={"HBS"}>HBS</option>
                    <option value={"APlicaciones"}>Aplicaciones</option>
                    <option value={"Desinstalación"}>Desinstalación</option>
                  </Select>
                </FormControl>
              </div>
              <div className="item3">
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel htmlFor="selectTipoDeContrato">
                    Tipo de trabajo
                  </InputLabel>
                  <Select
                    native
                    value={tipoDeContrato}
                    onChange={(e) => setTipoDeContrato(e.target.value)}
                    label="Tipo de trabajo"
                    inputProps={{
                      name: "tipoDeContrato",
                      id: "selectTipoDeContrato",
                    }}
                  >
                    <option value={"Contrato"}>Contrato</option>
                    <option value={"Garantía"}>Garantia</option>
                    <option value={"Facturable"}>Facturable</option>
                    <option value={"FMI"}>FMI</option>
                    <option value={"On demand"}>On demand</option>
                  </Select>
                </FormControl>
              </div>
              <div className="item3">
                {tipoDeServicio === "PM (Mantenimiento Preventivo)" ? (
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
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"1er Mantenimiento Preventivo"}>
                        1er PM
                      </option>
                      <option value={"2do Mantenimiento Preventivo"}>
                        2do PM
                      </option>
                      <option value={"3er Mantenimiento Preventivo"}>
                        3er PM
                      </option>
                      <option value={"4to Mantenimiento Preventivo"}>
                        4to PM
                      </option>
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
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel htmlFor="selectCondiciones">
                    Condiciones en las que se deja el equipo
                  </InputLabel>
                  <Select
                    native
                    value={condiciones}
                    onChange={(e) => setCondiciones(e.target.value)}
                    label="Condiciones en las que se deja el equipo"
                    inputProps={{
                      name: "condiciones",
                      id: "selectCondiciones",
                    }}
                  >
                    <option value={"Funcionando"}>Funcionando</option>
                    <option value={"Parcialmente funcionando"}>
                      Parcialmente funcionando
                    </option>
                    <option value={"No funcional"}>No funcional</option>
                    <option value={"No localizado"}>No localizado</option>
                    <option value={"Baja"}>Baja</option>
                    <option value={"Reprogramado"}>Reprogramado</option>
                  </Select>
                </FormControl>
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
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"Viaje"}>Viaje</option>
                      <option value={"En espera"}>En Espera</option>
                      <option value={"Administración"}>Administración</option>
                      {tipoDeServicio === "PM (Mantenimiento Preventivo)" ? (
                        <option value={"Preventivo"}>Preventivo</option>
                      ) : (
                        <>
                          <option value={"Reparacion"}>Reparacion</option>
                          <option value={"Instalación"}>Instalación</option>
                          <option value={"Solución de problemas"}>
                            Solución de problemas
                          </option>
                          <option value={"Instalación - Opciones"}>
                            Instalación - Opciones
                          </option>
                          <option value={"Conectividad"}>Conectividad</option>
                          <option value={"Monitoreo del sistema"}>
                            Monitoreo del sistema
                          </option>
                          <option
                            value={
                              "Entrega de materiales, embalaje, desembalaje."
                            }
                          >
                            Entrega de materiales, embalaje, desembalaje.
                          </option>
                          <option value={"Potencia y puesta a tierra "}>
                            Potencia y puesta a tierra
                          </option>
                          <option
                            value={
                              "Rcarga de helio / mantenimiento de Cryogenos"
                            }
                          >
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
                        </>
                      )}
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
                        minutesStep={15}
                        format="HH:mm"
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
                        format="HH:mm"
                        ampm={false}
                        showTodayButton
                        minutesStep={15}
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
                    onClick={() => addTime()}
                  >
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
                          <li>{moment(time[2]).format("HH:mm")}</li>
                          <li>{moment(time[3]).format("DD/MM/YY")}</li>
                          <li>{moment(time[4]).format("HH:mm")}</li>
                          <li>
                            <b
                              className="btnDeleteTime"
                              onClick={() => deleteTime(index)}
                            >
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
                    onClick={() => addHerramienta()}
                  >
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
                              onClick={() => deleteHerramienta(index)}
                            >
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
                  label="Cantidad"
                  fullWidth
                  type="number"
                  variant="outlined"
                  size="small"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
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
                    onClick={() => addRefaccion()}
                  >
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="refAgregadas">
                {refacciones.length > 0 ? (
                  <>
                    <ul className="ulref">
                      <li>Cant.</li>
                      <li># Parte / Catálogo</li>
                      <li>Descripción</li>
                      <li>No. de Orden / No. de GON</li>
                      <li>Borrar</li>
                    </ul>

                    {refacciones.map((refa, index) => {
                      return (
                        <ul className="ulref" key={index}>
                          <li>{refa[0]}</li>
                          <li>{refa[1]}</li>
                          <li>{refa[2]}</li>
                          <li>{refa[3]}</li>
                          <li>
                            <b
                              className="btnDeleteTime"
                              onClick={() => deleteRefaccion(index)}
                            >
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
            {equipo && equipo.cliente === "IMSS" ? (
              <div className="views IMSS">
                <h3>Evidencia IMSS</h3>
                <div className="row antes">
                  {fotoAntes1 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoAntes1(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoAntes1}
                        alt="antes1"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="antes1"
                        onChange={(e) => subirFotoAntes1(e)}
                        type="file"
                      />
                      <label htmlFor="antes1">
                        Antes
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  {fotoAntes2 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoAntes2(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoAntes2}
                        alt="antes2"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="antes2"
                        onChange={(e) => subirFotoAntes2(e)}
                        type="file"
                      />
                      <label htmlFor="antes2">
                        Antes
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                </div>
                <div className="row durante">
                  {fotoDurante1 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDurante1(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDurante1}
                        alt="durante1"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="durante1"
                        onChange={(e) => subirFotoDurante1(e)}
                        type="file"
                      />
                      <label htmlFor="durante1">
                        Durante
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  {fotoDurante2 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDurante2(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDurante2}
                        alt="durante2"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="durante2"
                        onChange={(e) => subirFotoDurante2(e)}
                        type="file"
                      />
                      <label htmlFor="durante2">
                        Durante
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                </div>
                <div className="row despues">
                  {fotoDespues1 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDespues1(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDespues1}
                        alt="despues1"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="despues1"
                        onChange={(e) => subirFotoDespues1(e)}
                        type="file"
                      />
                      <label htmlFor="despues1">
                        Despues
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  {fotoDespues2 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDespues2(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDespues2}
                        alt="despues2"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="despues2"
                        onChange={(e) => subirFotoDespues2(e)}
                        type="file"
                      />
                      <label htmlFor="despues2">
                        Despues
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ) : equipo && equipo.cliente === "ISSSTE" ? (
              <div className="views ISSSTE">
                <h3>Datos ISSSTE</h3>
                <div className="tresFr">
                  <TextField
                    label="N° Bitacora"
                    fullWidth
                    variant="outlined"
                    type="tel"
                    inputProps={{
                      maxLength: 8,
                    }}
                    size="small"
                    value={bitacora}
                    onChange={(e) => setBitacora(e.target.value)}
                  />
                  <TextField
                    label="Hrs reales"
                    fullWidth
                    variant="outlined"
                    type="tel"
                    inputProps={{
                      maxLength: 2,
                    }}
                    size="small"
                    value={hrsReales}
                    onChange={(e) => setHrsReales(e.target.value)}
                  />
                  <TextField
                    label="Vida útil"
                    fullWidth
                    variant="outlined"
                    type="tel"
                    inputProps={{
                      maxLength: 2,
                    }}
                    size="small"
                    value={vidaUtil}
                    onChange={(e) => setVidaUtil(e.target.value)}
                  />
                </div>
                <TextField
                  label="Recomendaciones"
                  fullWidth
                  multiline
                  rows={2}
                  value={recomendaciones}
                  variant="outlined"
                  onChange={(e) => setRecomendaciones(e.target.value)}
                />
                <TextField
                  label="Conclusiones"
                  fullWidth
                  multiline
                  rows={2}
                  value={conclusiones}
                  variant="outlined"
                  onChange={(e) => setConclusiones(e.target.value)}
                />
                <div className="row">
                  {fotoAntes1 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoAntes1(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoAntes1}
                        alt="antes1"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="antes1"
                        onChange={(e) => subirFotoAntes1(e)}
                        type="file"
                      />
                      <label htmlFor="antes1">
                        Foto Normal
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  {fotoAntes2 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoAntes2(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoAntes2}
                        alt="antes2"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="antes2"
                        onChange={(e) => subirFotoAntes2(e)}
                        type="file"
                      />
                      <label htmlFor="antes2">
                        Placa N° de Serie
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                </div>
                <div className="row">
                  {fotoDurante1 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDurante1(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDurante1}
                        alt="durante1"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="durante1"
                        onChange={(e) => subirFotoDurante1(e)}
                        type="file"
                      />
                      <label htmlFor="durante1">
                        Placa N° de Inventario
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  {fotoDurante2 ? (
                    <div className="cell">
                      <b
                        className="btnDelete"
                        onClick={() => setFotoDurante2(null)}
                      >
                        X
                      </b>
                      <img
                        width="150"
                        height="100"
                        src={fotoDurante2}
                        alt="durante2"
                      />
                    </div>
                  ) : (
                    <div className="cell">
                      <input
                        accept="image/*"
                        className="inputPhoto"
                        id="durante2"
                        onChange={(e) => subirFotoDurante2(e)}
                        type="file"
                      />
                      <label htmlFor="durante2">
                        Foto panorámica del bien
                        <IconButton color="primary" component="span">
                          <span className="material-icons">add_a_photo</span>
                        </IconButton>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ) : equipo && equipo.cliente === "ISAPEG" ? (
              <div className="views ISAPEG">
                <h3>Datos ISAPEG</h3>
              </div>
            ) : (
              <div>
                <h3>Siguiente</h3>
              </div>
            )}
          </SwipeableViews>
          {inge ? (
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
                  disabled={nextDisabled}
                >
                  {activeStep === 6 ? "Finish" : "Next >"}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {"<"} Back
                </Button>
              }
            />
          ) : null}
        </>
      ) : (
        <div className="revisar">
          <div className="revHeader">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setActiveStep(6)}
            >
              {"<"}
            </Button>
            <b>Revisa la WO </b>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.print()}
            >
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
                caso,
                wo,
                equipo,
                ubicacion,
                tipoDeServicio,
                tipoDeContrato,
                sintoma,
                descripcion,
                apto,
                funcionando,
                observaciones,
                condiciones,
                tiempos,
                herramientas,
                refacciones,
                bitacora,
                hrsReales,
                vidaUtil,
                recomendaciones,
                conclusiones,
                fotoAntes1,
                fotoAntes2,
                fotoDurante1,
                fotoDurante2,
                fotoDespues1,
                fotoDespues2,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
