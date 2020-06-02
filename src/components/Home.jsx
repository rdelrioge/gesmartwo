import React, { useState } from "react";
import { MobileStepper, Button } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import "./home.scss";
import Print from "./Print";
import SkeletorWO from "./SkeletorWO";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={activeStep === 6 ? "home home2 " : "home"}>
      <div className="nav-bar">
        <div className="logo"></div>
        <a href="/">Smart WO</a>
      </div>
      {activeStep === 6 ? (
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
      ) : (
        <>
          <SwipeableViews index={activeStep}>
            <h1>slide n°1</h1>
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
      )}
    </div>
  );
}

export default Home;
