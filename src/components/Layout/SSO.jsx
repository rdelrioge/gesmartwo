import React, { useState, useEffect } from "react";
import "./sso.scss";
import {
	Button,
	TextField,
	IconButton,
	Slide,
	Dialog,
} from "@material-ui/core";

import { db } from "../../index";
import CreateWO from "../CreateWO/CreateWO";

function SSO(props) {
	const [sso, setSSO] = useState("");
	const [inge, setInge] = useState(null);
	const [animation, setAnimation] = useState(false);
	const [animation2, setAnimation2] = useState(false);
	const [animation3, setAnimation3] = useState(false);
	const [openNew, setOpenNew] = useState(false);
	const [editWO, setEditWO] = useState(false);

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
		if (value && value.length === 9) {
			validateSSO(value);
		}
		if (inge) {
			setInge(null);
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

	const handleCloseNew = () => {
		setOpenNew(false);
	};
	return (
		<div className="ssoC">
			{inge ? (
				<div className="logged">
					{openNew ? null : (
						// Se esconden porque en Iphone no funciona el scroll si toca los botones y z-index no lo soluciona
						<>
							<div className="ingeData">
								<p className={animation ? "animation" : undefined}>
									{inge.nombre}
								</p>
								<p className={animation ? "animation" : undefined}>
									{inge.sso}
								</p>
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
									className={animation ? "animation" : undefined}
									variant="contained"
									color="primary">
									<i className="material-icons">folder_open</i> Historial
								</Button>
								<Button
									className={animation2 ? "animation" : undefined}
									variant="contained"
									onClick={() => {
										setOpenNew(true);
										setEditWO(true);
									}}
									color="primary">
									<i className="material-icons">restore_page</i> Usar reciente
								</Button>
								<Button
									className={animation3 ? "animation" : undefined}
									variant="contained"
									onClick={() => {
										setOpenNew(true);
										setEditWO(false);
									}}
									color="primary">
									<i className="material-icons">note_add</i> Nueva WO
								</Button>
							</div>
						</>
					)}
					<Dialog
						TransitionComponent={Slide}
						TransitionProps={{ direction: "up" }}
						scroll={"paper"}
						fullScreen
						className="drawerNewWO"
						open={openNew}
						onClose={() => setOpenNew(false)}>
						<CreateWO
							inge={inge}
							close={() => setOpenNew(false)}
							edit={editWO}
							data={JSON.parse(localStorage.getItem("datosActuales"))}
						/>
					</Dialog>
				</div>
			) : (
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
			)}
			<b className="version">Version 2.0.0 Beta</b>
		</div>
	);
}

export default SSO;
