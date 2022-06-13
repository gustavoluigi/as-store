import styled from 'styled-components';
import tw from 'twin.macro';

export const ChartBox = styled.div`
  ${tw`w-1/4 h-40`}
`;

export const BlockWrapper = styled.div`
  ${tw`flex flex-wrap`}
`;

export const Block = styled.div`
  ${tw`shadow bg-white mb-10 rounded-2xl flex-col flex justify-center items-center px-10 mx-4 h-36 flex-auto first:mx-0 first:flex-grow-0 first:flex-shrink-0 first:flex-basis[100%]`}

  >*:first-child {
    ${tw`text-2xl`}
  }
`;
