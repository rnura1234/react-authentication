import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './stores/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggin && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggin && (
          <Route path='/profile'>
            <UserProfile />
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
