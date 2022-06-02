import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Public Sans', sans-serif !important;
  }
  body {
    background-color: ${(props) => props.theme.backgroundColor};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700 !important;
  }
`;
