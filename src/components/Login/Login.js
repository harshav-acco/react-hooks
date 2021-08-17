import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_CHANGED") {
    return {
      value: action.value,
      isValid: action.value.includes('@')
    }
  }
  return { value: "", isValid: null };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailActions] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });
  
  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     console.log("inside timeout function");
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     //we can use this return function as a cleanup function to clean intervals or temp variables
  //     console.log("CLEAN UP ");
  //     clearTimeout(interval);
  //   }
  // }, [enteredEmail, enteredPassword]);

  // useEffect(() => {
  //   console.log("second use effect");
  // }, [dummyVal]);//demonstrating use effect on prop changes

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmailActions({
      type: "EMAIL_CHANGED",
      value: event.target.value,
    });

    setFormIsValid(
      enteredPassword.trim().length > 6 && event.target.value.includes('@')
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
