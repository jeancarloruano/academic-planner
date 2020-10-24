import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import CreateUser from './components/CreateUser.jsx'

class App extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  state = {
    id: '',
    name: '',
    email: '',
    completedCourses: [],
    password: ''
  };

  render() {
    return (
      <div className="App">
        <Login />
        <DashBoard />
      </div>

    );
  }
}

export default App;
