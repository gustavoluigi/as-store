import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Container, Wrapper } from './styles';
import { useAuth } from '../../hooks/useAuth';

function Private() {
  const { user, userStore } = useAuth();
  if (!user && !userStore.user) {
    return <Navigate to="/" />;
  }
  return (
    <Container role="contentinfo">
      <Sidebar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
}

export default Private;
