import React from 'react';
import { NavLink } from 'react-router-dom';

import authConfig from '~/config/authConfig';
import { logout } from '~/services/auth';

import { pagesClient, pagesTrucker, pagesManager, pagesAdmin } from './pages';
import { Container } from './styles';

export default function Header() {
  const { keyRootStorage, configRolesArray } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  const pagesConfig = {
    cliente: pagesClient,
    caminhoneiro: pagesTrucker,
    gerente: pagesManager,
    administrador: pagesAdmin,
  };

  const pages = pagesConfig[configRolesArray[root.user.role]];

  function handleExit() {
    logout();
  }

  return (
    <Container>
      <header className="top z-depth-1">
        <div className="logo" />
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
