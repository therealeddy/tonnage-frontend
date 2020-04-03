import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import { pages } from './pages';
// import history from '~/services/history';

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
              <Link
                to={item.url}
                // className={
                //   history.location.pathname === item.url ? 'active' : ''
                // }
              >
                {item.title}
              </Link>
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
