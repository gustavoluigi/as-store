import styled from 'styled-components';

// export const Wrapper = styled.div`
//   table {
//     max-width: 100%;
//     thead,
//     tbody {
//       tr {
//         display: flex;
//         justify-content: space-between;

//         td,
//         th {
//           flex: 1;

//           &:is(th) {
//             text-align: left;
//           }
//         }
//       }
//     }
//   }
// `;

import { HiPlusCircle } from 'react-icons/hi';

import tw from 'twin.macro';

export const Button = styled.button`
  ${tw`relative transition inline-flex float-right ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

export const AddIcon = styled(HiPlusCircle)`
  ${tw`h-5 w-5 text-white mr-4`}
`;
