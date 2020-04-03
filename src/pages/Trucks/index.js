import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from './styles';
import api from '~/services/api';
import { Loading, Pagination } from '~/components';
import TitlePage from '~/utils/TitlePage';

export default function Trucks() {
  TitlePage('Caminhões');

  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await api.get('/trucks');
    setTrucks(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  async function deleteTruck(id) {
    const response = await api.delete(`/trucks/${id}`);

    if (response.data.success) {
      toast.success(response.data.success);
      getData();
    } else {
      toast.error('Aconteceu algum erro, tente novamente!');
    }
  }

  return (
    <Container>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-5 pb-5">
          <h1>Caminhões</h1>
          <Link to="/create" className="btn btn-success">
            Adicionar
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <table className="table table-hover mb-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Placa</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th label=" " className="th-btn" />
                </tr>
              </thead>
              <tbody>
                {trucks.length > 0 ? (
                  <>
                    {trucks.map((item, index) => (
                      <tr key={String(index)}>
                        <th>{item.id}</th>
                        <td>{item.board}</td>
                        <td>{item.model}</td>
                        <td>{item.brand}</td>
                        <td className="d-flex justify-content-end">
                          <Link
                            to={`/edit/${item.id}`}
                            className="btn btn-primary mr-4"
                          >
                            Editar
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteTruck(item.id)}
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Nenhum caminhão cadastrado!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <Pagination /> */}
          </div>
        )}
      </div>
    </Container>
  );
}
