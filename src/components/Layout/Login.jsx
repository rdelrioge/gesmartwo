import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { TextField } from "@material-ui/core";

import { db } from "../../index";

import "./login.scss";

function Login() {
	const [sso, setSSO] = useState("");
	const history = useHistory();

	const changeSSO = (value) => {
		setSSO(value);
		if (value && value.length === 9) {
			validateSSO(value);
		}
	};
	const validateSSO = (value) => {
		db.collection("users")
			.where("sso", "==", value)
			.get()
			.then((data) => {
				if (data.empty) {
					alert("No existe el usuario");
				} else {
					data.forEach((user) => {
						let us = { ...user.data(), uid: user.id };
						console.log(us);
						// store the user in localStorage
						localStorage.setItem("user", JSON.stringify(us));
						// once I have a user, redirect to main component
						history.push("/");
					});
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
			});
	};

	return (
		<div className="notLogged">
			<h3>Ingresa tu SSO</h3>
			<TextField
				label=""
				color="secondary"
				variant="outlined"
				type="tel"
				className="txtFldSSO"
				inputProps={{
					maxLength: 9,
				}}
				onChange={(ev) => changeSSO(ev.target.value)}
				value={sso}
			/>
		</div>
	);
}

export default Login;
