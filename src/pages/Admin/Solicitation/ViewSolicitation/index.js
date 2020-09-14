import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import { addHours, setSeconds, setMinutes, parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import { Map } from '~/components';
import token from '~/config/tokenMapbox';
import api from '~/services/api';
import history from '~/services/history';
import {
  convertDistance,
  convertTime,
  convertFloatInPrice,
} from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';

import { Container } from './styles';

registerLocale('pt-BR', ptBR);

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
  const [collectionDate, setCollectionDate] = useState(
    setMinutes(setSeconds(addHours(new Date(), 1), 0), 0)
  );
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorTrucker, setErrorTrucker] = useState(false);

  const [transaction, setTransaction] = useState({});

  const [truckers, setTruckers] = useState([]);
  const [truckerSelected, setTruckerSelected] = useState('');

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
      const response = await api.get(`requests-admin/${params.id}`);

      const { route: resRoute } = response.data;

      const response_truckers = await api.get('/users', {
        params: {
          role: 2,
          findAll: true,
        },
      });

      setTruckers(
        response_truckers.data.rows.map((row) => {
          return row.user;
        })
      );

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

      if (response.data.user_trucker) {
        setTruckerSelected(response.data.user_trucker.id);
      }

      if (response.data.user) {
        setClient(response.data.user.name);
      }

      if (response.data.collection_date) {
        setCollectionDate(parseISO(response.data.collection_date));
      }

      setStatus(response.data.status);
      setDescription(response.data.description);
      setCreatedAt(response.data.created_at);

      setTransaction(response.data.transaction);
    }

    getData();
  }, [params]);

  async function handleSubmit() {
    if (!truckerSelected) {
      setErrorTrucker(true);
      return;
    }

    setLoading(true);

    setErrorTrucker(false);

    const response = await api.put(`/requests-admin/${params.id}`, {
      status,
      id_user_trucker: truckerSelected,
      collection_date: collectionDate,
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
            <div className="col-lg-6 mb-5">
              <div className="info">
                <div className="title">Preço pago pela distancia</div>
                {transaction.price_per_kilometer && (
                  <div className="description">
                    {convertFloatInPrice(transaction.price_per_kilometer)}
                  </div>
                )}
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
                <DatePicker
                  dateFormat="dd/MM/yyyy - HH:mm"
                  selected={collectionDate}
                  onChange={(date) => setCollectionDate(date)}
                  className="form-control"
                  showTimeSelect
                  locale="pt-BR"
                  minDate={new Date()}
                />
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
            <div className="col-lg-4">
              <div className="info">
                <div className="title">Caminhoneiro</div>
                <select
                  className="form-control"
                  value={truckerSelected}
                  onChange={(e) => setTruckerSelected(e.target.value)}
                >
                  <option value="" label=" " />
                  {truckers.map((item, index) => (
                    <option value={item.id} key={String(index)}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errorTrucker && (
                  <span className="error">Campo obrigatorio!</span>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
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
          {transaction && transaction.name_load && (
            <>
              <h4 className="mt-5 mb-4">Tipo de carga</h4>

              <div className="row mt-4">
                <div className="col-lg-6">
                  <div className="box-load">
                    <div className="title">{transaction.name_load}</div>
                    <p>{transaction.description_load}</p>
                    <div className="price">
                      {convertFloatInPrice(transaction.price_load)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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
