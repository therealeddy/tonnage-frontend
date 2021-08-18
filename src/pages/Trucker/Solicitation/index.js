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
  const [requestsToday, setRequestsToday] = useState([]);
  const [requestsTomorrow, setRequestsTomorrow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [truck, setTruck] = useState('');

  function setPage(number) {
    setCurrentPage(number);
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get('/truck-trucker');

      if (response.data) {
        setTruck(response.data.board);
        return;
      }

      setTruck('Não possui caminhão');
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await api.get('/requests-trucker', {
        params: {
          paged: currentPage,
        },
      });

      setRequestsToday(response.data.today);
      setRequestsTomorrow(response.data.tomorrow);

      setRequests(response.data.rows);
      setTotalPosts(response.data.count);

      setLoading(false);
    }

    getData();
  }, [currentPage]);

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5 d-flex justify-content-between align-items-center">
          <h1>Seus pedidos de coleta</h1>
          <h3>Seu caminhão: {truck}</h3>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {currentPage === 1 && (
              <>
                <h3>Hoje</h3>
                <table className="table table-hover my-5 animated fadeIn">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Endereço de partida</th>
                      <th>Endereço de destino</th>
                      <th>Status</th>
                      <th>Tipo</th>
                      <th>Data de retirada</th>
                      <th label=" " className="th-btn" />
                    </tr>
                  </thead>
                  <tbody>
                    {requestsToday.length > 0 ? (
                      <>
                        {requestsToday.map((item, index) => (
                          <tr key={String(index)}>
                            <th>{item.id}</th>
                            <td>{item.route && item.route.origin_address}</td>
                            <td>
                              {item.route && item.route.destination_address}
                            </td>
                            <td>
                              <Status status={item.status} />
                            </td>
                            <td>
                              {item.transaction && item.transaction.name_load}
                            </td>
                            <td>
                              {item.collection_date
                                ? format(
                                    parseISO(item.collection_date),
                                    'dd/MM/yyyy - HH:mm'
                                  )
                                : 'Não foi agendado'}
                            </td>
                            <td className="d-flex justify-content-end">
                              <Link
                                to={`/request-view/${item.id}`}
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
                <h3>Amanhã</h3>
                <table className="table table-hover my-5 animated fadeIn">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Endereço de partida</th>
                      <th>Endereço de destino</th>
                      <th>Status</th>
                      <th>Tipo</th>
                      <th>Data de retirada</th>
                      <th label=" " className="th-btn" />
                    </tr>
                  </thead>
                  <tbody>
                    {requestsTomorrow.length > 0 ? (
                      <>
                        {requestsTomorrow.map((item, index) => (
                          <tr key={String(index)}>
                            <th>{item.id}</th>
                            <td>{item.route && item.route.origin_address}</td>
                            <td>
                              {item.route && item.route.destination_address}
                            </td>
                            <td>
                              <Status status={item.status} />
                            </td>
                            {item.load && <td>{item.load.name}</td>}
                            <td>
                              {item.collection_date
                                ? format(
                                    parseISO(item.collection_date),
                                    'dd/MM/yyyy - HH:mm'
                                  )
                                : 'Não foi agendado'}
                            </td>
                            <td className="d-flex justify-content-end">
                              <Link
                                to={`/request-view/${item.id}`}
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
                <h3>Outras</h3>
              </>
            )}
            <table className="table table-hover my-5 animated fadeIn">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Endereço de partida</th>
                  <th>Endereço de destino</th>
                  <th>Status</th>
                  <th>Tipo</th>
                  <th>Data de retirada</th>
                  <th label=" " className="th-btn" />
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  <>
                    {requests.map((item, index) => (
                      <tr key={String(index)}>
                        <th>{item.id}</th>
                        <td>{item.route && item.route.origin_address}</td>
                        <td>{item.route && item.route.destination_address}</td>
                        <td>
                          <Status status={item.status} />
                        </td>
                        {item.load && <td>{item.load.name}</td>}
                        <td>
                          {item.collection_date
                            ? format(
                                parseISO(item.collection_date),
                                'dd/MM/yyyy - HH:mm'
                              )
                            : 'Não foi agendado'}
                        </td>
                        <td className="d-flex justify-content-end">
                          <Link
                            to={`/request-view/${item.id}`}
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
