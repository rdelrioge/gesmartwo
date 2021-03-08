import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Settings() {
	const history = useHistory();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			console.log(loggedInUser);
			// const foundUser = JSON.parse(loggedInUser);
			// setInge(foundUser);
		} else {
			console.log("No user found");
			history.push("/login");
		}
	}, []);

	return (
		<div>
			<h1>Settings</h1>
			<Link to="/">Back to home</Link>
		</div>
	);
}

export default Settings;
