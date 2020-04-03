import React, { useEffect, useState } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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

export default function Edit({ match }) {
  const { params } = match;

  const [truck, setTruck] = useState({
    board: '',
    model: '',
    brand: ''
  });

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/trucks/${params.id}`);

      if (response.data.error) {
        toast.error(response.data.error);
        history.push('/caminhoes');
      }

      setTruck(response.data);
    }

    getData();
  }, []);

  TitlePage(`Editar Caminhão ${params.id}`);

  async function handleSubmit(data) {
    const response = await api.put(`/trucks/${params.id}`, data);

    if (response.data.success) {
      toast.success(response.data.success);
      history.push('/caminhoes');
    }

    toast.error(response.data.error);
  }

  return (
    <Container>
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Caminhão #{params.id}</h1>
        </div>

        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <Input
                id="placa"
                type="text"
                name="board"
                label="Placa"
                value={truck.board}
                onChange={e => setTruck({ ...truck, board: e.target.value })}
              />
            </div>
            <div className="col-lg-4">
              <Input
                id="modelo"
                type="text"
                name="model"
                label="Modelo"
                value={truck.model}
                onChange={e => setTruck({ ...truck, model: e.target.value })}
              />
            </div>
            <div className="col-lg-4">
              <Input
                id="marca"
                type="text"
                name="brand"
                label="Marca"
                value={truck.brand}
                onChange={e => setTruck({ ...truck, brand: e.target.value })}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
