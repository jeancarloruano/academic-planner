import React, { Component } from 'react';

class AddCourses extends Component {
    state = {
        courseList: [],
        keyNumList: [],
        courseIsCompleted: false,
        completedCourses: []
    };


    renderTableData() {
        return this.props.courseList.map((course, index) => {
            const { KeyNumber, Name, Description } = course //destructuring
            const { courseIsCompleted } = this.state;
            return (
                <tr className="courses" key={index}>
                    <input className="checkBox" type="checkbox" onChange={this.onChange} id={KeyNumber} value={KeyNumber}></input>
                    <td>{KeyNumber}</td>
                    <td>{Name}</td>
                    <td>{Description}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <section className="addCourses">
                {console.log(this.props)}
                <h1 id='title'>Course History</h1>
                <p>Great! Now lets add all of the courses that you've successfully completed (including any courses you are currently taking).
                </p>
                <table className="courseList" id='courses'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <form className="buttonForm" onSubmit={this.props.saveAndContinue}>
                    <div className="buttonDiv">
                        <ul>
                            <li>
                                <button type="button" className="aCButton">Select All</button>
                            </li>
                            <li>
                                <button type="button" className="aCButton">Select None</button>
                            </li>
                            <li>
                                <button type="submit" className="aCButton">Save and Continue</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </section>
        );
    }
}

export default AddCourses;
