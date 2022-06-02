import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
`;

export const Wrapper = styled.div`
  ${tw`max-w-md w-full space-y-8`}
`;

export const Title = styled.h2`
  ${tw`mt-6 text-center text-3xl font-extrabold text-gray-900`}
`;

export const Img = styled.img`
  ${tw`mx-auto h-32 w-auto`}
`;
