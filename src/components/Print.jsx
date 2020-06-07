import React from "react";
import "./print.scss";

import WorkOrder from "./WorkOrder";
import Capacitacion from "./Capacitacion";

function Print(props) {
  console.log(props);
  
  return (
    <div className="printable">
      <WorkOrder data={props.data} />
      <div className="saltodepag"></div>
      <Capacitacion data={props.data} />
    </div>
  );
}

export default Print;
