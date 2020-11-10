import React, { Component } from "react";
import "./App.css";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
/*import CreateUser from './components/CreateUser.jsx'
import AddStudentInfo from "./components/AddStudentInfo";
import AddCourses from "./components/AddCourses";
import AuthenicateUser from "./components/AuthenticateUser";*/


class App extends Component {

  state = {
    isLoggedIn: false
  }

  userExists = (bool) => {
    this.setState({ isLoggedIn: bool })
  }


  render() {
    return (
      <div>
        <>
          {console.log(this.state.isLoggedIn)}
          {this.state.isLoggedIn ? (
            <DashBoard />
          ) : (
              <Login callBack={this.userExists} />
            )}
        </>
      </div >

    );
  }
}

export default App;
