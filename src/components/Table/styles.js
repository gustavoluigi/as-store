import styled from 'styled-components';
import tw from 'twin.macro';

export const WrapperTable = styled.div`
  ${tw`-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto`}

  >div {
    ${tw`inline-block min-w-full shadow rounded-lg overflow-hidden`}
  }
`;

export const TableStyled = styled.table`
  ${tw`min-w-full shadow`}
`;
export const Th = styled.th`
  ${tw`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
`;
export const TdWithImage = styled.td`
  ${tw`px-5 py-5 border-b border-gray-200 bg-white text-sm`}

  >div {
    ${tw`flex items-center`}

    .box-img {
      ${tw`flex-shrink-0 w-10 h-10`}

      img {
        ${tw`w-full h-full rounded-full`}
      }
    }

    .box-text {
      ${tw`ml-3`}

      p {
        ${tw`text-gray-900 whitespace-nowrap`}
      }
    }
  }
`;
export const Tr = styled.tr`
  ${tw`bg-white hover:bg-gray-300 transition`}
  td {
    ${tw`px-5 py-5 border-b border-gray-200 text-sm`}

    p {
      ${tw`text-gray-900`}
    }
  }
`;

export const Pagination = styled.div`
  ${tw`px-5 py-5 bg-white border-t flex md:flex-col flex-row items-center justify-between`}

  >span {
    ${tw`md:text-xs text-sm text-gray-900`}

    +div {
      ${tw`inline-flex md:mt-2 mt-0`}
    }
  }

  button {
    ${tw`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l transition`}

    +button {
      ${tw`rounded-r`}
    }
  }
`;
