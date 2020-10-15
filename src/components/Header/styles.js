import styled from 'styled-components';

import { logo } from '~/images';

export const Container = styled.div`
  display: block;

  .nickname {
    display: flex;
    align-items: center;
    font-weight: bold;
    img {
      border-radius: 100px;
      margin-left: 15px;
    }
  }

  header.top {
    display: flex;
    align-items: center;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 90px;
    background-color: #ffffff;
    padding: 15px 40px;
    z-index: 10;
    justify-content: space-between;
    div.logo {
      width: 180px;
      height: 30px;
      background-image: url(${logo});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  header.left {
    z-index: 5;
    background-color: #ffffff;
    position: fixed;
    width: 300px;
    left: 0;
    top: 90px;
    height: calc(100% - 90px);
    border-right: 1.5px solid #dddddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
    ul {
      li {
        a {
          display: flex;
          width: 100%;
          height: 60px;
          align-items: center;
          padding: 10px 20px;
          text-decoration: none;
          border-bottom: 1.5px solid #dddddd;
          transition: all 0.4s ease;
          color: #000000;
          &.active,
          &:hover {
            background-color: #0275d8;
            color: #ffffff;
            font-weight: bold;
          }
        }
      }
    }
    button.exit {
      padding-left: 20px;
      color: #0275d8;
      background-color: transparent;
      border: 0px solid;
      text-align: left;
      cursor: pointer;
      display: block;
      width: fit-content;
      outline: none;
      text-decoration: underline;
    }
  }
`;
