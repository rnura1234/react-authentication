import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../stores/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggin = authCtx.isLoggin;
  const history = useHistory();
  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/');
  };
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggin && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggin && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
