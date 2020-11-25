import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";

import { db } from "../../index";

function View1SSO(props) {
	const [sso, setSSO] = useState("");
	const [inge, setInge] = useState(null);

	const changeSSO = (value) => {
		setSSO(value);
		if (inge) {
			handleDone(true, null);
			setInge(null);
		}
	};
	const validateSSO = () => {
		console.log(sso);
		db.collection("users")
			.where("sso", "==", sso)
			.get()
			.then((data) => {
				if (data.empty) {
					handleDone(true, null);
					alert("No existe el usuario");
				} else {
					data.forEach((user) => {
						let us = { ...user.data(), uid: user.id };
						console.log(us);
						setInge(us);
						handleDone(false, us);
					});
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
			});
	};

	const handleDone = (nD, user) => {
		props.onDone(nD, user);
	};

	return (
		<>
			<h3>Ingresa tu SSO</h3>
			<TextField
				label="SSO"
				color="secondary"
				variant="outlined"
				type="tel"
				inputProps={{
					maxLength: 9,
				}}
				onChange={(ev) => changeSSO(ev.target.value)}
				value={sso}
			/>
			{inge ? (
				<p className="nombreInge">{inge.nombre}</p>
			) : (
				<Button
					className="btnValidate"
					size="small"
					variant="contained"
					disabled={sso.length === 9 ? false : true}
					color="primary"
					onClick={() => validateSSO()}>
					Validar
				</Button>
			)}
			<b className="version">Version 1.2.0</b>
		</>
	);
}

export default View1SSO;
