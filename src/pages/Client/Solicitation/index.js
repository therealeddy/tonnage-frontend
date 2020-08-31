import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { parseISO, format } from 'date-fns';

import { Loading, Status, Pagination } from '~/components';
import api from '~/services/api';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Trucks() {
  documentTitle('Solicitações');

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('');

  function setPage(number) {
    setCurrentPage(number);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await api.get('/requests', {
        params: {
          paged: currentPage,
          status,
        },
      });

      setRequests(response.data.rows);

      setTotalPosts(response.data.count);

      setLoading(false);
    }

    getData();
  }, [currentPage, status]);

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Solicitações</h1>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              <div className="col-lg-4">
                <div className="title">Status</div>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" label=" " />
                  <option value="create">Criado</option>
                  <option value="scheduled">Agendado</option>
                  <option value="retired">Retirado</option>
                  <option value="on_course">A caminho</option>
                  <option value="delivered">Entregue</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </div>
            </div>
            <table className="table table-hover my-5 animated fadeIn">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Endereço de partida</th>
                  <th>Endereço de destino</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Data de retirada</th>
                  <th>Criado em</th>
                  <th label=" " className="th-btn" />
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  <>
                    {requests.map((item, index) => (
                      <tr key={String(index)}>
                        <th>{item.id}</th>
                        <td>{item.route.origin_address}</td>
                        <td>{item.route.destination_address}</td>
                        {item.load && <td>{item.load.name}</td>}
                        <td>
                          <Status status={item.status} />
                        </td>
                        <td>
                          {item.collection_date
                            ? format(
                                parseISO(item.collection_date),
                                'dd/MM/yyyy - HH:mm'
                              )
                            : 'Não foi agendado'}
                        </td>
                        <td>
                          {format(
                            parseISO(item.created_at),
                            'dd/MM/yyyy - HH:mm'
                          )}
                        </td>
                        <td className="d-flex justify-content-end">
                          <Link
                            to={`/requests/view/${item.id}`}
                            className="btn btn-primary"
                          >
                            Visualizar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Nenhuma solicitação!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              postsPerPage={5}
              totalPosts={totalPosts}
              setPaged={(number) => setPage(number)}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </Container>
  );
}
