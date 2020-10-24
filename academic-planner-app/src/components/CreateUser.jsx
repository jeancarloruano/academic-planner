import React, { Component } from 'react';

class CreateUser extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        completedCourses: [],
        password: ''
    };

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                completedCourses: this.state.completedCourses,
                password: this.state.password
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