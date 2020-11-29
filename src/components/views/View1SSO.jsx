import React, { useState, useEffect } from "react";

import { Button, TextField } from "@material-ui/core";

import { db } from "../../index";

function View1SSO(props) {
	const [sso, setSSO] = useState("");
	const [inge, setInge] = useState(null);

	useEffect(() => {
		if (props.step === 0) {
			inge ? props.handleNext(false) : props.handleNext(true);
		}
	}, [inge, props]);

	const changeSSO = (value) => {
		setSSO(value);
		if (inge) {
			setInge(null);
			props.onDone(null);
			props.handleNext(true);
		}
	};
	const validateSSO = () => {
		console.log(sso);
		db.collection("users")
			.where("sso", "==", sso)
			.get()
			.then((data) => {
				if (data.empty) {
					props.onDone(null);
					props.handleNext(true);
					alert("No existe el usuario");
				} else {
					data.forEach((user) => {
						let us = { ...user.data(), uid: user.id };
						console.log(us);
						setInge(us);
						props.onDone(us);
						props.handleNext(false);
					});
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
			});
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
			<b className="version">Version 1.2.2</b>
		</>
	);
}

export default View1SSO;
