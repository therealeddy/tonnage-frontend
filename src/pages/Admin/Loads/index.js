import React from 'react';

import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Tipos de cargas');
  return (
    <Container className="animated fadeIn">
      <h1>Tipos de cargas</h1>
    </Container>
  );
}
