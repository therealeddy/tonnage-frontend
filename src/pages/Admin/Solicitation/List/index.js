import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loading, Status } from '~/components';
import api from '~/services/api';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Trucks() {
  documentTitle('Solicitações');

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const response = await api.get('/requests');

      setRequests(response.data);

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <Container className="animated fadeIn">
      <div className="container">
        <div className="mb-5 pb-5">
          <h1>Solicitações</h1>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <table className="table table-hover mb-4 animated fadeIn">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Status</th>
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
                        <td>
                          <Status status={item.status} />
                        </td>
                        <td className="d-flex justify-content-end">
                          <Link
                            to={`/requests/edit/${item.id}`}
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
                    <td colSpan="5" className="text-center">
                      Nenhuma solicitação!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}
