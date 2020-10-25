import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            email: '',
            completedCourses: [],
            password: ''
        };
    }


    /*setID(id){
        this.state.id = this.id;
        console.log('ID: ' + this.state.id);
    }*/

    /*setName(name) {
        this.state.name = this.name;
        console.log('Name: ' + this.state.name);
    }*/

    setEmail(email) {
        this.setState(email);
        console.log('Email: ' + this.state.email);
    }

    setPassword(password) {
        this.setState(password);
        console.log('Password: ' + this.state.password);
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: '232467',
                name: 'Bob Saget',
                email: this.state.email,
                completedCourses: [115, 492, 301, 311],
                password: this.state.password
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