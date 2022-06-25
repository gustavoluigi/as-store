/* eslint-disable max-len */
/* eslint-disable no-console */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
  Button, Form, LoadingIcon, LockIcon,
} from './styles';
import { isEmailValid } from '../../utils';
import Input from '../Form/Input';
import { Toast } from '../../utils/triggerToast';
import { useAuth } from '../../hooks/useAuth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setErrors((prevState) => prevState.filter((error) => !error.email));
    if (!event.target.value) {
      setErrors((prevState) => [...prevState, { email: 'E-mail é obrigatório' }]);
    } else if (!isEmailValid(event.target.value)) {
      setErrors((prevState) => [...prevState, { email: 'Digite um e-mail válido' }]);
    }
  }

  function getErrorMessagebyFieldName(fieldName) {
    const result = errors.find((error) => error[fieldName]);
    return result ? result[fieldName] : '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }).then(() => setLoading(false));
  };

  return (
    <>
      <Toast />
      <Form action="#" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />

        <div className="rounded-md shadow-sm -space-y-px">
          <Input
            label="E-mail"
            id="email-address"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            required
            onChange={handleEmailChange}
            error={getErrorMessagebyFieldName('email')}
          />

          <Input
            label="Senha"
            id="password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <Button type="submit">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockIcon className="" aria-hidden="true" />
            </span>
            {loading ? <LoadingIcon /> : 'Entrar'}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
