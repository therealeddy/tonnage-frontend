import React from 'react';
import { Link } from 'react-router-dom';

import authConfig from '~/config/authConfig';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

function Users() {
  documentTitle('Usuários');

  const { keyRootStorage, configRolesArray } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  const role = configRolesArray[root.user.role];

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Usúarios</h1>
        </div>
        <div className="row">
          {role === 'administrador' && (
            <>
              <div className="col-lg-4">
                <Link className="card" to="/users/client">
                  Clientes
                </Link>
              </div>
              <div className="col-lg-4">
                <Link className="card" to="/users/manager">
                  Gerentes
                </Link>
              </div>
            </>
          )}
          <div className="col-lg-4">
            <Link className="card" to="/users/trucker">
              Caminhoneiros
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Users;
