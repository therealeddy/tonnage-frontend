import React from 'react';
import MaskedInput from 'react-text-mask';

import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Container } from './styles';

export default function InputTheme({
  id,
  name,
  label,
  error,
  value,
  onChange,
  ...rest
}) {
  const defaultMaskOptions = {
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 7,
    allowNegative: false,
    allowLeadingZeroes: false,
  };

  const currencyMask = createNumberMask(defaultMaskOptions);

  return (
    <Container>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <MaskedInput
          id={id}
          name={name}
          type="text"
          className="form-control"
          mask={currencyMask}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {error && <span>{error}</span>}
      </div>
    </Container>
  );
}

InputTheme.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

InputTheme.defaultProps = {
  id: '',
  name: '',
  label: '',
  value: '',
  onChange: () => {},
  error: '',
};
