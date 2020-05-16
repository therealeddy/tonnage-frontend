import React from 'react';

import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Criar Solicitação');
  return (
    <Container className="animated fadeIn">
      <h1>Criar Solicitação</h1>
    </Container>
  );
}
