import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from '~/routes';
import GlobalStyles from '~/styles/global';
import history from '~/services/history';

export default function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
      <ToastContainer autoClose={5000} />
    </Router>
  );
}
