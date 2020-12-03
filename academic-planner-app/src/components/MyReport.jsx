import React from 'react';
import { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';

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

        url = ("http://localhost:8080/api/v1/person/" + path + "/" + this.props.email + "/");

        const data = await fetch(url);
        const recCourses = await data.json();


        let objLength = Object.keys(recCourses).length;
        let myArr = [];
        for (var i = 0; i < objLength; i++) {
            let num = i + 1;
            myArr.push("Semester " + num + ":");
            for (var j = 0; j < recCourses[i].length; j++) {
                myArr.push(recCourses[i][j].KeyNumber);
            }
        }

        this.setState({
            recommendedCourses: myArr
        }, () => console.log(this.state.recommendedCourses));

    }

    listCurrentCourses = () => {
        let listCurrentCourses;

        listCurrentCourses = this.state.currentCourses.map((currentCourse) =>
            <li key={currentCourse}>
                <Link to={`/courses/${currentCourse}`}>{currentCourse}</Link>
            </li>
        );

        return listCurrentCourses;
    }

    listCompletedCourses = () => {
        let listCompletedCourses;

        listCompletedCourses = this.state.completedCourses.map((completedCourse) =>
            <li key={completedCourse}>
                <Link to={`/courses/${completedCourse}`}>{completedCourse}</Link>
            </li>
        );

        return listCompletedCourses;
    }

    listRemainingCourses = () => {
        let listRemainingCourses;

        listRemainingCourses = this.state.pendingCourses.map((pendingCourse) =>
            <li key={pendingCourse}>
                <Link to={`/courses/${pendingCourse}`}>{pendingCourse}</Link>
            </li>
        );

        return listRemainingCourses;
    }

    listRecommendedCourses = () => {
        let listRecommendedCourses;

        return this.state.recommendedCourses.map((recommendedCourse) => {
            if (recommendedCourse.includes("Semester")) {
                return (<p>{recommendedCourse}</p>)
            }
            else {
                return (<li key={recommendedCourse} >
                    <Link to={`/courses/${recommendedCourse}`}>{recommendedCourse}</Link>
                </li >)
            }
        });

        //return listRecommendedCourses;
    }

    render() {
        return (
            <div className="myReport">
                <h2>My Progress Report:</h2>
                <div>Student Name:
                    <p>{this.state.firstName} {this.state.lastName}</p>
                </div>
                <div>Student ID:
                    <p>{this.state.id}</p>
                </div>
                <div className="listedCourses">Your Current Courses:
                    <ul>{this.listCurrentCourses()}</ul>
                </div>
                <div className="listedCourses">Your Completed Courses:
                    <ul>{this.listCompletedCourses()}</ul>
                </div>
                <div className="listedCourses">Your Remaining Courses:
                    <ul>{this.listRemainingCourses()}</ul>
                </div>
                <div>Your Graduation Plan:
                    <p>{this.state.graduationPlan}</p>
                </div>
                <div>Your Enrollment Status:
                    <p>{this.state.enrollmentStatus}</p>
                </div>
                <div>
                    Enrollment Plan:
                    <p>{`${this.state.graduationPlan}`}</p>
                </div>
                <div className="listedCourses">Your Course Guideline:
                        <ul>{this.listRecommendedCourses()}</ul>
                </div>
            </div>
        );
    }
}

export default MyReport;