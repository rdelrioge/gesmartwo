import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./sso.scss";
import { Button, Menu, MenuItem, Slide, Dialog } from "@material-ui/core";

import { localdb } from "../../index";
import CreateWO from "../CreateWO/CreateWO";

function SSO(props) {
	const [inge, setInge] = useState(null);
	const [animation, setAnimation] = useState(false);
	const [animation2, setAnimation2] = useState(false);
	const [animation3, setAnimation3] = useState(false);
	const [openNew, setOpenNew] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [editWO, setEditWO] = useState(false);
	const [cacheData, setCacheData] = useState(null);

	const history = useHistory();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			console.log(loggedInUser);
			const foundUser = JSON.parse(loggedInUser);
			setInge(foundUser);
		} else {
			console.log("No user found");
			history.push("/login");
		}
	}, []);

	useEffect(() => {
		localdb.datosRecientes
			.where("name")
			.equals("reciente")
			.first((data) => {
				console.log(data);
				data ? setCacheData(data.value) : setCacheData(null);
			});
	}, [localdb]);

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

	const handleLogout = () => {
		setInge(null);
		localStorage.removeItem("user");
		history.push("/login");
	};

	return (
		<div className="ssoC">
			{inge ? (
				<div className="logged">
					{openNew ? null : (
						// Se esconden porque en Iphone no funciona el scroll si toca los botones y z-index no lo soluciona
						<>
							<div className="ssoSup">
								<div className="ingData">
									<p className={animation ? "animation" : undefined}>
										{inge.nombre}
									</p>
									<p className={animation ? "animation" : undefined}>
										{inge.sso}
									</p>
								</div>
								<div>
									<Button
										aria-controls="simple-menu"
										aria-haspopup="true"
										className={animation ? "animation menuBtn" : undefined}
										onClick={(ev) => setAnchorEl(ev.currentTarget)}>
										{Boolean(anchorEl) ? (
											<i className="material-icons">close</i>
										) : (
											<i className="material-icons">menu</i>
										)}
									</Button>
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										elevation={0}
										getContentAnchorEl={null}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "center",
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "center",
										}}
										open={Boolean(anchorEl)}
										onClose={() => setAnchorEl(null)}>
										<MenuItem
											className="ssoC_menuItem"
											onClick={() => setAnchorEl(null)}>
											<Link to="/tools">
												<i className="material-icons">settings</i>Herramientas
											</Link>
										</MenuItem>
										<MenuItem
											className="ssoC_menuItem"
											onClick={() => {
												setAnchorEl(null);
												handleLogout();
											}}>
											<i className="material-icons">power_settings_new</i>
											Logout
										</MenuItem>
									</Menu>
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
							data={cacheData}
						/>
					</Dialog>
				</div>
			) : null}
		</div>
	);
}

export default SSO;
