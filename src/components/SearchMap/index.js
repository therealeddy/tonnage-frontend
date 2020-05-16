import React from 'react';
import MapboxAutocomplete from 'react-mapbox-autocomplete';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchMap({ id, label, error, className, ...rest }) {
  const token =
    'pk.eyJ1IjoidGhlcmVhbGVkZHkiLCJhIjoiY2thYTc2ajJmMTB6dTJydWxxZnMxbGZ3biJ9.TjssecTzcJtB-SVliMf2Ig';

  return (
    <Container className={className}>
      <label htmlFor={id}>{label}</label>
      <MapboxAutocomplete
        id={id}
        inputClass="form-control"
        country="br"
        publicKey={token}
        resetSearch={false}
        {...rest}
      />
      {error && <span className="error">Campo obrigatorio</span>}
    </Container>
  );
}

SearchMap.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
};

SearchMap.defaultProps = {
  id: '',
  label: '',
  error: false,
  className: '',
};
