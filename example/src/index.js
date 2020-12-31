import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loader } from "graphql.macro";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { GGFProvider } from "@ggf/ggf";

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

const graphQLDocument = loader("./document.graphql");

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GGFProvider graphQLDocument={graphQLDocument}>
        <CssBaseline />

        <App />
      </GGFProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
