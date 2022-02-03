import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./theme";
import { GlobalStyle } from "./global-styles";
import "normalize.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

