import React, { useEffect, useState } from 'react';

import { Loading, Pagination } from '~/components';
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

  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getData(paged) {
    setLoading(true);

    const response = await api.get('histories', {
      params: {
        paged,
      },
    });

    const responseReqs = await api.get('requests-admin', {
      params: {
        findAll: true,
      },
    });

    setHistories(response.data.rows);

    setTotalPosts(response.data.count);

    setRequests(responseReqs.data.rows);

    setLoading(false);
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  async function handleFilter(id) {
    setSelected(id);

    if (id !== 'all') {
      setLoading(true);

      const response = await api.get(`histories/${id}`);

      setTotalPosts(0);

      setHistories(response.data);

      setLoading(false);
      return;
    }
    setCurrentPage(1);
    getData(1);
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
                  <option value="all">Todos</option>
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
            <Pagination
              postsPerPage={5}
              totalPosts={totalPosts}
              setPaged={(number) => setCurrentPage(number)}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </Container>
  );
}
