import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import CreateUser from './components/CreateUser.jsx'
import AddStudentInfo from "./components/AddStudentInfo";
import AddCourses from "./components/AddCourses";
import AuthenicateUser from "./components/AuthenticateUser";

let isLoggedIn = true;

class App extends Component {


  render() {
    return (
      <div>
        <AuthenicateUser />
        <>
          {isLoggedIn ? (
            <DashBoard />
          ) : (
              <Login />
            )}
        </>
      </div >

    );
  }
}

export default App;
