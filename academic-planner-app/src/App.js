import React, { Component } from "react";
import "./App.css";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import AddStudentInfo from "./components/AddStudentInfo";
import AddCourses from "./components/AddCourses";
import CreateAccount from "./components/CreateAccount";
import AddCurrentCourses from './components/AddCurrentCourses';
import AccountCreated from './components/AccountCreated';

const formValid = formError => {
  let valid = true;

  Object.values(formError).forEach(val => {
    val.length > 0 && (valid = false)
  });

  return valid;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      emailPassValid: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      studentID: '',
      formError: {
        emailError: '',
        passwordError: '',
        inputError: '',
        fNameError: '',
        lNameError: '',
        idError: ''
      },
      hasAccount: true,
      studentInfoAdded: false,
      createUserStatus: 'AddStudentInfo',
      courseList: [],
      keyNumList: [],
      completedCourses: [],
      currentCourses: [],
      schoolPlan: 0
    }

  }

  userHasAccount = () => {
    if (this.state.hasAccount === true) {
      return <Login
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        accountStatus={this.accountStatus}
        formError={this.state.formError}
      />;
    }

    else {
      return <CreateAccount
        accountStatus={this.accountStatus}
        pageHandler={this.pageHandler()}
      />;
    }
  }

  accountStatus = () => {
    if (this.state.hasAccount === true) {
      this.setState({
        hasAccount: false
      });
    }
    else {
      this.setState({
        hasAccount: true,
        createUserStatus: 'AddStudentInfo'
      });
    }
  }

  logOut = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  // login component functions
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state.formError)) {
      /*console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
        `);*/

      this.checkEmailPass();

    } else {
      console.error('FORM INVALID -- DISPLAY ERROR MESSAGE')
    }
  };

  handleChange = e => {
    e.preventDefault();

    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const { name, value } = e.target;
    let formError = this.state.formError;

    switch (name) {
      case "email":
        formError.emailError =
          emailRegex.test(value) && value.includes('toromail.csudh.edu', (value.length - 18))
            ? ""
            : "Invalid toromail email address.";
        break;

      case "password":
        formError.passwordError =
          value.length <= 16 && value.length >= 8
            ? ""
            : "Password must be between 8 to 16 characters in length.";
        break;

      case "confirmPassword":
        formError.confirmPassError =
          value === this.state.password
            ? ""
            : "Passwords do not match.";
        break;

      case "firstName":
        formError.fNameError =
          value.length === 0
            ? "First name must be at least 1 character in length."
            : "";
        break;

      case "lastName":
        formError.lNameError =
          value.length === 0
            ? "Last name must be at least 1 character in length."
            : "";
        break;

      case "studentID":
        formError.idError =
          value.length !== 9
            ? "Student ID must be 9 characters in length."
            : "";
        break;

      default:
        break;

    }

    this.setState({ formError, [name]: value }, () => console.log(this.state));
  };

  componentDidMount() {
    this.fetchCourseData();
  }

  checkEmailPass = async () => {
    let url = 'http://localhost:8080/api/v1/person/checkPass/' + this.state.email + '/' + this.state.password + '/';
    //console.log(url);
    const data = await fetch(url);
    const items = await data.json();
    console.log('Incoming message: ' + items);
    this.setState({
      emailPassValid: items
    });

    if (items === true) {
      this.setState({
        isLoggedIn: true
      });
    }

    else {
      this.setState({
        formError: {
          passwordError: 'Incorrect email or password.'
        }
      });
    }

    console.log('Email pass valid?: ' + this.state.emailPassValid);
  }

  // CreateAccount component functions

  handleContinue = e => {
    e.preventDefault();

    this.setState({
      createUserStatus: 'AddCourses'
    });

  };

  pageHandler = () => {
    /*if (this.state.studentInfoAdded === false) {
      return <AddStudentInfo
        accountStatus={this.accountStatus}
        handleContinue={this.handleContinue}
      />;
    }

    else {
      return <AddCourses
        handleAddCourses={this.handleAddCourses}
      />;
    }*/

    switch (this.state.createUserStatus) {
      case 'AddStudentInfo': return <AddStudentInfo
        accountStatus={this.accountStatus}
        handleContinue={this.handleContinue}
        handleChange={this.handleChange}
        formError={this.state.formError}
      />;
      case 'AddCourses': return <AddCourses
        handleAddCourses={this.handleAddCourses}
        courseList={this.state.courseList}
        saveAndContinue={this.saveAndContinue}
      />;
      case 'AddCurrentCourses': return <AddCurrentCourses
        completedCourses={this.state.completedCourses}
        handleCreateAccount={this.handleCreateAccount}
      />;
      case 'AccountCreated': return <AccountCreated
        accountStatus={this.accountStatus}
      />;
      default: return <AddStudentInfo
        accountStatus={this.accountStatus}
        handleContinue={this.handleContinue}
      />;
    }


  }

  handleAddCourses = () => {
    this.setState({
      hasAccount: true
    });
  }


  fetchCourseData = async () => {
    const data = await fetch('http://localhost:8080/api/v1/course');
    const items = await data.json();
    const arr = [];

    for (var i = 0; i < items.length; i++) {
      //let newArr = items[i].KeyNumber.map((course, index) => { });
      arr.push(items[i].KeyNumber);
    }
    this.setState({
      courseList: items,
      keyNumList: arr
    });
  }

  saveAndContinue = e => {
    e.preventDefault();
    var checked = [];

    for (var i = 0; i < this.state.keyNumList.length; i++) {
      var checkbox = document.getElementById(this.state.keyNumList[i]);
      if (checkbox.checked) {
        checked.push(this.state.keyNumList[i]);
      }
    }

    this.setState({
      completedCourses: checked,
      createUserStatus: 'AddCurrentCourses'
    }, () => console.log(this.state.completedCourses));
    console.log(this.state.completedCourses);
  }

  randomString = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()[]{}_=+-/?~';
    let hashVal = '';
    let i;

    for (i = 0; i < 11; i++) {
      hashVal += characters[Math.floor(Math.random() * (characters.length))];
    }

    return hashVal;
  }

  createAccount = () => {
    let myString = this.randomString();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.studentID,
        email: this.state.email,
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        completedCourses: this.state.completedCourses,
        currentCourses: this.state.currentCourses,
        schoolPlan: this.state.schoolPlan,
        password: this.state.password,
        salt: myString
      })
    };
    fetch('http://localhost:8080/api/v1/person/', requestOptions)
      .then(res => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });

    this.setState({
      createUserStatus: 'AccountCreated'
    });
  }

  handleCreateAccount = e => {
    e.preventDefault();
    var checked = [];

    for (var i = 0; i < this.state.completedCourses.length; i++) {
      var checkbox = document.getElementById(this.state.completedCourses[i]);
      if (checkbox.checked) {
        checked.push(this.state.completedCourses[i]);
      }
    }

    this.setState({
      currentCourses: checked,
    }, this.createAccount);
  }

  render() {
    return (
      <div>
        <>
          {this.state.isLoggedIn ? (
            <DashBoard
              id={this.state.id}
              email={this.state.email}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              completedCourses={this.state.completedCourses}
              currentCourses={this.state.currentCourses}
              schoolPlan={this.state.schoolPlan}
              password={this.state.password}
              salt={this.state.salt}

              logOut={this.logOut}
            />
          ) : (
              this.userHasAccount()
            )}
        </>
      </div >

    );
  }
}

export default App;
