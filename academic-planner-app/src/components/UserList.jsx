import React, { Component } from 'react';
import axios from 'axios';


class UserList extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users', { params: { name: 'Ervin Howell' } })
            .then(response => {
                this.setState({ users: response.data });
            });
    }

    axiosTest() {
        return axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data)
        //use console.log() in order to test this func
    }

    setUserParam() {
        const name = this.axiosTest();
        console.log(name);
        //for testing purposes...
    }

    render() {
        return (
            <div>
                <th>ID:</th>
                <ul>
                    {this.state.users.map(user => <div>{user.id}</div>)}
                </ul>
                <th>Username:</th>
                <ul>
                    {this.state.users.map(user => <div>{user.username}</div>)}
                </ul>
                <th>email:</th>
                <ul>
                    {this.state.users.map(user => <div>{user.email}</div>)}
                </ul>
                <th>Student Name:</th>
                <ul>
                    {this.state.users.map(user => <div>{user.name}</div>)}
                </ul>
            </div>
        );
    }
}
export default UserList;

console.log(UserList.render);