import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { InputTheme, InputPrice } from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import { convertFloatInPrice, convertPrice } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Edit({ match }) {
  const { params } = match;

  documentTitle('Editar Carga');

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState('');

  const [load, setLoad] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/loads/${params.id}`);

      if (response.data.error) {
        toast.error(response.data.error);
        history.push('/loads');
        return;
      }

      const { name, description, price: priceRes } = response.data;

      setLoad({ name, description });

      setPrice(convertFloatInPrice(priceRes));
    }

    getData();
  }, [params]);

  async function handleSubmit(data) {
    try {
      if (!price) {
        setErrorPrice('Campo obrigatório');
        return;
      }

      setErrorPrice('');

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        description: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      const priceConvert = convertPrice(price);

      const response = await api.put(`/loads/${params.id}`, {
        ...data,
        price: priceConvert,
      });

      if (response.data.success) {
        toast.success(response.data.success);
        history.push('/loads');
        return;
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
        <div className="mb-5 pb-5">
          <h1>Editar Carga #{params.id}</h1>
        </div>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="row mb-5">
            <div className="col-lg-6">
              <InputTheme
                id="name"
                type="text"
                name="name"
                label="Nome"
                value={load.name}
                onChange={(e) => setLoad({ ...load, name: e.target.value })}
              />
            </div>
            <div className="col-lg-6">
              <InputPrice
                id="preco"
                name="preco"
                label="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={errorPrice}
              />
            </div>
            <div className="col-lg-12">
              <InputTheme
                id="description"
                type="text"
                name="description"
                label="Descrição"
                multline
                value={load.description}
                onChange={(e) =>
                  setLoad({ ...load, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
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

Edit.propTypes = {
  match: PropTypes.object,
};

Edit.defaultProps = {
  match: {},
};
