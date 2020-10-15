import React from 'react';
import { NavLink } from 'react-router-dom';

import authConfig from '~/config/authConfig';
import { logout } from '~/services/auth';

import { pagesClient, pagesTrucker, pagesManager, pagesAdmin } from './pages';
import { Container } from './styles';

export default function Header() {
  const { keyRootStorage, configRolesArray } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  const { nickname } = root.user;

  const pagesConfig = {
    Cliente: pagesClient,
    Caminhoneiro: pagesTrucker,
    Gerente: pagesManager,
    Administrador: pagesAdmin,
  };

  const pages = pagesConfig[configRolesArray[root.user.role]];
  const roleName = configRolesArray[root.user.role];

  function handleExit() {
    logout();
  }

  return (
    <Container>
      <header className="top z-depth-1">
        <div className="logo" />
        <div className="nickname">
          {`${roleName}, ${nickname}`}
          <img
            src="https://api.adorable.io/avatars/40/abott@adorable.io.png"
            alt="avatar"
          />
        </div>
      </header>
      <header className="left">
        <ul>
          {pages.map((item, index) => (
            <li key={String(index)}>
              <NavLink to={item.url} exact activeClassName="active">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <button type="button" className="exit" onClick={handleExit}>
          Sair
        </button>
      </header>
    </Container>
  );
}
