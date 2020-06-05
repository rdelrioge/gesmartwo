import React, { useState, useEffect } from "react";
import {
  MobileStepper,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  TextareaAutosize,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import "./home.scss";
import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import { db } from "../index";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [hideInfo, setHideInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sso, setSSO] = useState("");
  const [sid, setSID] = useState("");
  const [equipo, setEquipo] = useState(null);
  const [tipoDeServicio, setTipoDeServicio] = useState("");
  const [sintoma, setSintoma] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [apto, setApto] = useState(true);
  const [funcionando, setFuncionando] = useState(true);
  const [observaciones, setObservaciones] = useState("");
  const [condiciones, setCondiciones] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 5) {
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
    let num = value.replace(/[^0-9]/g, "");
    setSSO(num);
    if (num.length === 9) {
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
    // Si existe en la base de datos -> despliega los datos y habilita el boton de NEXT
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
        "Se realiza mantenimiento preventivo segun especificaciones técnicas del fabricante asi como pruebas de funcionamiento satisfactorias. El equipo se encuentra operando correctamente."
      );
    } else {
      setDescripcion("");
    }
  };

  useEffect(() => {
    console.log(activeStep);
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

      default:
        break;
    }
  }, [activeStep, tipoDeServicio, sintoma, descripcion]);

  return (
    <div className={activeStep === 6 ? "home home2 " : "home"}>
      <div className="nav-bar">
        <div className="logo"></div>
        <a href="/">Smart WO</a>
      </div>
      {activeStep < 6 ? (
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
                onChange={(ev) => changeSSO(ev.target.value)}
                value={sso}
              />
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
                }}
              >
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
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"PM"}>Preventivo</option>
                    <option value={"CM"}>Correctivo</option>
                    <option value={"FMI"}>FMI</option>
                    <option value={"IN"}>Instalación</option>
                    <option value={"SS"}>Special Service</option>
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
                      }}
                    >
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
            <h1>slide n°3</h1>
            <h1>slide n°4</h1>
            <h1>slide n°5</h1>
            <h1>slide n°6</h1>
          </SwipeableViews>
          <MobileStepper
            steps={6}
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
                {activeStep === 5 ? "Finish" : "Next >"}
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
        </>
      ) : (
        <div className="revisar">
          <div className="revHeader">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setActiveStep(5)}
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
            <Print />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
