import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';

import { InputPrice } from '~/components';
import api from '~/services/api';
import { convertFloatInPrice, convertPrice } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Loads() {
  documentTitle('Tipos de cargas');

  const [loads, setLoads] = useState([]);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/loads');

      setLoads(response.data);

      const responseConfig = await api.get('/configurations');

      const { price_per_kilometer } = responseConfig.data;

      setPrice(convertFloatInPrice(price_per_kilometer));
    }

    getData();
  }, []);

  async function handleDelete(id) {
    const response = await api.delete(`/loads/${id}`);

    if (response.data.error) {
      toast.error(response.data.error);
      return;
    }

    const newLoad = loads.filter((item) => item.id !== id);

    setLoads(newLoad);

    toast.success(response.data.success);
  }

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

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-5">Tipos de carga</h1>
          <Link className="btn btn-success" to="/loads/create">
            Adicionar
          </Link>
        </div>

        {loads.length > 0 ? (
          <div className="row">
            {loads.map((item, index) => (
              <div className="col-lg-4" key={String(index)}>
                <div className="box-load">
                  <div className="title">{item.name}</div>
                  <p>{item.description}</p>
                  {/* <div className="bene">Beneficios</div>
                <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
              </ul> */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="price">
                      {convertFloatInPrice(item.price)}
                    </div>
                    <div className="d-flex">
                      <Link
                        className="btn btn-primary mr-3"
                        to={`/loads/edit/${item.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-5">Não existe tipos de cargas cadastrados!</p>
        )}

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

          <InputPrice
            id="preco"
            name="preco"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={error}
          />
        </Form>
      </div>
    </Container>
  );
}
