import React from "react";
import "./App.scss";
import WorkOrder from "./components/WorkOrder";
import Capacitacion from "./components/Capacitacion";

function App() {
  return (
    <div className="App">
      <WorkOrder />
      <div className="saltodepag"></div>
      <Capacitacion />
    </div>
  );
}

export default App;
