import {
  HiOutlineAdjustments,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
   ${tw`w-72 border-r-2 border-r-gray-200 min-h-screen`}
`;

export const Img = styled.img`
  ${tw`mx-auto my-4 h-20 w-auto`}
`;

export const List = styled.ul`
  ${tw`px-4 border-t-2 border-t-gray-200 mt-10 pt-4`}
`;

export const Item = styled.li`
  a {
    font-size: 15px;
    ${tw`hover:text-gray-800 hover:bg-gray-400 flex items-center p-4 my-1 transition-colors hover:text-white hover:bg-gray-600 duration-200 text-gray-800 rounded-md px-5`}

    span {
      ${tw`mx-4 font-normal`}
    }
  }
`;

export const HiOutlineAdjustmentsStyled = styled(HiOutlineAdjustments)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition`}
`;
export const HiOutlineShoppingBagStyled = styled(HiOutlineShoppingBag)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition`}
`;
export const HiOutlineShoppingCartStyled = styled(HiOutlineShoppingCart)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition`}
`;
export const HiOutlineUserGroupStyled = styled(HiOutlineUserGroup)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition`}
`;
export const HiOutlineDocumentTextStyled = styled(HiOutlineDocumentText)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition`}
`;
