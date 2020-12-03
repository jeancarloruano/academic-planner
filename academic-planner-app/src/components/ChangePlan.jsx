import React from 'react';
import { Component } from 'react';


class ChangePlan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            graduationPlan: this.props.graduationPlan
        };
    }

    onChange = e => {
        this.setState({
            graduationPlan: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setGradPlan();
    }

    setGradPlan = () => {
        let url = ('http://localhost:8080/api/v1/person/' + this.props.id + '/');
        let gradPlan = 0;
        console.log(url);

        switch (this.state.graduationPlan) {
            case 'Standard':
                gradPlan = 0;
                break;

            case 'Accelerated':
                gradPlan = 1;
                break;

            case 'Part-Time':
                gradPlan = 2;
                break;

            default:
                gradPlan = 0;
                break;
        }

        console.log(gradPlan);
        console.log(this.props);
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.id,
                email: this.props.email,
                FirstName: this.props.firstName,
                LastName: this.props.lastName,
                completedCourses: this.props.completedCourses,
                currentCourses: this.props.currentCourses,
                schoolPlan: gradPlan,
                password: '',
                salt: ''
            })
        };
        fetch('http://localhost:8080/api/v1/person/', requestOptions)
            .then(res => res.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const { graduationPlan } = this.state;
        return (
            <div>
                <form>
                    <section>
                        <h2>Change Your Enrollment Plan: </h2>
                        <div>
                            <label>Standard
                                <input type="radio" value="Standard" checked={graduationPlan === "Standard"} onChange={this.onChange} />
                            </label>
                        </div>
                        <div>
                            <label>Accelerated
                                <input type="radio" value="Accelerated" checked={graduationPlan === "Accelerated"} onChange={this.onChange} />
                            </label>
                        </div>
                        <div>
                            <label>Part-Time
                                <input type="radio" value="Part-Time" checked={graduationPlan === "Part-Time"} onChange={this.onChange} />
                            </label>
                        </div>
                        <div className="smallButtonContainer">
                            <button type="smallButton" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </section>
                </form>
            </div>
        )
    }
}

export default ChangePlan;