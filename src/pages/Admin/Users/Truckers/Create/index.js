import React, { useState, useRef, useEffect } from 'react';
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
  documentTitle('Cadastrar Caminhoneiro');

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [truckSelected, setTruckSelected] = useState('');
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/trucks-association');

      setTrucks(response.data);
    }

    getData();
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        nickname: Yup.string().required('Campo obrigatório'),
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string().email().required('Campo obrigatório'),
        cpf: Yup.string().required('Campo obrigatório'),
        tel: Yup.string().required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório'),
        confirmPassword: Yup.string().required('Campo obrigatório'),
      });

      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        toast.error('Senhas não coincidem!');
        return;
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      const response = await api.post('/users', {
        ...data,
        role: 2,
        truckSelected,
      });

      if (response.data.success) {
        toast.success(response.data.success);
        history.push('/users/trucker');
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
          <h1>Adicionar Caminhoneiro</h1>
        </div>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="row mb-5">
            <div className="col-lg-4">
              <InputTheme
                id="nickname"
                name="nickname"
                label="Nome de usuário"
                type="text"
                className="mb-5"
              />
            </div>
            <div className="col-lg-4">
              <InputTheme
                id="name"
                name="name"
                label="Nome"
                type="text"
                className="mb-5"
              />
            </div>
            <div className="col-lg-4">
              <InputTheme
                id="email"
                name="email"
                label="Email"
                type="email"
                className="mb-5"
              />
            </div>
            <div className="col-lg-6">
              <InputTheme
                id="cpf"
                name="cpf"
                label="CPF"
                type="text"
                mask="999.999.999-99"
                className="mb-5"
              />
            </div>
            <div className="col-lg-6">
              <InputTheme
                id="tel"
                name="tel"
                label="Telefone"
                type="tel"
                mask="(99) 99999-9999"
                className="mb-5"
              />
            </div>
            <div className="col-lg-6">
              <InputTheme
                id="password"
                name="password"
                label="Senha"
                type="password"
                className="mb-5"
              />
            </div>
            <div className="col-lg-6">
              <InputTheme
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar senha"
                type="password"
                className="mb-5"
              />
            </div>
            <div className="col-lg-6">
              <div className="title">Caminhão</div>
              <select
                className="form-control"
                value={truckSelected}
                onChange={(e) => setTruckSelected(e.target.value)}
              >
                <option value="" label=" " />
                {trucks.map((truck) => (
                  <option value={truck.id}>{truck.board}</option>
                ))}
              </select>
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
