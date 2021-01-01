import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loader } from "graphql.macro";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { createIntl, createIntlCache } from "react-intl";
import messages from "./compiled-lang/en.json";
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

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: "en",
    messages,
  },
  cache
);

function translate({ id }) {
  return intl.formatMessage({ id });
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GGFProvider graphQLDocument={graphQLDocument} translate={translate}>
        <CssBaseline />

        <App />
      </GGFProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
