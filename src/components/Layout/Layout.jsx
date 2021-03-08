import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./layout.scss";
import SSO from "./SSO";
import Settings from "./Settings";

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
					<Route path="/settings" component={Settings} />
					<Route path="*" render={() => <Redirect to="/" />} />
				</Switch>
			</BrowserRouter>
			{/* <SSO /> */}
		</div>
	);
}

export default Layout;
