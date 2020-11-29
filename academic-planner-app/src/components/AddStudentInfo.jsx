import React, { Component } from 'react';

class AddStudentInfo extends Component {
    constructor(props) {
        super(props)

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

    render() {
        return (
            <form onSubmit={this.props.handleContinue}>
                <section className="addInfo" >
                    <div className="formContainer">
                        <p>Enter Your Student Information</p>

                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            autoFocus
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.nameError}</p>

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.nameError}</p>

                        <label htmlFor="id">Student ID</label>
                        <input
                            type="text"
                            name="studentID"
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.idError}</p>

                        <label htmlFor="email">Student Email</label>
                        <input
                            type="text"
                            name="email"
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

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            onChange={this.props.handleChange}
                        />

                        <p className="errorMsg">{this.props.formError.confirmPassError}</p>

                        <div className="btnContainer">
                            <button type="submit">Continue</button>
                            <p>Already have an account? <span onClick={this.props.accountStatus}>Sign in</span></p>
                        </div>

                    </div>
                </section>
            </form>
        )
    }
}

export default AddStudentInfo