import styled from 'styled-components';

export const Container = styled.div`
  .label-map {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 23px;
    color: #0099ff;
    margin: 0;
  }
  .desc-map {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
    margin-bottom: 30px;
    &.strong {
      font-weight: bold;
      font-size: 24px;
      margin: 0;
    }
  }
  .info {
    .title {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 23px;
      color: #0099ff;
    }
    .description {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 25px;
      line-height: 26px;
      color: #373a3c;
    }
  }
`;
