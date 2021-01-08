import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "normal",
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
});

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
