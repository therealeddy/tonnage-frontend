import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading, Pagination } from '~/components';
import api from '~/services/api';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Trucks() {
  documentTitle('Caminhões');

  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDel, setLoadingDel] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getData(paged) {
    setLoading(true);
    const response = await api.get('/trucks', {
      params: {
        paged,
      },
    });

    setTrucks(response.data.rows);

    setTotalPosts(response.data.count);

    setLoading(false);
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  async function deleteTruck(id) {
    setLoadingDel(true);
    const response = await api.delete(`/trucks/${id}`);

    if (response.data.success) {
      toast.success(response.data.success);
      getData();
    } else {
      toast.error('Aconteceu algum erro, tente novamente!');
    }

    setLoadingDel(false);
    setCurrentPage(1);
  }

  function setPage(number) {
    setCurrentPage(number);
  }

  return (
    <Container className="animated fadeIn">
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
            <table className="table table-hover mb-4 animated fadeIn">
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
                            type="submit"
                            className={`btn btn-danger ${
                              loadingDel && 'disabled btn-loading'
                            }`}
                            disabled={loadingDel}
                            onClick={() => deleteTruck(item.id)}
                          >
                            {loadingDel ? (
                              <AiOutlineLoading3Quarters
                                color="#fff"
                                size={14}
                              />
                            ) : (
                              'Deletar'
                            )}
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
            <Pagination
              postsPerPage={5}
              totalPosts={totalPosts}
              setPaged={(number) => setPage(number)}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
