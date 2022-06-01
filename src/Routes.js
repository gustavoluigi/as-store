import { Switch, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  );
}
