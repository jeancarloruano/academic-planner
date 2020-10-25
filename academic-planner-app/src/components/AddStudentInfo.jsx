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
            <form onSubmit={this.handleSubmit}>
                <section className="addInfo" >
                    <div className="formContainer">
                        <p>We noticed you've never been here before. Please fill out the following to continue.</p>
                        <label htmlFor="id">Student ID</label>
                        <input
                            type="text"
                            name="id"
                            autoFocus
                            required
                            onChange={this.handleChange}
                        />

                        <p className="errorMsg">{this.state.formError.inputError}</p>

                        <label htmlFor="name">Student Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            onChange={this.handleChange}
                        />

                        <p className="errorMsg">{this.state.formError.inputError}</p>

                        <div className="btnContainer">
                            <button onClick={this.handleLogin}>Continue</button>
                        </div>

                    </div>
                </section>
            </form>
        )
    }
}

export default AddStudentInfo