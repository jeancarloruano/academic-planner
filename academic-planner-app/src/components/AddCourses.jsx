import React, { Component } from 'react';


class AddCourses extends Component {
    state = {
        courses: []
    };

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/course`)
            .then(results => results.json())
            .then(json => {
                this.setState({
                    courses: json
                })
            });

    }

    renderTableData() {
        return this.state.courses.map((course, index) => {
            const { number, name, description, prerequisites } = course //destructuring
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
                <h1 id='title'>My Courses</h1>
                <table id='students'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddCourses;
