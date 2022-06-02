import styled from 'styled-components';
import tw from 'twin.macro';
import { HiLockClosed } from 'react-icons/hi';

export const Form = styled.form`
  ${tw`mt-8 space-y-6`}
`;

export const Input = styled.input`
  ${tw`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md h-12 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
`;

export const Button = styled.button`
  ${tw`relative transition w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

export const LockIcon = styled(HiLockClosed)`
  ${tw`h-5 w-5 text-white`}
`;
