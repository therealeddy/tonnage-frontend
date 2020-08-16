import React from 'react';

import authConfig from '~/config/authConfig';

import { Container } from './styles';

export default function Dashboard() {
  const { keyRootStorage, configRolesArray } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  return (
    <Container className="animated jello">
      <div className="container d-flex justify-content-center mt-5">
        <h1>Rota do {configRolesArray[root.user.role]}!</h1>
      </div>
    </Container>
  );
}
