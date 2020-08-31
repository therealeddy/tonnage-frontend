import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { convertFloatInPrice } from '~/utils/convert';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Loads() {
  documentTitle('Tipos de cargas');

  const [loads, setLoads] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/loads');

      setLoads(response.data);
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

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-5">Tipos de carga</h1>
          <Link className="btn btn-success mr-3" to="/loads/create">
            Adicionar
          </Link>
        </div>

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
                  <div className="price">{convertFloatInPrice(item.price)}</div>
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
      </div>
    </Container>
  );
}
