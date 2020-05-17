import React from 'react';
import MaskedInput from 'react-text-mask';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Container } from './styles';

export default function InputTheme({
  id,
  type,
  placeholder,
  name,
  label,
  priceMask,
  error,
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
        {!priceMask ? (
          <Input
            name={name}
            type={type}
            className="form-control"
            id={id}
            placeholder={placeholder}
            {...rest}
          />
        ) : (
          <MaskedInput
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            mask={currencyMask}
            className="form-control"
            {...rest}
          />
        )}
        {error && <span>Campo obrigatório!</span>}
      </div>
    </Container>
  );
}

InputTheme.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  priceMask: PropTypes.bool,
  error: PropTypes.bool,
};

InputTheme.defaultProps = {
  id: '',
  type: '',
  placeholder: '',
  name: '',
  label: '',
  priceMask: false,
  error: false,
};
