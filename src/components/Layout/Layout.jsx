import React from "react";

import "./layout.scss";
import SSO from "./SSO";

function Layout() {
	return (
		<div className="layoutC">
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			<SSO />
		</div>
	);
}

export default Layout;
