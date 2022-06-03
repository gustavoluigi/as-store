/* eslint-disable no-console */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, LockIcon,
} from './styles';
import isEmailValid from '../../utils/isEmailValid';
import Input from '../Input';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  function handleSubmit(e) {
    e.preventDefault();
    navigate('../dashboard', { replace: true });
    console.log(email, password);
  }
  return (
    <Form action="#" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />

      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>

          <Input
            id="email-address"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            required
            placeholder="Email"
            onChange={handleEmailChange}
            error={getErrorMessagebyFieldName('email')}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            required
            placeholder="Senha"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>

      <div>
        <Button type="submit">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockIcon className="" aria-hidden="true" />
          </span>
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;