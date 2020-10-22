import React, { useState, useEffect } from "react";
import "./App.css";
import fire from './fire';
import Login from './components/Login';
import Hero from './components/Hero';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const ClearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const ClearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const HandleLogin = () => {
    ClearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const HandleSignUp = () => {
    ClearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const HandleLogOut = () => {
    fire.auth().signOut();
  }

  const AuthListener = () => {
    fire.auth().onAuthStateChanged(user => {
      ClearInputs();
      if (user) {
        setUser(user);
      }
      else {
        setUser("");
      }
    })
  }

  useEffect(() => {
    AuthListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <Hero HandleLogOut={HandleLogOut} />
      ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={HandleLogin}
            handleSignUp={HandleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}

    </div>
  );
}

export default App;
