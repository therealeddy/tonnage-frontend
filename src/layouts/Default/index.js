import React from 'react';

import PropTypes from 'prop-types';

import { Header } from '~/components';

import { Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <Header />
      <div className="content">{children}</div>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
