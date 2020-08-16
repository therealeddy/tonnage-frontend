import styled from 'styled-components';

import { background } from '~/images';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding: 50px 0;
`;
