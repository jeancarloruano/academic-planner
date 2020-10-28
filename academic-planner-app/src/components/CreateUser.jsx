import React, { Component } from 'react';

const RandomString = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()[]{}_=+-/?~';
    let hashVal = '';
    let i;

    for (i = 0; i < 11; i++) {
        hashVal += characters[Math.floor(Math.random() * (characters.length))];
    }

    console.log('Hash Salt Value: ' + hashVal);                  //for debugging, delete or comment out for security
    return hashVal;
}

let myString = RandomString();

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

    SetProperties() {
        this.setState(
            {
                id: '5673765',
                firstName: 'Bob',
                lastName: 'Saget',
                email: 'this.props.email',
                completedCourses: [115, 492, 301, 311],
                password: 'this.props.password',
                salt: myString
            }, () => {
                console.log('Callback Value: ',                         //for debugging only, delete or comment out for security
                    'ID: ' + this.state.id,
                    'First Name: ' + this.state.firstName,
                    'Last Name: ' + this.state.lastName,
                    'Email: ' + this.state.email,
                    'Completed Courses: ' + this.state.completedCourses,
                    'Password: ' + this.state.password,
                    'Hash Salt Value: ' + this.state.salt
                );
            }
        );
    }


    componentDidMount() {
        this.SetProperties();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.id,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                email: this.state.email,
                completedCourses: this.state.completedCourses,
                password: this.state.password,
                salt: this.state.salt
            })
        };
        fetch('http://localhost:8080/api/v1/person/', requestOptions)
            .then(response => response.json())
    }

    render() {
        return (
            <div>
                Hello World! <br />
                {this.props.email}
                {this.props.password}
            </div>
        );
    }

}
export default CreateUser