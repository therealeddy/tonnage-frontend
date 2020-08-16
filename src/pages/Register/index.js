import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { InputTheme } from '~/components';
import { logo } from '~/images';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function Register() {
  const formRef = useRef(null);

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

      const response = await api.post('/users', data);

      if (response.data.success) {
        toast.success(response.data.success);
        history.push('/');
        return;
      }

      toast.error(response.data.error);
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
    <Container>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="box-form">
              <img src={logo} alt="logo" />
              <Form onSubmit={handleSubmit} ref={formRef}>
                <InputTheme
                  id="nickname"
                  name="nickname"
                  label="Nome de usúario"
                  type="text"
                  className="mb-4"
                />
                <InputTheme
                  id="name"
                  name="name"
                  label="Nome"
                  type="text"
                  className="mb-4"
                />

                <InputTheme
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  className="mb-4"
                />

                <InputTheme
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  type="text"
                  mask="999.999.999-99"
                  className="mb-4"
                />

                <InputTheme
                  id="tel"
                  name="tel"
                  label="Telefone"
                  type="tel"
                  mask="(99) 99999-9999"
                  className="mb-4"
                />

                <InputTheme
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  className="mb-4"
                />

                <InputTheme
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirmar senha"
                  type="password"
                  className="mb-5"
                />

                <button type="submit" className="btn btn-primary w-100 mb-4">
                  Cadastrar-se
                </button>
                <Link to="/">Voltar</Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
