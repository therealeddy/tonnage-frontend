import React, { useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputTheme({
  id,
  name,
  label,
  className,
  type,
  mask,
  multline,
  ...rest
}) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container className={className}>
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        {!mask ? (
          <>
            {!multline ? (
              <input
                id={id}
                type={type}
                className="form-control"
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
              />
            ) : (
              <textarea
                id={id}
                type={type}
                className="form-control"
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
              />
            )}
          </>
        ) : (
          <InputMask mask={mask} maskChar={null} {...rest}>
            {(inputProps) => (
              <input
                id={id}
                type={type}
                className="form-control"
                ref={inputRef}
                defaultValue={defaultValue}
                {...inputProps}
              />
            )}
          </InputMask>
        )}
        {error && <span className="error">{error}</span>}
      </div>
    </Container>
  );
}

InputTheme.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.string,
  multline: PropTypes.bool,
};

InputTheme.defaultProps = {
  id: '',
  name: '',
  label: '',
  className: '',
  type: '',
  mask: '',
  multline: false,
};
