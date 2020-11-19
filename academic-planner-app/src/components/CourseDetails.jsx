import React from 'react';
import { useState, Component } from 'react';


class CourseDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseID: this.props.match.params.cd,
            keyNumber: '',
            courseDescription: '',
            courseName: '',
            courseCredits: 0,
            coursePrerequisites: []
        };
    }



    componentDidMount() {
        this.fetchCourseData();
    }

    fetchCourseData = async () => {
        let url = ("http://localhost:8080/api/v1/course/" + this.state.courseID + "/");
        const data = await fetch(url);
        const items = await data.json();
        //console.log(items);

        this.setState({
            keyNumber: items.KeyNumber,
            courseDescription: items.Description,
            courseName: items.Name,
            courseCredits: items.Credits,
            coursePrerequisites: items.Prerequisites
        })
        console.log(this.state);
    }

    listPrerequisites = () => {
        let listPrereq;

        listPrereq = this.state.coursePrerequisites.map((coursePrerequisite) =>
            <li key={coursePrerequisite}>
                {coursePrerequisite}
            </li>
        );

        return listPrereq;
    }

    hasPrerequistes = () => {
        if (this.state.coursePrerequisites.length > 0) {
            return this.listPrerequisites();
        }
        else {
            return "None"
        }
    }

    render() {
        return (
            <div>
                <h2>Course Details:</h2>
                <div>Course Name:
                    <p>{this.state.courseName}</p>
                </div>
                <div>Course ID:
                    <p>{this.state.keyNumber}</p>
                </div>
                <div>Course Description:
                    <p>{this.state.courseDescription}</p>
                </div>
                <div>Prerequisites:
                    <p>{this.hasPrerequistes()}</p>
                </div>
                <div>Credits:
                    <p>{this.state.courseCredits}</p>
                </div>
            </div>
        )
    }
}

export default CourseDetails;