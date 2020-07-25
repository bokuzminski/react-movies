import React from 'react';
import ReactDOM from 'react-dom';
//

import { Store } from './globalState/moviesState';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/globals';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(fas, far, faStar);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Store>
      <App />
    </Store>
    <GlobalStyle />
  </ThemeProvider>,
  document.querySelector('#root')
);
