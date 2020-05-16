import React from 'react';

import { loading } from '~/images';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <img src={loading} alt="loading" />
    </Container>
  );
}
