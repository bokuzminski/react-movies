import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { store } from "./redux/store";
import GlobalStyle from "./style/globals";
import theme from "./style/theme";

library.add(fas, far, faStar);

const root = createRoot(document.getElementById("root")!);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </ThemeProvider>
);
