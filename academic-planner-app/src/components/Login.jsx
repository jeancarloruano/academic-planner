import React, { Component } from 'react';
import logo from '../img/CSUDH-RGB-Logo-Burgundy-Background.png';
import AddStudentInfo from './AddStudentInfo';
import CreateUser from './CreateUser';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <section className="login" >
                    <div className="loginContainer">
                        <h2><img src={logo} alt="logo" className="loginLogo" /></h2>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            autoFocus
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.emailError}</p>

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.passwordError}</p>

                        <div className="btnContainer">
                            <button type="submit">Sign In</button>
                            <p>Don't have an account? <span onClick={this.props.accountStatus}>Sign up</span></p>
                        </div>
                    </div>
                </section>
            </form>
        )
    }
}

export default Login;