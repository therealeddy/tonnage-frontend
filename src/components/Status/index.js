import React from 'react';

import PropTypes from 'prop-types';

export default function Status({ status }) {
  switch (status) {
    case 'create':
      return <span className="badge badge-secondary">Criado</span>;
    case 'scheduled':
      return <span className="badge badge-info">Agendado</span>;
    case 'retired':
      return <span className="badge badge-info">Retirado</span>;
    case 'on_course':
      return <span className="badge badge-primary">A caminho</span>;
    case 'delivered':
      return <span className="badge badge-success">Entregue</span>;
    case 'canceled':
      return <span className="badge badge-danger">Cancelado</span>;
    default:
      return <span className="badge badge-secondary">Nao identificado</span>;
  }
}

Status.propTypes = {
  status: PropTypes.string,
};

Status.defaultProps = {
  status: '',
};
