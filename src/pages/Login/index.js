import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { InputTheme } from '~/components';
import { logo } from '~/images';

import { Container } from './styles';

export default function Login() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
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
                  id="name"
                  name="name"
                  label="Nome de usúario"
                  type="text"
                  className="mb-4"
                />

                <InputTheme
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  className="mb-5"
                />

                <button type="submit" className="btn btn-primary w-100 mb-4">
                  Entrar
                </button>

                <Link to="/register">Cadastre-se</Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
