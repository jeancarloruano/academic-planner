import React, { Component } from 'react';
import CheckEmail from './CheckEmail';

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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            completedCourses: [],
            password: '',
            formError: {
                emailError: '',
                passwordError: '',
                inputError: ''
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        let emailExists = false;

        emailExists = CheckEmail.CheckEmail(this.state.email);

        if (formValid(this.state.formError) && (emailExists === true)) {
            console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            `)
            console.log("Existing email: " + emailExists);
        } else {
            console.error('FORM INVALID -- DISPLAY ERROR MESSAGE')
            console.log("Existing email: " + emailExists);
        }
    };

    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formError = this.state.formError;

        switch (name) {
            case "email":
                formError.emailError =
                    emailRegex.test(value) && value.includes('toromail.csudh.edu')
                        ? ""
                        : "Invalid toromail email address.";
                break;

            case "password":
                formError.passwordError =
                    value.length <= 12 && value.length >= 8
                        ? ""
                        : "Password must be between 8 to 12 characters in length.";

        }

        this.setState({ formError, [name]: value }, () => console.log(this.state));
    };





    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <section className="login" >
                    <div className="loginContainer">
                        <h2>CSUDH</h2>
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
                            <button onClick={this.handleLogin}>Sign In</button>
                        </div>

                        {/*<div className="btnContainer">
                            {hasAccount ? (
                                <>
                                    <button onClick={handleLogin}>Sign In</button>
                                    <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                </>
                            ) : (
                                    <>
                                        <button onClick={handleSignUp}>Sign Up</button>
                                        <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                    </>
                                )}
                            </div>*/}
                    </div>
                </section>
            </form>
        )
    }
}

export default Login;