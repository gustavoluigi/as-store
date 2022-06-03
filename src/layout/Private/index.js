import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';
import { Container, Wrapper } from './styles';

function Private({ children }) {
  return (
    <Container>
      <Sidebar />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default Private;

Private.propTypes = {
  children: PropTypes.node.isRequired,
};
