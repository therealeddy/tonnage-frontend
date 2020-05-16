import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  input {
    margin: 0;
  }
  span.error {
    color: var(--red);
    font-size: 12px;
  }
  .react-mapbox-ac-menu {
    margin-top: 5px;
  }
  .react-mapbox-ac-suggestion {
    transition: all 0.2s ease;
    &:hover {
      background-color: #dedede;
    }
  }
`;
