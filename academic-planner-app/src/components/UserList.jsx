import React, { Component } from 'react';
import axios from 'axios';


class UserList extends Component {
    state = {
        users : []
    };

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/course`)
            .then(results => results.json())
            .then(json => {
                this.setState({
                    users:json
                })
            });
        
    }

    renderTableData(){
        return this.state.users.map((user,index) => {
        const { number, name, description, prerequisites } = user //destructuring
         return (
            <tr key={number}>
                <td>{number}</td>
               <td>{name}</td>
               <td>{description}</td>
               <td>{prerequisites}</td>
            </tr>
         )
        })
    }

    render() {
        return (
            <div>
            <h1 id='title'>CSUDH Courses</h1>
            <table id='students'>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        );
    }
}

const RenderRow = (props) => {

}
export default UserList;

console.log(UserList.render);