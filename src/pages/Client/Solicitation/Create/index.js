import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { InputTheme, SearchMap, Map } from '~/components';
import token from '~/config/tokenMapbox';
import { card } from '~/images';
import api from '~/services/api';
import history from '~/services/history';
import {
  convertDistance,
  convertTime,
  convertFloatInPrice,
  convertPrice,
} from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';
import { isEmpty } from '~/utils/object';

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
  const [description, setDescription] = useState('');

  const [itemBuy, setItemBuy] = useState({});

  const [modalShow, setModalShow] = useState(false);

  const [errorOrigin, setErrorOrigin] = useState(false);
  const [errorDestiny, setErrorDestiny] = useState(false);

  const [numberCard, setNumberCard] = useState('');
  const [hasCard, setHasCard] = useState(false);

  const formRef = useRef(null);

  const [loads, setLoads] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/loads');

      setLoads(response.data);
    }

    getData();
  }, []);

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
    async function getData() {
      const response = await api.get('/cards');

      if (response.data.error) {
        setLoading(false);
        return;
      }

      const { number } = response.data;

      setNumberCard(number.split(' ')[3]);

      setHasCard(true);

      setLoading(false);
    }

    getData();
  }, []);

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

  function handleBuy(item) {
    if (!origin.result || !destiny.result) {
      if (!origin.result) {
        setErrorOrigin(true);
      }
      if (!destiny.result) {
        setErrorDestiny(true);
      }
      return;
    }

    setItemBuy(item);

    setErrorOrigin(false);
    setErrorDestiny(false);
    setModalShow(true);
  }

  async function handleSubmit(dataForm) {
    try {
      formRef.current.setErrors({});

      let schema = {};

      if (hasCard) {
        schema = Yup.object().shape({
          holderName: Yup.string()
            .min(14, 'CPF invalido')
            .required('Campo obrigatório'),
          cod: Yup.string()
            .min(3, 'Codigo invalido')
            .required('Campo obrigatório'),
          dateValidity: Yup.string()
            .min(5, 'Data invalida')
            .required('Campo obrigatório'),
        });
      } else {
        schema = Yup.object().shape({
          numberCard: Yup.string()
            .min(19, 'Numero do cartão invalido')
            .required('Campo obrigatório'),
          holderName: Yup.string()
            .min(14, 'CPF invalido')
            .required('Campo obrigatório'),
          cod: Yup.string()
            .min(3, 'Codigo invalido')
            .required('Campo obrigatório'),
          dateValidity: Yup.string()
            .min(5, 'Data invalida')
            .required('Campo obrigatório'),
        });
      }

      await schema.validate(dataForm, {
        abortEarly: false,
      });

      setLoading(true);

      const { id: id_load } = itemBuy;

      const data = {
        id_load,
        price_per_kilometer: convertPrice(price),
        description,
        route: {
          destination_address: origin.result,
          destination_latitude: origin.lat,
          destination_longitude: origin.lng,
          origin_address: destiny.result,
          origin_latitude: destiny.lat,
          origin_longitude: destiny.lng,
        },
        card: {
          ...dataForm,
          hasCard,
        },
      };

      const response = await api.post('/requests', data);

      if (response.data.success) {
        toast.success(response.data.success);
        history.push('/requests');
      }

      toast.error(response.data.error);

      setLoading(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
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
        <div className="row mb-5">
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
          <div className="col-lg-12">
            <div className="form-group mt-5">
              <label htmlFor="description">Descrição do pedido</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loads.length > 0 ? (
          <>
            <h4>Tipo Entrega</h4>

            <div className="row mt-5">
              {loads.map((item, index) => (
                <div className="col-lg-4" key={String(index)}>
                  <div className="box-load">
                    <div className="title">{item.name}</div>
                    <p>{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="price">
                        {convertFloatInPrice(item.price)}
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleBuy(item)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h5>
            Ainda não estão disponiveis os tipos de cargas, tente novamente mais
            tarde!
          </h5>
        )}

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Modal.Header closeButton>
              <h3>Pagamento</h3>
            </Modal.Header>
            <Modal.Body>
              {price && (
                <div className="d-flex justify-content-between align-items-center py-4">
                  <h4>{itemBuy.name}</h4>
                  <h4>
                    Total:{' '}
                    {convertFloatInPrice(itemBuy.price + convertPrice(price))}
                  </h4>
                </div>
              )}
              <div className="row">
                <div className="col-lg-6">
                  {!hasCard ? (
                    <InputTheme
                      id="numberCard"
                      name="numberCard"
                      label="Numero do cartão"
                      type="text"
                      mask="9999 9999 9999 9999"
                    />
                  ) : (
                    <div className="d-flex align-items-center">
                      <img src={card} alt="card" className="mr-3" />
                      <b>**** **** **** {numberCard}</b>
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  <InputTheme
                    id="holderName"
                    name="holderName"
                    label="Nome do titular"
                    type="text"
                  />
                </div>
                <div className="col-lg-6">
                  <InputTheme
                    id="dateValidity"
                    name="dateValidity"
                    label="Data de validade"
                    type="text"
                    mask="99/99"
                  />
                </div>
                <div className="col-lg-6">
                  <InputTheme
                    id="cod"
                    name="cod"
                    label="Codigo de segurança"
                    type="text"
                    mask="999"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className={`btn btn-success ${
                  loading && 'disabled btn-loading'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters color="#fff" size={14} />
                ) : (
                  'Confirmar'
                )}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </Container>
  );
}
