import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./layout.scss";
import SSO from "./SSO";
import Login from "./Login";
import Herramientas from "./Herramientas";

function Layout() {
	return (
		<div className="layoutC">
			<div className="nav-bar">
				<div className="logo"></div>
				<a href="/">Smart WO</a>
			</div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={SSO} />
					<Route exact path="/login" component={Login} />
					<Route path="/tools" component={Herramientas} />
					<Route path="*" render={() => <Redirect to="/" />} />
				</Switch>
			</BrowserRouter>
			<b className="version">Version 2.0.7</b>
		</div>
	);
}

export default Layout;
