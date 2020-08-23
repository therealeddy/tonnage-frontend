import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  span.error {
    color: var(--red);
    font-size: 12px;
  }
  textarea {
    height: 150px;
    resize: none;
  }
`;
