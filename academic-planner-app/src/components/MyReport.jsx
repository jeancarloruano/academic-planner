import React from 'react';
import { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

class MyReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            completedCourses: this.props.completedCourses,
            currentCourses: this.props.currentCourses,
            pendingCourses: this.props.pendingCourses,
            graduationPlan: this.props.graduationPlan,
            enrollmentStatus: this.props.enrollmentStatus,
            recommendedCourses: []
        };
    }

    componentDidMount() {
        this.fetchRecommendedCourses();
    }

    fetchRecommendedCourses = async () => {
        let url = '';
        let path = '';

        switch (this.state.graduationPlan) {
            case 'Accelerated':
                path = 'acceleratedPlan/'
                break;

            case 'Part-Time':
                path = 'partTimePlan/'
                break;

            case 'Standard':
                path = 'standardPlan/'
                break;

            default:
                path = 'standardPlan/'
                break;
        }

        //console.log(path);

        url = ("http://localhost:8080/api/v1/person/" + this.state.id + "/" + path);
        //console.log(url);

        const data = await fetch(url);
        const recCourses = await data.json();
        console.log(recCourses);
        console.log(typeof recCourses);

        let toArrray = Object.keys(recCourses);

        this.setState({
            recommendedCourses: toArrray
        });

    }

    listCurrentCourses = () => {
        let listCurrentCourses;

        listCurrentCourses = this.state.currentCourses.map((currentCourse) =>
            <li key={currentCourse}>{currentCourse}</li>
        );

        return listCurrentCourses;
    }

    listCompletedCourses = () => {
        let listCompletedCourses;

        listCompletedCourses = this.state.completedCourses.map((completedCourse) =>
            <li key={completedCourse}>{completedCourse}</li>
        );

        return listCompletedCourses;
    }

    listRemainingCourses = () => {
        let listRemainingCourses;

        listRemainingCourses = this.state.pendingCourses.map((pendingCourse) =>
            <li key={pendingCourse}>{pendingCourse}</li>
        );

        return listRemainingCourses;
    }

    render() {
        return (
            <div>
                <h2>My Progress Report:</h2>
                <div>Student Name:
                    <p>{this.state.firstName} {this.state.lastName}</p>
                </div>
                <div>Student ID:
                    <p>{this.state.id}</p>
                </div>
                <div>Your Current Courses:
                    <ul>{this.listCurrentCourses()}</ul>
                </div>
                <div>Your Completed Courses:
                    <ul>{this.listCompletedCourses()}</ul>
                </div>
                <div>Your Remaining Courses:
                    <ul>{this.listRemainingCourses()}</ul>
                </div>
                <div>Your Graduation Plan:
                    <p>{this.state.graduationPlan}</p>
                </div>
                <div>Your Enrollment Status:
                    <p>{this.state.enrollmentStatus}</p>
                </div>
                <div>
                    Plan: {`${this.state.graduationPlan}`} <br />
                    Your Course Guideline:
                        <p>{this.state.recommendedCourses}</p>
                </div>
            </div>
        );
    }
}

export default MyReport;