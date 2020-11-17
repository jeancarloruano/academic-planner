import React, { Component } from "react";
import "./App.css";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import AddStudentInfo from "./components/AddStudentInfo";
import CreateUser from './components/CreateUser.jsx'
import AddCourses from "./components/AddCourses";
import AuthenicateUser from "./components/AuthenticateUser";


class App extends Component {

  state = {
    isLoggedIn: false,
    email: ''
  }

  userExists = (bool) => {
    this.setState({ isLoggedIn: bool })
  }

  activeEmail = (userEmail) => {
    this.setState({ email: userEmail });
  }

  render() {
    return (
      <div>
        <>
          {console.log(this.state.isLoggedIn)}
          {this.state.isLoggedIn ? (
            <DashBoard email={this.state.email} />
          ) : (
              <Login callBack={this.userExists} getEmail={this.activeEmail} />
            )}
        </>
      </div >

    );
  }
}

export default App;
