import React, { Component } from 'react';
import logo from '../img/CSUDH-RGB-Logo-Burgundy-Background.png';
import AddStudentInfo from './AddStudentInfo';
import CreateUser from './CreateUser';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formError => {
    let valid = true;

    Object.values(formError).forEach(val => {
        val.length > 0 && (valid = false)
    });

    return valid;
}

var abortController = new AbortController();

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formError: {
                emailError: '',
                passwordError: '',
                inputError: ''
            },
            hasAccount: true,
            emailPassValid: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        let isValid = false;

        if (formValid(this.state.formError)) {
            console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            `);
            isValid = true;

            this.checkEmailPass();
            if (this.state.emailPassValid === true) {
                this.userIsActive();
            }

            else {
                console.log("Incorrect email or password...");
            }

        } else {
            console.error('FORM INVALID -- DISPLAY ERROR MESSAGE')
        }
    };

    handleChange = e => {
        e.preventDefault();

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

        }

        this.setState({ formError, [name]: value }, () => console.log(this.state));
    };

    handleLogin = e => {

    }

    handleSignUp = e => {

    }

    userIsActive = () => {
        //console.log(this.state.emailPassValid);
        //console.log(this.state.email);
        this.props.callBack(this.state.emailPassValid);
        this.props.getEmail(this.state.email);
    }

    checkEmailPass = async () => {
        let url = 'http://localhost:8080/api/v1/person/checkPass/' + this.state.email + '/' + this.state.password + '/';
        //console.log(url);
        const data = await fetch(url);
        const items = await data.json();
        //console.log(items);
        this.setState({
            emailPassValid: items
        });
        //console.log(this.state.emailPassValid);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <section className="login" >
                    <div className="loginContainer">
                        <h2><img src={logo} alt="logo" className="loginLogo" /></h2>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            autoFocus
                            required
                            onChange={this.handleChange}
                        />

                        <p className="errorMsg">{this.state.formError.emailError}</p>

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={this.handleChange}
                        />

                        <p className="errorMsg">{this.state.formError.passwordError}</p>

                        <div className="btnContainer">
                            <button>Sign In</button>
                            <p>Don't have an account? <span onClick={this.setFalse}>Sign up</span></p>
                        </div>
                    </div>
                </section>
            </form>
        )
    }
}

export default Login;