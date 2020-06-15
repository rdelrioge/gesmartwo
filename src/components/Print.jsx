import React from "react";
import "./print.scss";

import WorkOrder from "./WorkOrder";
import Capacitacion from "./Capacitacion";
import Evidencia from "./Evidencia";
import OrdenIssste from "./OrdenIssste";

function Print(props) {
  console.log(props);

  return (
    <div className="printable">
      {/* <WorkOrder data={props.data} />
      
      <div className="saltodepag"></div>
      <Evidencia data={props.data} />
      <div className="saltodepag"></div>
      <Capacitacion data={props.data} /> */}
      <OrdenIssste />
    </div>
  );
}

export default Print;
