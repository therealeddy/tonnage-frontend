import React from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Input } from '~/components';
import { Container } from './styles';

const schema = Yup.object().shape({
  placa: Yup.string().required('Campo obrigatório'),
  modelo: Yup.string().required('Campo obrigatório'),
  marca: Yup.string().required('Campo obrigatório')
});

export default function Edit({ match }) {
  function handleSubmit(data) {}

  const { params } = match;

  return (
    <Container>
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Caminhão #{params.id}</h1>
        </div>

        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <Input id="placa" type="text" name="placa" label="Placa" />
            </div>
            <div className="col-lg-4">
              <Input id="modelo" type="text" name="modelo" label="Modelo" />
            </div>
            <div className="col-lg-4">
              <Input id="marca" type="text" name="marca" label="Marca" />
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
