import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "src/App";
import { store } from "src/redux/store";
import GlobalStyle from "src/style/globals";
import theme from "src/style/theme";
import { ThemeProvider } from "styled-components";

library.add(fas, far, faStar);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </ThemeProvider>
);
