import React, { Component } from 'react';

class CreateUser extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        completedCourses: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: '12345',
                name: 'Johnathon Doe',
                email: 'jonD42@toromail.csudh.edu',
                completedCourses: [115, 255, 471],
                password:"password"
            })
        };
        fetch('http://localhost:8080/api/v1/person/', requestOptions)
            .then(response => response.json())
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default CreateUser