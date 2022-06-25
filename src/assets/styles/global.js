import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Public Sans', sans-serif;

  }
  body {
    background-color: ${(props) => props.theme.backgroundColor};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700 !important;
    font-family: 'Sora', sans-serif;
  }

  * {
  scrollbar-width: thin;
  scrollbar-color: blue rgba(75,85,99,.2);
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: rgba(75,85,99,.2);
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(75,85,99,.4);
  border-radius: 20px;
  border: 3px solid rgba(75,85,99,.2);
}
`;
