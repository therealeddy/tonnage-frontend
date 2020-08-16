import styled from 'styled-components';

export const Container = styled.div`
  a.card {
    background: #ffffff;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    height: 180px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 23px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.4s ease;
    &:hover {
      background: #0099ff;
      color: #ffffff;
    }
  }
`;
