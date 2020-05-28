import React from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaTruck, FaCartPlus } from 'react-icons/fa';
import { IoMdCalendar } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export default function ItemHistory({ history }) {
  const { action, id_solicitation } = history;

  const size = 25;
  const color = '#ffffff';

  switch (action) {
    case 'create':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon secondary">
            <FaCartPlus size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"Criado"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    case 'scheduled':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon info">
            <IoMdCalendar size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"Agendado"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    case 'retired':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon info">
            <TiArrowShuffle size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"Retirado"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    case 'on_course':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon primary">
            <FaTruck size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"A caminho"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    case 'delivered':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon success">
            <MdDone size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"Entregue"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    case 'canceled':
      return (
        <div className="item-single d-flex align-items-center">
          <div className="icon danger">
            <AiFillExclamationCircle size={size} color={color} />
          </div>
          <div>
            Status mudado para <strong>"Cancelado"</strong> da{' '}
            <Link to={`/requests/edit/${id_solicitation}`}>
              Solicitação #{id_solicitation}
            </Link>
          </div>
        </div>
      );
    default:
  }
}

ItemHistory.propTypes = {
  history: PropTypes.object,
};

ItemHistory.defaultProps = {
  history: {},
};
