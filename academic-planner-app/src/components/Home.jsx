import React from 'react';
import { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: 'James',
            lastName: '',
            email: '',
            completedCourses: [115, 121, 123, 311, 321],
            currentCourses: [295, 255, 471],
            graduationPlan: 'Part-Time',
            enrollmentStatus: 'Good Standing'
        };
    }

    getTerm = () => {
        let m = new Date();
        let y = new Date();
        let term = '';

        if (m.getMonth() < 5) {
            term = 'Spring';
        }
        else if (m.getMonth() < 7) {
            term = 'Summer';
        }
        else {
            term = 'Fall';
        }

        return (term + " " + y.getFullYear())

    }

    setProgress = () => {                                                                //sets the progress bar length based on the user's
        let progress = 0.0;                                                             //completed coursed divided by the total required courses
        progress = (((this.state.completedCourses.length) / 24) * 100).toFixed(1);     // for a comp sci BS degree
        console.log(progress);
        return progress;
    }

    setCurrentCourses = () => {
        let listCourses;

        listCourses = this.state.currentCourses.map((currentCourse) =>
            <li key={currentCourse}>{currentCourse}</li>
        );

        console.log(listCourses);
        return listCourses;
    }

    render() {
        return (
            <div>
                <div className="greeting">
                    <h2>Hello, {`${this.state.firstName}`}</h2>
                </div>
                <div className="gradPlan">
                    <h3>Your Current Graduation Plan:</h3>
                    {`${this.state.graduationPlan}`} Enrollment <br />
                    <button>Change Plan</button>
                </div>
                <div className="courseProgress">
                    <h3>Degree Completion:</h3>
                    <ProgressBar className="progressBar" now={this.setProgress()} label={`${this.setProgress()}%`} />
                </div>
                <div className="currentCourses">
                    <h3>{this.getTerm()}</h3>
                    Your Current Courses: <br />
                    <ul>{this.setCurrentCourses()}</ul>
                    Enrollment Status: {`${this.state.enrollmentStatus}`}
                </div>
            </div>
        );
    }
}

export default Home;