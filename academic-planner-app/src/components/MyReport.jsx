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
            recommendedCourses: [
                []
            ]
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

        this.setState({
            //recommendedCourses: recCourses[0]
        });

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
                    <p>{this.state.currentCourses}</p>
                </div>
                <div>Your Completed Courses:
                    <p>{this.state.completedCourses}</p>
                </div>
                <div>Your Remaining Courses:
                    <p>{this.state.pendingCourses}</p>
                </div>
                <div>Your Graduation Plan:
                    <p>{this.state.graduationPlan}</p>
                </div>
                <div>Your Enrollment Status:
                    <p>{this.state.enrollmentStatus}</p>
                </div>
                <div>
                    Plan: {`${this.state.graduationPlan}`} <br />
                    Recomended Courses:
                    <p>{this.state.recommendedCourses}</p>
                </div>
            </div>
        );
    }
}

export default MyReport;