import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { pages } from './pages';
import { Container } from './styles';

export default function Header() {
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
        <Link to="/" className="exit">
          Sair
        </Link>
      </header>
    </Container>
  );
}
