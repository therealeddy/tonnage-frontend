import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { InputTheme, Loading } from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Edit({ match }) {
  const { params } = match;

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [truck, setTruck] = useState({
    board: '',
    model: '',
    brand: '',
  });

  useEffect(() => {
    async function getData() {
      setLoadingPage(true);

      const response = await api.get(`/trucks/${params.id}`);

      if (response.data.error) {
        toast.error(response.data.error);
        history.push('/caminhoes');
      }

      setTruck(response.data);

      setLoadingPage(false);
    }

    getData();
  }, [params]);

  documentTitle(`Editar Caminhão ${params.id}`);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        board: Yup.string().required('Campo obrigatório'),
        model: Yup.string().required('Campo obrigatório'),
        brand: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      const response = await api.put(`/trucks/${params.id}`, data);

      if (response.data.success) {
        toast.success(response.data.success);
        history.push('/trucks');
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
          <h1>Caminhão #{params.id}</h1>
        </div>

        {loadingPage ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className="row mb-5">
              <div className="col-lg-4">
                <InputTheme
                  id="placa"
                  type="text"
                  name="board"
                  label="Placa"
                  value={truck.board}
                  onChange={(e) =>
                    setTruck({ ...truck, board: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-4">
                <InputTheme
                  id="modelo"
                  type="text"
                  name="model"
                  label="Modelo"
                  value={truck.model}
                  onChange={(e) =>
                    setTruck({ ...truck, model: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-4">
                <InputTheme
                  id="marca"
                  type="text"
                  name="brand"
                  label="Marca"
                  value={truck.brand}
                  onChange={(e) =>
                    setTruck({ ...truck, brand: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
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
                  'Salvar'
                )}
              </button>
            </div>
          </Form>
        )}
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
