import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../stores/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value; 
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD923Uf1MqS46zWNSk4Dj9zkJaOJO7Tnl8';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD923Uf1MqS46zWNSk4Dj9zkJaOJO7Tnl8';
    }
    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name:enteredName,
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = 'Authentication Failed';
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            alert(errorMsg);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
        console.log(expirationTime.toISOString());
        authCtx.login(data.idToken,expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin&&
          <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' required ref={nameRef} />
        </div>
        }
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request..</p>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
