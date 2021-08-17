import React, { useState, useEffect, Fragment } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [dummyVal, setDummyVal] = useState(false);

  useEffect(() => {
    const logInValueStoredInLocalStorage = localStorage.getItem("isLoggedIn");
  
    if (logInValueStoredInLocalStorage === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      {/* <button onClick={() => setDummyVal(!dummyVal)} >Click Me</button> */}
    </Fragment>
  );
}

export default App;
