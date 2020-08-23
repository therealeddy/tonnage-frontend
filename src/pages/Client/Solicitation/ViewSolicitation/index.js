import React, { useState, useEffect } from 'react';

import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

import { Map } from '~/components';
import statusConfig from '~/config/statusConfig';
import token from '~/config/tokenMapbox';
import api from '~/services/api';
import {
  convertDistance,
  convertTime,
  convertFloatInPrice,
} from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';

import { Container } from './styles';

export default function SolicitationAdminEdit({ match }) {
  const { params } = match;

  documentTitle(`Solicitação #${params.id}`);

  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState('');
  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [createdAt, setCreatedAt] = useState('');

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

  useEffect(() => {
    async function getData() {
      const response = await api.get(`requests/${params.id}`);

      const { route: resRoute } = response.data;

      setDestiny({
        result: resRoute.destination_address,
        lat: resRoute.destination_latitude,
        lng: resRoute.destination_longitude,
      });

      setOrigin({
        result: resRoute.origin_address,
        lat: resRoute.origin_latitude,
        lng: resRoute.origin_longitude,
      });

      setStatus(response.data.status);
      setDescription(response.data.description);
      setCollectionDate(response.data.collection_date);
      setCreatedAt(response.data.created_at);
    }

    getData();
  }, [params]);

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Solicitação #{params.id}</h1>
        <div className="row mb-5">
          <div className="col-lg-4 mb-5">
            <div className="info">
              <div className="title">Endereço de partida</div>
              {origin.result && (
                <div className="description">{origin.result}</div>
              )}
            </div>
          </div>
          <div className="col-lg-4 mb-5">
            <div className="info">
              <div className="title">Endereço de destino</div>
              {destiny.result && (
                <div className="description">{destiny.result}</div>
              )}
            </div>
          </div>
          <div className="col-lg-4 mb-5">
            <div className="info">
              <div className="title">Criado em</div>
              {createdAt && (
                <div className="description">
                  {format(parseISO(createdAt), 'dd/MM/yyyy - HH:mm')}
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info">
              <div className="title">Data de retirada</div>
              {collectionDate ? (
                <div className="description">
                  {format(parseISO(collectionDate), 'dd/MM/yyyy - HH:mm')}
                </div>
              ) : (
                <div className="description">Nao foi agendado</div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info">
              <div className="title">Status</div>
              {status && (
                <div className="description">{statusConfig[status]}</div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info">
              <div className="title">Preço pago</div>
              {price && <div className="description">{price}</div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <Map
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
            </div>
          </div>
          {description && (
            <div className="col-lg-12">
              <p className="label-map mt-5">Descrição do pedido</p>
              <p className="desc-map">{description}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

SolicitationAdminEdit.propTypes = {
  match: PropTypes.object,
};

SolicitationAdminEdit.defaultProps = {
  match: {},
};
