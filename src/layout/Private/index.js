import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';
import { Container } from './styles';

function Private({ children }) {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
}

export default Private;

Private.propTypes = {
  children: PropTypes.node.isRequired,
};
