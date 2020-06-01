import React from "react";
import "./print.scss";

import WorkOrder from "./WorkOrder";
import Capacitacion from "./Capacitacion";

function Print() {
  return (
    <div className="printable">
      <WorkOrder />
      <div className="saltodepag"></div>
      <Capacitacion />
    </div>
  );
}

export default Print;
