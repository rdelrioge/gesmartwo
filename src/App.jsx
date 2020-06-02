import React from "react";

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import variables from "./index.scss";
import Home from "./components/Home";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Home />
    </MuiThemeProvider>
  );
}

// Theme config
const theme = createMuiTheme({
  palette: {
    primary: { main: variables.primary, contrastText: "#ffffff" },
    secondary: { main: variables.secondary },
  },
  typography: {
    useNextVariants: true,
  },
});

export default App;
