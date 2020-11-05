import React from 'react';
import { Component } from 'react';

class AuthenicateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: 'abruno1@toromail.csudh.edu',
            password: 'thisismypassword',
            isValid: false
        };
    }

    setURL = () => {
        let url = 'http://localhost:8080/api/v1/person/checkPass/' + this.state.email + '/' + this.state.password + '/';
        return url;
    }

    componentDidMount() {
        fetch(this.setURL())
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isValid: json
                })
                console.log(this.state.isValid);
            })
            .catch(function (error) {
                console.log('Looks like there was a problem: \n', error);
            });
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default AuthenicateUser;