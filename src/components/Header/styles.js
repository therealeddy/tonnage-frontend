import styled from 'styled-components';

import { logo } from '~/images';

export const Container = styled.div`
  display: block;

  .header-desktop {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
    .nickname {
      display: flex;
      align-items: center;
      font-weight: bold;
      img {
        border-radius: 100px;
        margin-left: 15px;
        width: 40px;
        height: 40px;
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
  }

  .header-mobile {
    display: block;
    @media (min-width: 992px) {
      display: none;
    }

    .btn-menu {
      height: fit-content;
      width: fit-content;
      border: 0px solid;
      background-color: transparent;
      margin-bottom: -5px;
      margin-right: 10px;
      cursor: pointer;
      outline: none;
    }

    header.top {
      display: flex;
      align-items: center;
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #ffffff;
      padding: 20px;
      z-index: 10;
      div.logo {
        width: 100px;
        height: 20px;
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
      left: -300px;
      top: 65px;
      height: calc(100% - 65px);
      border-right: 1.5px solid #dddddd;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 20px;
      transition: all 0.2s ease-in-out;
      &.active {
        left: 0;
      }
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
  }
`;
