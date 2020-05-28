import React, { useEffect, useState } from 'react';

import { Loading } from '~/components';
import api from '~/services/api';
import documentTitle from '~/utils/documentTitle';

import ItemHistory from './ItemHistory';
import { Container } from './styles';

export default function History() {
  documentTitle('Historico');

  const [requests, setRequests] = useState([]);
  const [histories, setHistories] = useState([]);
  const [selected, setSelected] = useState('disabled');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const response = await api.get('histories');
      const responseReqs = await api.get('/requests');

      setHistories(response.data);

      setRequests(responseReqs.data);

      setLoading(false);
    }

    getData();
  }, []);

  async function handleFilter(id) {
    setSelected(id);

    setLoading(true);

    const response = await api.get(`histories/${id}`);

    setHistories(response.data);

    setLoading(false);
  }

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <h1 className="mb-5">Historico</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row my-5">
              <div className="col-lg-4">
                Pedido de coleta
                <select
                  value={selected}
                  className="form-control"
                  onChange={(e) => handleFilter(e.target.value)}
                >
                  <option value="disabled" disabled>
                    Pedido de coleta
                  </option>
                  {requests.map((item, index) => (
                    <option value={item.id} key={String(index)}>
                      Solicitação #{item.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="area-history">
              {histories.map((item, index) => (
                <ItemHistory history={item} key={String(index)} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
