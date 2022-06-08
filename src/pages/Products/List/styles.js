import styled from 'styled-components';

export const Wrapper = styled.div`
  table {
    max-width: 100%;
    thead,
    tbody {
      tr {
        display: flex;
        justify-content: space-between;

        td,
        th {
          flex: 1;

          &:is(th) {
            text-align: left;
          }
        }
      }
    }
  }
`;
