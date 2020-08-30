import { createGlobalStyle, keyframes } from 'styled-components';

import './bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    list-style-type: none;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #ffffff;
    -webkit-font-smoothing: antialiased !important;
  }

  .content {
    display: block;
    width: 100%;
    height: 100%;
    padding: 150px 0 30px 300px;
  }

  .z-depth-1 {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }

  .z-depth-2 {
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
  }

  .z-depth-3 {
    box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
  }

  .z-depth-4 {
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -7px rgba(0,0,0,0.2);
  }

  .z-depth-5 {
    box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
  }

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 35px;
    line-height: 26px;
    margin: 0;
  }

  .animated {
    animation-duration: 0.5s;
    animation-delay: 0s;
  }

  .th-btn {
    width: 190px;
  }

  .btn-loading {
    min-width: 100px;
    pointer-events: none;
    user-select: none;
    svg {
      animation: ${rotate} 0.4s linear infinite;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  textarea {
    height: 150px;
    resize: none !important;
  }
`;
