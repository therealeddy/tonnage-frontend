import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';

import { SearchMap, Map } from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import {
  convertDistance,
  convertTime,
  convertFloatInPrice,
} from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';
import token from '~/utils/tokenMapbox';

import { Container } from './styles';

export default function SolicitationUserCreate() {
  documentTitle('Criar Solicitação');

  const [price, setPrice] = useState(null);
  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [focus, setFocus] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);

  const [errorOrigin, setErrorOrigin] = useState(false);
  const [errorDestiny, setErrorDestiny] = useState(false);

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

      const { duration: dur, distance: dis } = response.data.routes[0];

      const response_config = await api.get('/configurations');

      const { price_per_kilometer } = response_config.data;

      setPrice(convertFloatInPrice(price_per_kilometer * (dis / 1000)));

      setRoute(response.data.routes[0].geometry.coordinates);
      setDuration(convertTime(dur));
      setDistance(convertDistance(dis));
    }

    if (!isEmpty(origin) && !isEmpty(destiny)) {
      getRoute();
    }
  }, [origin, destiny]);

  async function handleSubmit() {
    if (!origin.result || !destiny.result) {
      if (!origin.result) {
        setErrorOrigin(true);
      }
      if (!destiny.result) {
        setErrorDestiny(true);
      }
      return;
    }

    setLoading(true);

    const data = {
      destination_address: origin.result,
      destination_latitude: origin.lat,
      destination_longitude: origin.lng,
      origin_address: destiny.result,
      origin_latitude: destiny.lat,
      origin_longitude: destiny.lng,
    };

    const response = await api.post('/requests', data);

    if (response.data.success) {
      toast.success(response.data.success);
      history.push('/requests');
    }

    toast.error(response.data.error);

    setLoading(false);
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Criar Solicitação</h1>
        <Form onSubmit={handleSubmit}>
          <div className="row mb-5">
            <div className="col-lg-6">
              <SearchMap
                id="partida"
                label="Endereço de partida"
                onSuggestionSelect={suggestionOrigin}
                publicKey={token}
                error={errorOrigin}
              />
            </div>
            <div className="col-lg-6">
              <SearchMap
                id="destino"
                label="Endereço de destino"
                onSuggestionSelect={suggestionDestiny}
                publicKey={token}
                error={errorDestiny}
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
                {price && (
                  <>
                    <p className="label-map">Preço pela distância</p>
                    <p className="desc-map strong">{price}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-5">
            <button
              type="submit"
              className={`btn btn-success ${loading && 'disabled btn-loading'}`}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters color="#fff" size={14} />
              ) : (
                'Solicitar'
              )}
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
