import React from 'react';

import { Container } from './styles';

export default function Pagination() {
  return (
    <Container>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" type="button">
              &laquo;
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" type="button">
              1
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" type="button">
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" type="button">
              3
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" type="button">
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
