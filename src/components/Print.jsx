import React from "react";
import "./print.scss";

import WorkOrder from "./WorkOrder";
import Capacitacion from "./Capacitacion";
import Evidencia from "./Evidencia";
import OrdenIssste from "./OrdenIssste";
import FichaTecnica from "./FichaTecnica";

function Print(props) {
  console.log(props);

  return (
    <div className="printable">
      <WorkOrder data={props.data} />
      <div className="saltodepag"></div>
      {props.data.equipo.cliente === "IMSS" ? (
        <>
          <Evidencia data={props.data} />
          <div className="saltodepag"></div>
          <Capacitacion data={props.data} />
        </>
      ) : props.data.equipo.cliente === "ISSSTE" ? (
        <>
          <OrdenIssste data={props.data} />
          <div className="saltodepag"></div>
          <div className="marginTop"></div>
          <FichaTecnica data={props.data} />
        </>
      ) : null}
    </div>
  );
}

export default Print;
