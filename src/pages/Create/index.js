import React, { useState } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Input } from '~/components';
import { Container } from './styles';
import TitlePage from '~/utils/TitlePage';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  board: Yup.string().required('Campo obrigatório'),
  model: Yup.string().required('Campo obrigatório'),
  brand: Yup.string().required('Campo obrigatório')
});

export default function Create() {
  TitlePage('Cadastrar Caminhão');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    const response = await api.post('/trucks', data);

    if (response.data.success) {
      toast.success(response.data.success);
      history.push('/caminhoes');
    }

    toast.error(response.data.error);

    setLoading(false);
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Adicionar Caminhão</h1>
        </div>

        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <Input id="placa" type="text" name="board" label="Placa" />
            </div>
            <div className="col-lg-4">
              <Input id="modelo" type="text" name="model" label="Modelo" />
            </div>
            <div className="col-lg-4">
              <Input id="marca" type="text" name="brand" label="Marca" />
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
