import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "src/App";
import { ThemeProvider } from "styled-components";
import { store } from "./redux/store";
import GlobalStyle from "./style/globals";
import theme from "./style/theme";

library.add(fas, far, faStar);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </ThemeProvider>
);
