import React, { useState, useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { InputTheme } from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Create() {
  documentTitle('Cadastrar Caminhão');

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

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

      const response = await api.post('/trucks', data);

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
          <h1>Adicionar Caminhão</h1>
        </div>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <InputTheme id="placa" type="text" name="board" label="Placa" />
            </div>
            <div className="col-lg-4">
              <InputTheme id="modelo" type="text" name="model" label="Modelo" />
            </div>
            <div className="col-lg-4">
              <InputTheme id="marca" type="text" name="brand" label="Marca" />
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
                'Cadastrar'
              )}
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
