import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';
import { light } from '~/styles';
import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={light}>
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
