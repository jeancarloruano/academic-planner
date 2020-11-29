import React, { Component } from 'react';
import AddCourses from './AddCourses';
import AddStudentInfo from './AddStudentInfo';

class CreateAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            studentInfoAdded: false,
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
            <div>
                {this.props.pageHandler}
            </div>
        )
    }
}

export default CreateAccount