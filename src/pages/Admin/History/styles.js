import styled from 'styled-components';

export const Container = styled.div`
  .item-single {
    margin-bottom: 40px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
    a {
      font-weight: bold;
      color: #000000;
      text-decoration: underline;
      transition: all 0.2s linear;
      &:hover {
        opacity: 0.7;
      }
    }
    .icon {
      width: 50px;
      height: 50px;
      background: #dedede;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      &.secondary {
        background: #6c757d;
      }
      &.info {
        background: #17a2b8;
      }
      &.primary {
        background: #007bff;
      }
      &.success {
        background: #28a745;
      }
      &.danger {
        background: #dc3545;
      }
    }
  }

  .area-history {
    position: relative;
    display: block;
    /* width: fit-content;
    margin: 0 auto; */
    &:before {
      content: '';
      position: absolute;
      left: 24px;
      top: 0;
      display: block;
      height: 100%;
      width: 2px;
      background: #dedede;
      z-index: -1;
    }
  }
`;
