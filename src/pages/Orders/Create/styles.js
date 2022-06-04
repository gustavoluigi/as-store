import { HiPlusCircle } from 'react-icons/hi';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`bg-white p-8 rounded-xl shadow-lg mb-4`}
`;

export const Details = styled.div`
  ${tw` p-8 mb-4`}

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

export const Button = styled.button`
  ${tw`relative transition inline-flex w-full mt-3 mb-5 ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

export const AddIcon = styled(HiPlusCircle)`
  ${tw`h-5 w-5 text-white mr-4`}
`;
