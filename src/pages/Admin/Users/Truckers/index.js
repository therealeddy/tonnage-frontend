import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading, Pagination } from '~/components';
import api from '~/services/api';
import documentTitle from '~/utils/documentTitle';

import { Container } from './styles';

export default function Users() {
  documentTitle('Caminhoneiros');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDel, setLoadingDel] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getData(paged) {
    setLoading(true);

    const response = await api.get('/users', {
      params: {
        paged,
        role: 2,
      },
    });

    const newUsers = response.data.rows.map((row) => {
      return row.user;
    });

    setUsers(newUsers);

    setTotalPosts(response.data.count);

    setLoading(false);
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  async function deleteTruck(id) {
    setLoadingDel(true);
    const response = await api.delete(`/users/${id}`);

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
          <h1>Caminhoneiros</h1>
          <Link to="/users/trucker/create" className="btn btn-success">
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
                  <th>Nome de usuário</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th label=" " className="th-btn" />
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  <>
                    {users.map((item, index) => (
                      <tr key={String(index)}>
                        <th>{item.id}</th>
                        <td>{item.nickname}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.cpf}</td>
                        <td>{item.tel}</td>
                        <td className="d-flex justify-content-end">
                          <Link
                            to={`/users/trucker/edit/${item.id}`}
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
                      Nenhum gerente cadastrado!
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
