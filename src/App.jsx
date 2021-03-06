import React from "react";

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import variables from "./index.scss";
import Home from "./components/CreateWO/CreateWO";
import Reader from "./components/Reader";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			{/* <Home /> */}
			<Layout />
			{/* <Reader /> */}
		</MuiThemeProvider>
	);
}

// Theme config
const theme = createMuiTheme({
	palette: {
		primary: { main: variables.primary, contrastText: "#ffffff" },
		secondary: { main: variables.secondary },
		grised: { main: variables.grised },
	},
	typography: {
		useNextVariants: true,
	},
});

export default App;
