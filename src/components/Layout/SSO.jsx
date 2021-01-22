import React, { useState, useEffect } from "react";
import "./sso.scss";
import { Button, TextField, IconButton } from "@material-ui/core";

import { db } from "../../index";

function SSO(props) {
	const [sso, setSSO] = useState("");
	const [inge, setInge] = useState(null);
	const [animation, setAnimation] = useState(false);
	const [animation2, setAnimation2] = useState(false);
	const [animation3, setAnimation3] = useState(false);

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		console.log(loggedInUser);
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setInge(foundUser);
			setSSO(foundUser.sso);
		}
	}, []);

	useEffect(() => {
		if (inge) {
			setTimeout(() => {
				setAnimation(true);
			}, 200);
			setTimeout(() => {
				setAnimation2(true);
			}, 500);
			setTimeout(() => {
				setAnimation3(true);
			}, 800);
		} else {
			setAnimation(false);
			setAnimation2(false);
			setAnimation3(false);
		}
	}, [inge]);

	const changeSSO = (value) => {
		setSSO(value);
		if (inge) {
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
					alert("No existe el usuario");
				} else {
					data.forEach((user) => {
						let us = { ...user.data(), uid: user.id };
						console.log(us);
						setInge(us);
						// store the user in localStorage
						localStorage.setItem("user", JSON.stringify(us));
					});
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
			});
	};

	const handleLogout = () => {
		setSSO("");
		setInge(null);
		localStorage.removeItem("user");
	};
	return (
		<div className="ssoC">
			{inge ? (
				<div className="logged">
					<div className="ingeData">
						<p className={animation ? "animation" : undefined}>{inge.nombre}</p>
						<p className={animation ? "animation" : undefined}>{inge.sso}</p>
						<div className={animation ? "animation" : undefined}>
							<IconButton
								className="logoutIcon material-icons"
								onClick={handleLogout}>
								power_settings_new
							</IconButton>
						</div>
					</div>
					<div className="tasks">
						<Button
							className={animation2 ? "animation2" : undefined}
							variant="contained"
							color="primary">
							<i className="material-icons">pending_actions</i> Historial
						</Button>
						<Button
							className={animation3 ? "animation3" : undefined}
							variant="contained"
							color="primary">
							<i className="material-icons">note_add</i> Nueva WO
						</Button>
					</div>
				</div>
			) : (
				<div className="notLogged">
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
					<Button
						className="btnValidate"
						size="small"
						variant="contained"
						disabled={sso.length === 9 ? false : true}
						color="primary"
						onClick={() => validateSSO()}>
						Validar
					</Button>
				</div>
			)}
			<b className="version">Version 2.0.0</b>
		</div>
	);
}

export default SSO;
