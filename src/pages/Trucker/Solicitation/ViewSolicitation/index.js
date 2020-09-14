import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import { parseISO, format } from 'date-fns';
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

  documentTitle(`Solicitação #${params.id}`);

  const [status, setStatus] = useState('');
  const [client, setClient] = useState('');
  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(null);

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
      const response = await api.get(`requests-trucker/${params.id}`);

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

      if (response.data.user) {
        setClient(response.data.user.name);
      }

      if (response.data.collection_date) {
        setCollectionDate(response.data.collection_date);
      }

      setStatus(response.data.status);
      setDescription(response.data.description);
      setLoad(response.data.transaction.name_load);
    }

    getData();
  }, [params]);

  async function handleSubmit() {
    setLoading(true);

    const response = await api.put(`/requests-admin/${params.id}`, {
      status,
    });

    if (response.data.success) {
      toast.success(response.data.success);
      history.push('/manage-orders');
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
            <div className="col-lg-4 mb-5">
              <div className="info">
                <div className="title">Cliente</div>
                {client && <div className="description">{client}</div>}
              </div>
            </div>
            <div className="col-lg-8 mb-5">
              <div className="info">
                <div className="title">Tipo de carga</div>
                {load && <div className="description">{load}</div>}
              </div>
            </div>
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
                <div className="title">Data de retirada</div>
                {collectionDate && (
                  <div className="description">
                    {format(parseISO(collectionDate), 'dd/MM/yyyy - HH:mm')}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12">
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
            {description && (
              <div className="col-lg-12">
                <p className="label-map mt-5">Descrição do pedido</p>
                <p className="desc-map">{description}</p>
              </div>
            )}
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
                'Confirmar'
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
