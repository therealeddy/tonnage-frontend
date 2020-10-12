import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { InputTheme, Loading } from '~/components';
import { card } from '~/images';
import api from '~/services/api';

import { Container } from './styles';

function Configuration() {
  const [modalShow, setModalShow] = useState(false);

  const [numberCard, setNumberCard] = useState('');
  const [hasCard, setHasCard] = useState(false);

  const [loading, setLoading] = useState(true);

  const formRef = useRef(null);

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

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        numberCard: Yup.string()
          .min(19, 'Numero do cartão invalido')
          .required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/cards', data);

      if (!response.data) {
        toast.error('Ocorreu um erro inesperado! Tente novamente!');
        setModalShow(false);
        return;
      }

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      const { number } = response.data;

      setNumberCard(number.split(' ')[3]);

      setHasCard(true);

      setModalShow(false);

      toast.success('Cadastrado com sucesso!');
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

  async function handleDelete() {
    const response = await api.delete('/cards');

    if (response.data.success) {
      toast.success(response.data.success);
      setHasCard(false);
      setNumberCard('');
      return;
    }

    toast.success('Ocorreu um erro inesperado! Tente novamente!');
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Configurações</h1>
        </div>
        <h2 className="mb-4">Cartão de crédito</h2>

        {loading ? (
          <Loading />
        ) : (
          <>
            {!hasCard ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setModalShow(true)}
              >
                Adicionar
              </button>
            ) : (
              <div className="d-flex align-items-center">
                <img src={card} alt="card" className="mr-3" />
                <b>**** **** **** {numberCard}</b>
                <button
                  type="button"
                  className="btn btn-danger ml-3"
                  onClick={handleDelete}
                >
                  Deletar
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Modal.Header closeButton>
            <h2>Adicionar cartão</h2>
          </Modal.Header>
          <Modal.Body>
            <InputTheme
              id="numberCard"
              name="numberCard"
              label="Numero do cartão"
              type="text"
              mask="9999 9999 9999 9999"
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalShow(false)}
            >
              Fechar
            </button>
            <button type="submit" className="btn btn-success">
              Confirmar
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Configuration;
