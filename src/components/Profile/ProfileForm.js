import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import AuthContext from '../../stores/auth-context.js';
import { useHistory } from 'react-router';
const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newpassRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enterednewPassword = newpassRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD923Uf1MqS46zWNSk4Dj9zkJaOJO7Tnl8', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enterednewPassword,
        returnSecureToken: false,
      })
    }
    )
        .then((res) => res.json())
        .then((data) => history.replace('/'))
        .catch((err) => alert(err))
   
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newpassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
