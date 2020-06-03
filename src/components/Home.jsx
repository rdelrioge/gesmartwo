import React, { useState } from "react";
import { MobileStepper, Button, TextField, Input } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import "./home.scss";
import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

import { db } from "../index";

function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [hideInfo, setHideInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sso, setSSO] = useState("");
  const [sid, setSID] = useState("");
  const [equipo, setEquipo] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 5) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (equipo) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
    if (sso) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (equipo) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
    if (sso) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
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

  return (
    <div className={activeStep === 6 ? "home home2 " : "home"}>
      <div className="nav-bar">
        <div className="logo"></div>
        <a href="/">Smart WO</a>
      </div>
      {activeStep < 6 ? (
        <>
          <SwipeableViews index={activeStep}>
            <div className="views view1">
              <h3>Ingresa tu SSO</h3>
              <TextField
                id="outlined-basic"
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
                id="outlined-basic"
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
            <h1>slide n°2</h1>
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
