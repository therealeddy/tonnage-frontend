import React from 'react';

import authConfig from '~/config/authConfig';
import TruckerDasboard from '~/pages/Trucker/Solicitation';

import { Container } from './styles';

export default function Dashboard() {
  const { keyRootStorage, configRolesArray } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  switch (root.user.role) {
    case 2:
      return <TruckerDasboard />;
    default:
      return (
        <Container className="animated jello">
          <div className="container d-flex justify-content-center mt-5">
            <h1>Bem Vindo {configRolesArray[root.user.role]}!</h1>
          </div>
        </Container>
      );
  }
}
