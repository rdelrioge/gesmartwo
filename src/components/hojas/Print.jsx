import React from "react";
import "./print.scss";

import WorkOrder from "./WorkOrder";
import Capacitacion from "./Capacitacion";
import Evidencia from "./Evidencia";
import OrdenIssste from "./OrdenIssste";
import FichaTecnica from "./FichaTecnica";
import CartaReprogramacionIMSS from "./CartaReprogramacionIMSS";

function Print(props) {
	console.log(props);

	return (
		<div className="printable">
			<WorkOrder data={props.data} />
			<div className="saltodepag"></div>
			{props.data.equipo.cliente === "IMSS" ? (
				props.data.condiciones === "Reprogramado" ? (
					<>
						<CartaReprogramacionIMSS data={props.data} />
					</>
				) : (
					<>
						<Evidencia data={props.data} angulos={props.angulos} />
						<div className="saltodepag"></div>
						{props.flagAddCapacitacion ? (
							<Capacitacion data={props.data} />
						) : null}
					</>
				)
			) : props.data.equipo.cliente === "ISSSTE" ? (
				<>
					<OrdenIssste data={props.data} />
					<div className="saltodepag"></div>
					{props.data.condiciones === "Reprogramado" ? null : (
						<FichaTecnica
							data={props.data}
							angulos={props.angulos}
							edit={props.editFlag}
						/>
					)}
				</>
			) : props.flagAddFotos ? (
				<Evidencia data={props.data} angulos={props.angulos} />
			) : null}
		</div>
	);
}

export default Print;
