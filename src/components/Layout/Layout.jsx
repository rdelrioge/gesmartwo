import React from "react";
import Home from "../Home";

import "./layout.scss";

function Layout() {
	return (
		<div className="layoutC">
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			<Home />
		</div>
	);
}

export default Layout;
