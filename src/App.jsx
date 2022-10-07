import React from "react";

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import variables from "./index.scss";
import Reader from "./components/Reader";
import ChecklistCT from "./components/hojas/CheckLists/CheckListCT";
import Niveles from "./components/hojas/POE/Niveles";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			{/* <Layout /> */}
			{/* <Reader /> */}
			{/* <ChecklistCT /> */}
			<Niveles />
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
