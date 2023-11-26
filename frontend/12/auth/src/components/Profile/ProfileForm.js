import { useRef,useContext } from "react";
import { useNavigate } from "react-router";

import classes from "./ProfileForm.module.css";
import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const navigate = useNavigate()
  const newPasswordRef = useRef();

  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBCDViJqD-eJxXhBGtgzXZkwZ4LAzdmxjI',{
      method:"POST",
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        "Content-Type": 'application/json'
      }
    }).then(res =>{
      navigate('/auth')
    })
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" minLength='6' id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
