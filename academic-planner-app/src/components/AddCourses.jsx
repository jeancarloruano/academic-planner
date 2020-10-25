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
                <tr className="courses" key={number}>
                    <input className="checkBox" type="checkbox"></input>
                    <td>{number}</td>
                    <td>{name}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <section className="addCourses">
                <h1 id='title'>Course History</h1>
                <p>Almost done! We just need a little more information about your course history. Please select all of the courses
                you've currently completed.
                </p>
                <table className="courseList" id='courses'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <form className="buttonForm">
                    <div className="buttonDiv">
                        <ul>
                            <li>
                                <button type="button" className="aCButton">Select All</button>
                            </li>
                            <li>
                                <button type="button" className="aCButton">Select None</button>
                            </li>
                            <li>
                                <button type="button" className="aCButton">Save and Continue</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </section>
        );
    }
}

export default AddCourses;
