import styled from 'styled-components';

import tw from 'twin.macro';

export const Details = styled.div`
  ${tw`bg-white p-8 rounded-2xl shadow mb-5`}

  >div {
    ${tw`flex mb-4 last:mb-0 border-b border-gray-200 pb-4 last:border-0`}
  }

  p {
    ${tw`font-bold w-64`}
  }
  span {
    ${tw`font-normal`}
  }
`;
