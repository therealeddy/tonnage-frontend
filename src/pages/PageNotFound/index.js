import React from 'react';

import { obras } from '~/images';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Em obras');
  return (
    <Container className="animated fadeIn">
      <div className="container d-flex flex-column align-items-center mt-5">
        <h1 className="mb-5">Em obras!</h1>
        <img src={obras} alt="obras" />
      </div>
    </Container>
  );
}
