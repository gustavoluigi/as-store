import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Container, Wrapper } from './styles';

function Private() {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Outlet>{/* {children} */}</Outlet>
      </Wrapper>
    </Container>
  );
}

export default Private;

// Private.propTypes = {
//   children: PropTypes.node.isRequired,
// };
