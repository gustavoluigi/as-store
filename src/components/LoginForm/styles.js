import styled from 'styled-components';
import tw from 'twin.macro';
import { HiLockClosed } from 'react-icons/hi';

export const Form = styled.form`
  ${tw`mt-8 space-y-6`}
`;

export const Button = styled.button`
  ${tw`relative transition w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

export const LockIcon = styled(HiLockClosed)`
  ${tw`h-5 w-5 text-white`}
`;

export const LoadingIcon = styled.span`
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    display: block;
    height: 25px;
    width: 25px;
    animation: spin 0.5s infinite linear;
    border: 3px white solid;
    border-left-color: rgba(55,65,81,1);
    border-radius: 100%;
  }
`;
