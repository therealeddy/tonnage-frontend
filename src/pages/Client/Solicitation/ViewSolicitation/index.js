import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import Rating from '@material-ui/lab/Rating';
import { Form } from '@unform/web';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

import { Map, InputTheme } from '~/components';
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

  const [status, setStatus] = useState('');
  const [origin, setOrigin] = useState({});
  const [destiny, setDestiny] = useState({});
  const [route, setRoute] = useState([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [transaction, setTransaction] = useState({});
  const [evaluation, setEvaluation] = useState({
    evaluation: null,
    comment: null,
  });

  const [rating, setRating] = useState(1);
  const [modalShow, setModalShow] = useState(false);
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

  const getData = useCallback(async () => {
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

    setTransaction(response.data.transaction);

    setEvaluation(response.data.evaluation);
  }, [params]);

  useEffect(() => {
    getData();
  }, [params, getData]);

  async function handleSubmit(data) {
    setLoading(true);

    const response = await api.post('/evaluation', {
      rating,
      comment: data.comment || null,
      id_solicitation: params.id,
    });

    if (response.data.error) {
      toast.error(response.data.error);
      setLoading(false);
      return;
    }

    toast.success(response.data.success);

    getData();

    setModalShow(false);

    setLoading(false);
  }

  const RenderAvaliacao = () => {
    if (status === 'delivered' || evaluation) {
      return (
        <div className="col-lg-6">
          <h4 className="mt-5 mb-4">Avaliação</h4>
          {!evaluation ? (
            <button
              type="button"
              className="button-rating"
              onClick={() => setModalShow(true)}
            >
              <Rating value={0} size="large" disabled />
            </button>
          ) : (
            <>
              <Rating value={evaluation.evaluation} size="large" disabled />
              <p>{evaluation.comment}</p>
            </>
          )}
        </div>
      );
    }

    return <div />;
  };

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
              <div className="title">Preço pago pela distancia</div>
              {transaction && (
                <div className="description">
                  {convertFloatInPrice(transaction.price_per_kilometer)}
                </div>
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
        <div className="row">
          <div className="col-lg-6">
            {transaction && transaction.name_load && (
              <>
                <h4 className="mt-5 mb-4">Tipo de carga</h4>

                <div className="box-load">
                  <div className="title">{transaction.name_load}</div>
                  <p>{transaction.description_load}</p>
                  <div className="price">
                    {convertFloatInPrice(transaction.price_load)}
                  </div>
                </div>
              </>
            )}
          </div>
          <RenderAvaliacao />
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h3>Deixe sua avaliação do pedido</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <Rating
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setRating(1);
                    return;
                  }
                  setRating(newValue);
                }}
              />
            </div>
            <InputTheme
              id="comment"
              type="text"
              name="comment"
              label="Descrição"
              multline
            />
          </Modal.Body>
          <Modal.Footer>
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalShow(false)}
            >
              Fechar
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

SolicitationAdminEdit.propTypes = {
  match: PropTypes.object,
};

SolicitationAdminEdit.defaultProps = {
  match: {},
};
