/* eslint-disable consistent-return */
import {
  HiOutlineAdjustments,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlinePresentationChartLine,
  HiShoppingBag,
  HiMenuAlt1,
  HiLogout,
} from 'react-icons/hi';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`w-full md:w-1/5 border-r-2 border-r-gray-100 bg-white md:min-h-screen dark:bg-gray-900`}
`;

export const Img = styled.img`
  ${tw`mx-auto my-4 h-20 w-auto`}
`;

export const List = styled.ul`
  ${tw`px-4 border-t-2 border-t-gray-100 mt-10 pt-4`}
`;

export const MobileNav = styled.div`
  ${tw`h-full overflow-hidden transition-all`}

  ${({ isMobile, show }) => {
    if (isMobile) {
      return show ? tw`h-full` : tw`h-0`;
    }
  }};
`;

export const Item = styled.li`
  a {
    font-size: 15px;
    ${tw`hover:text-gray-800 hover:bg-gray-400 flex items-center p-4 my-1 transition-colors hover:text-white hover:bg-gray-600 duration-200 text-gray-800 rounded-md px-5 dark:text-white`}

    span {
      ${tw`mx-4 font-normal`}
    }
  }

  &:last-child {
    font-size: 15px;
    ${tw`hover:text-gray-800 hover:bg-gray-400 cursor-pointer flex items-center p-4 my-1 transition-colors hover:text-white hover:bg-gray-600 duration-200 text-gray-800 rounded-md px-5 dark:text-white`}

    span {
      ${tw`mx-4 font-normal`}
    }
  }
`;

export const HiOutlineAdjustmentsStyled = styled(HiOutlineAdjustments)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiOutlineShoppingBagStyled = styled(HiOutlineShoppingBag)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiOutlineShoppingCartStyled = styled(HiOutlineShoppingCart)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiOutlineUserGroupStyled = styled(HiOutlineUserGroup)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiOutlineDocumentTextStyled = styled(HiOutlineDocumentText)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiOutlinePresentationChartLineStyled = styled(HiOutlinePresentationChartLine)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiShoppingBagStyled = styled(HiShoppingBag)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiMenuAlt1Styled = styled(HiMenuAlt1)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
export const HiLogoutStyled = styled(HiLogout)`
  ${tw`h-5 w-5 text-black group-hover:text-white transition dark:text-white`}
`;
