import { Navigate } from 'react-router-dom';
import { Container, Img, Wrapper } from './styles';
import asLogo from '../../../assets/images/as-logo.png';
import LoginForm from '../../../components/LoginForm';
import { useAuth } from '../../../hooks/useAuth';

function Login() {
  const { user, userStore } = useAuth();
  if (user && userStore.user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Container>
      <Wrapper>
        <Img src={asLogo} alt="Adriana Sotto" />
        <LoginForm />
      </Wrapper>
    </Container>
  );
}

export default Login;
