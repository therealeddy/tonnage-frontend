import React from 'react';

import { SearchMap } from '~/components';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Criar Solicitação');

  function suggestionOrigin(result, lat, lng, text) {
    console.tron.log(result, lat, lng, text);
  }

  function suggestionDestiny(result, lat, lng, text) {
    console.tron.log(result, lat, lng, text);
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Criar Solicitação</h1>
        <div className="row">
          <div className="col-lg-6">
            <SearchMap
              id="partida"
              label="Endereço de partida"
              onSuggestionSelect={suggestionOrigin}
              error
            />
          </div>
          <div className="col-lg-6">
            <SearchMap
              id="destino"
              label="Endereço de destino"
              onSuggestionSelect={suggestionDestiny}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
