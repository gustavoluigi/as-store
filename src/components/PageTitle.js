import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

const PageTitleStyled = styled.h2`
  ${tw`text-2xl mb-6`}
`;

function PageTitle({ children }) {
  return <PageTitleStyled>{children}</PageTitleStyled>;
}

export default PageTitle;

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
