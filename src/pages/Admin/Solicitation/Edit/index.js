import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Map } from '~/components';
import token from '~/config/tokenMapbox';
import api from '~/services/api';
import history from '~/services/history';
import { convertDistance, convertTime } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';

import { Container } from './styles';

export default function SolicitationAdminEdit({ match }) {
  const { params } = match;

  documentTitle('Visualizar Solicitação');

  const [status, setStatus] = useState('');
  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);

  function getUrlApiRoute(start, end) {
    return `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}.json?access_token=${token}&geometries=geojson`;
  }

  useEffect(() => {
    async function getRoute() {
      const response = await api.get(
        getUrlApiRoute([origin.lng, origin.lat], [destiny.lng, destiny.lat])
      );

      const { duration: dur, distance: dis } = response.data.routes[0];

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
    }

    getData();
  }, [params]);

  async function handleSubmit() {
    setLoading(true);

    const response = await api.put(`/requests/${params.id}`, {
      status,
    });

    if (response.data.success) {
      toast.success(response.data.success);
      history.push('/requests');
      return;
    }

    toast.error('Ocorreu algum erro!');

    setLoading(false);
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Solicitação #{params.id}</h1>
        <Form onSubmit={handleSubmit}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="title">Endereço de partida</div>
                {origin.result && (
                  <div className="description">{origin.result}</div>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info">
                <div className="title">Endereço de destino</div>
                {destiny.result && (
                  <div className="description">{destiny.result}</div>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info">
                <div className="title">Status</div>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="create">Criado</option>
                  <option value="scheduled">Agendado</option>
                  <option value="retired">Retirado</option>
                  <option value="on_course">A caminho</option>
                  <option value="delivered">Entregue</option>
                  <option value="canceled">Cancelado</option>
                </select>
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
                'Salvar'
              )}
            </button>
          </div>
        </Form>
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
