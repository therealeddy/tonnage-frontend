import React, { useState } from 'react';

import { SearchMap, Map } from '~/components';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Criar Solicitação');

  const token =
    'pk.eyJ1IjoidGhlcmVhbGVkZHkiLCJhIjoiY2thYTc2ajJmMTB6dTJydWxxZnMxbGZ3biJ9.TjssecTzcJtB-SVliMf2Ig';

  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [focus, setFocus] = useState({});

  function suggestionOrigin(result, lat, lng, text) {
    setOrigin({ result, lat, lng, text });
    setFocus({ result, lat, lng, text });
  }

  function suggestionDestiny(result, lat, lng, text) {
    setDestiny({ result, lat, lng, text });
    setFocus({ result, lat, lng, text });
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Criar Solicitação</h1>
        <div className="row mb-5">
          <div className="col-lg-6">
            <SearchMap
              id="partida"
              label="Endereço de partida"
              onSuggestionSelect={suggestionOrigin}
              publicKey={token}
            />
          </div>
          <div className="col-lg-6">
            <SearchMap
              id="destino"
              label="Endereço de destino"
              onSuggestionSelect={suggestionDestiny}
              publicKey={token}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <Map
              focus={focus}
              origin={origin}
              destiny={destiny}
              accessToken={token}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
