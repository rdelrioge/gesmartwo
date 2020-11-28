import React, { useState, useEffect } from "react";
import {
	TextField,
	Drawer,
	Button,
	InputLabel,
	FormControl,
	Select,
	IconButton,
} from "@material-ui/core";

import "./addmanual.scss";

function AddManual(props) {
	const [cliente, setCliente] = useState(props.equipo.cliente);
	const [hospital, setHospital] = useState(props.equipo.hospital);
	const [direccion, setDireccion] = useState(props.equipo.direccion);
	const [ciudad, setCiudad] = useState(props.equipo.ciudad);
	const [estado, setEstado] = useState(props.equipo.estado);
	const [equipo, setEquipo] = useState(props.equipo.equipo);
	const [modelo, setModelo] = useState(props.equipo.modelo);
	const [sid, setSID] = useState(props.sid);
	const [serie, setSerie] = useState(props.equipo.serie);
	const [contrato, setContrato] = useState(props.equipo.contrato);

	useEffect(() => {
		setSID(props.sid);
		console.log(props);
	}, [props.sid]);

	const handleClose = (ev, flag) => {
		ev.preventDefault();
		if (flag) {
			props.onClose(
				{
					cliente,
					hospital,
					direccion,
					ciudad,
					estado,
					equipo,
					modelo,
					serie,
					contrato,
					sid,
				},
				flag
			);
		} else {
			props.onClose(null, flag);
		}
	};

	return (
		<Drawer
			anchor="bottom"
			open={props.open}
			onClose={(ev) => handleClose(ev, false)}>
			<div className="addmanualdrawer">
				<h3>{props.title} equipo</h3>
				<IconButton
					className="closeBtn"
					onClick={(ev) => {
						handleClose(ev, false);
					}}>
					X
				</IconButton>
				<form
					onSubmit={(ev) => {
						handleClose(ev, true);
					}}>
					<FormControl size="small" fullWidth variant="outlined">
						<InputLabel htmlFor="selectCliente">Cliente</InputLabel>
						<Select
							native
							value={cliente}
							onChange={(e) => setCliente(e.target.value)}
							label="cliente"
							inputProps={{
								name: "cliente",
								id: "selectCliente",
							}}>
							<option aria-label="None" value="" />
							<option value={"IMSS"}>IMSS</option>
							<option value={"ISSSTE"}>ISSSTE</option>
							<option value={"Otro"}>Otro</option>
						</Select>
					</FormControl>
					<TextField
						label="Hospital"
						required
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setHospital(ev.target.value)}
						value={hospital}
					/>
					<TextField
						label="Dirección"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setDireccion(ev.target.value)}
						value={direccion}
					/>
					<TextField
						label="Ciudad"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setCiudad(ev.target.value)}
						value={ciudad}
					/>
					<TextField
						label="Estado"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setEstado(ev.target.value)}
						value={estado}
					/>
					<TextField
						label="Equipo"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setEquipo(ev.target.value)}
						value={equipo}
					/>
					<TextField
						label="Modelo"
						required
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setModelo(ev.target.value)}
						value={modelo}
					/>
					<TextField
						label="Serie"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setSerie(ev.target.value)}
						value={serie}
					/>
					<TextField
						label="Contrato"
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setContrato(ev.target.value)}
						value={contrato}
					/>
					<TextField
						label="SID"
						required
						color="secondary"
						variant="outlined"
						size="small"
						type="text"
						onChange={(ev) => setSID(ev.target.value)}
						value={sid}
					/>
					<Button type="submit" variant="contained" color="primary">
						{props.title}
					</Button>
				</form>
			</div>
		</Drawer>
	);
}

export default AddManual;
