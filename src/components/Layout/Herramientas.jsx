import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./herramientas.scss";

import {
	Button,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
} from "@material-ui/core";

function Herramientas() {
	const [expanded, setExpanded] = React.useState(false);

	// const tools = [];

	const tools = [
		{ descripcion: "Multimetro fluke", serie: "123", proxCal: "09/09/2021" },
		{ descripcion: "Torquimetro URREA", serie: "456", proxCal: "04/15/2021" },
		{
			descripcion: "Torquimetro WESTWARD",
			serie: "789",
			proxCal: "03/11/2021",
		},
		{ descripcion: "Aspiradora 3M", serie: "101112", proxCal: "02/15/2021" },
	];

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// This func check if the cal date is close to expire (45 days)
	const checkCalDue = (date) => {
		console.log(date);
		// only for test, the date will be in human format
		// for prod, date is in Timestamp

		let expDate = moment(date).startOf("day").valueOf();
		let diff = moment(expDate).diff(moment().startOf("day"), "days");
		console.log(diff);
		if (diff < 45) {
			if (diff === 0) {
				return <b className="proxToCal">Hoy expira esta herramienta</b>;
			}
			if (diff < 0) {
				return (
					<b className="proxToCal">
						Calibración expirada por {Math.abs(diff)}{" "}
						{diff === -1 ? "dia" : "dias"}
					</b>
				);
			}
			return (
				<b className="proxToCal">
					Quedan {diff} {diff === 1 ? "dia" : "dias"} para que expire la
					calibración
				</b>
			);
		}
	};

	return (
		<div className="herramientasC">
			<div className="header">
				<Link to="/">
					<Button>
						<i className="material-icons">arrow_back</i>
					</Button>
				</Link>
				<h3>Herramientas</h3>
			</div>
			<div className="content">
				{tools && tools.length > 0 ? (
					tools.map((tool, index) => (
						<ExpansionPanel
							key={index}
							className="expPanel"
							expanded={expanded === index}
							onChange={handleChange(index)}>
							<ExpansionPanelSummary
								className="expSummary"
								expandIcon={<i className="material-icons">expand_more</i>}>
								<b>
									<i className="material-icons">construction</i>{" "}
									{tool.descripcion}
								</b>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className="expDetails">
								<p>
									<b>Barcode: </b> {tool.serie}
								</p>
								<p>
									<b>Próxima calibración: </b> {tool.proxCal}
								</p>
								{checkCalDue(tool.proxCal)}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))
				) : (
					<div className="noTools">
						<i className="material-icons">construction</i>
						<b>Sin herramientas</b>
						<p>
							Agrega aqui tus herramientas disponibles para los servicios,
							podrás agregarlas después en la hoja de servicio
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Herramientas;
