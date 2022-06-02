import { Container, Img, Wrapper } from './styles';
import asLogo from '../../../assets/images/as-logo.png';
import LoginForm from '../../../components/LoginForm';

function Login() {
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
