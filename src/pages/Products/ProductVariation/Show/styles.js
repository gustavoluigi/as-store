import { HiPencilAlt } from 'react-icons/hi';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const Button = styled.button`
  ${tw`relative transition inline-flex w-full mt-3 mb-5 ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

export const ButtonFloat = styled.button`

    ${tw`relative transition inline-flex float-right mr-4 ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}

    ${(props) => props.danger
    && css`
      ${tw`bg-red-500 hover:bg-red-600 focus:ring-red-500`}
    `}
`;

export const EditIcon = styled(HiPencilAlt)`
  ${tw`h-5 w-5 text-white`}
`;
