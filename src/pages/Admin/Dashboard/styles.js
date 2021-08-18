import styled from 'styled-components';

export const Container = styled.div`
  .box-report {
    width: 100%;
    height: 160px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    .top-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .title-box {
        font-style: normal;
        font-weight: 300;
        font-size: 25px;
        line-height: 26px;
      }
    }
    .value-box {
      width: 100%;
      text-align: center;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 26px;
      color: #373a3c;
    }
  }
`;
