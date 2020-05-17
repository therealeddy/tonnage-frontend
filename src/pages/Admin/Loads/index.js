import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';

import { Input } from '~/components';
import api from '~/services/api';
import { convertPrice, convertFloatInPrice } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function PageNotFound() {
  documentTitle('Tipos de cargas');

  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    if (!price) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    const response = await api.put('/configurations', {
      price_per_kilometer: convertPrice(price),
    });

    const { success } = response.data;

    if (success) {
      toast.success(success);
    } else {
      toast.error('Algo deu errado! Tente novamente!');
    }

    setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get('/configurations');

      const { price_per_kilometer } = response.data;

      setPrice(convertFloatInPrice(price_per_kilometer));
    }

    getData();
  }, []);

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Preço por Quilômetro </h1>
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

          <Input
            id="price"
            name="price"
            priceMask
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={error}
          />
        </Form>
      </div>
    </Container>
  );
}
