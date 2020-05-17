import React, { useState, useEffect } from 'react';

import { SearchMap, Map } from '~/components';
import api from '~/services/api';
import { convertDistance, convertTime } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Criar Solicitação');

  const token =
    'pk.eyJ1IjoidGhlcmVhbGVkZHkiLCJhIjoiY2thYTc2ajJmMTB6dTJydWxxZnMxbGZ3biJ9.TjssecTzcJtB-SVliMf2Ig';

  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [focus, setFocus] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  function suggestionOrigin(result, lat, lng, text) {
    setOrigin({ result, lat, lng, text });
    setFocus({ lat, lng });
  }

  function suggestionDestiny(result, lat, lng, text) {
    setDestiny({ result, lat, lng, text });
    setFocus({ lat, lng });
  }

  function getUrlApiRoute(start, end) {
    return `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}.json?access_token=${token}&geometries=geojson`;
  }

  useEffect(() => {
    async function getRoute() {
      const response = await api.get(
        getUrlApiRoute([origin.lng, origin.lat], [destiny.lng, destiny.lat])
      );

      console.tron.log(response);

      setRoute(response.data.routes[0].geometry.coordinates);
      setDuration(convertTime(response.data.routes[0].duration));
      setDistance(convertDistance(response.data.routes[0].distance));
    }

    if (!isEmpty(origin) && !isEmpty(destiny)) {
      getRoute();
    }
  }, [origin, destiny]);

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
              route={route}
              accessToken={token}
            />
          </div>
          <div className="col-lg-2 d-flex align-items-center">
            <div>
              {distance && (
                <>
                  <p className="label-map">Distância</p>
                  <p className="desc-map">{distance}</p>
                </>
              )}
              {duration && (
                <>
                  <p className="label-map">T. estimado</p>
                  <p className="desc-map">{duration}</p>
                </>
              )}
              {distance && (
                <>
                  <p className="label-map">Preço pela distância</p>
                  <p className="desc-map strong">R$ 145,00</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
