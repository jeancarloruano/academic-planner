import React, { Component } from 'react';


class ActiveUserData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            activeUser: [
                id = '',
                firstName = '',
                lastName = '',
                email = '',
                completedCourses = []
            ]
        }
    };


    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/person/`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    users: json
                })
            });

    }

    render() {
        return (
            <div></div>
        );
    }

}