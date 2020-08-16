import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

function Users() {
  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Usúarios</h1>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <Link className="card" to="/users/client">
              Clientes
            </Link>
          </div>
          <div className="col-lg-4">
            <Link className="card" to="/users">
              Gerentes
            </Link>
          </div>
          <div className="col-lg-4">
            <Link className="card" to="/users">
              Caminhoneiros
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Users;
