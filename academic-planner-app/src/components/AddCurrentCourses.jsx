import React, { Component } from 'react';

class AddCourses extends Component {
    state = {
        courseList: this.props.courseList,
        keyNumList: this.props.keyNumList,
        completedCourses: this.props.completedCourses
    };



    renderTableData() {
        return this.props.completedCourses.map((completedCourse) => {
            return (
                <tr className="courses" key={completedCourse}>
                    <input className="checkBox" type="checkbox" onChange={this.onChange} id={completedCourse} value={completedCourse}></input>
                    <td className="courseNum">{completedCourse}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <section className="addCourses">
                <h1 id='title'>Current Courses</h1>
                <p>Almost done! We just need a little more information about your course history. From your previous selection, check any of the courses that you are currently taking (if applicable).
                </p>
                <table className="courseList" id='courses'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <form className="buttonForm" onSubmit={this.props.handleCreateAccount}>
                    <div className="smallButtonContainer">
                        <button type="submit" className="smallButton">Create Account</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default AddCourses;
