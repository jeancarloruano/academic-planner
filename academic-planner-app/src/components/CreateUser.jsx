import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            completedCourses: [],
            password: '',
            salt: ''
        };
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
                id: this.state.id,
                email: this.state.email,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                completedCourses: this.state.completedCourses,
                currentCourses: this.state.currentCourses,
                schoolPlan: this.state.schoolPlan,
                password: this.state.password,
                salt: myString
            })
        };
        fetch('http://localhost:8080/api/v1/person/', requestOptions)
            .then(response => response.json())
    }

    render() {
        return (
            <div>
            </div>
        );
    }

}
export default CreateUser