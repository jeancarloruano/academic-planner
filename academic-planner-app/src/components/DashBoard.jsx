import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../img/CSUDH-RGB-Logo-Burgundy-Background.png';
import avatar from '../img/default-avatar.png';
import Home from './Home.jsx';
import MyReport from './MyReport';
import Resources from './Resources';
import Contact from './Contact';
import Settings from './Settings';
import CourseDetails from './CourseDetails';
import ChangePlan from './ChangePlan';


class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: this.props.email,
            completedCourses: [],
            currentCourses: [],
            pendingCourses: [],
            graduationPlan: '',
            enrollmentStatus: 'On Track'
        };
    }

    changePlan = () => {
        return <Link to="/change-plan"><button>Change Plan</button></Link>;
    }


    componentDidMount() {
        this.fetchUserData();
        console.log(this.props.email);
    }

    fetchUserData = async () => {
        let url = ("http://localhost:8080/api/v1/person/email/" + this.state.email + "/");
        let gradPlan = '';
        const data = await fetch(url);
        const items = await data.json();
        console.log(items);

        switch (items.schoolPlan) {
            case 0:
                gradPlan = 'Standard';
                break;

            case 1:
                gradPlan = 'Accelerated';
                break;

            case 2:
                gradPlan = 'Part-Time';
                break;

            default:
                gradPlan = 'Standard';
                break;
        }

        let penCourURL = ('http://localhost:8080/api/v1/person/neededCourses/' + items.id + '/');
        const res = await fetch(penCourURL);
        const penCourses = await res.json();
        //console.log(penCourses);

        this.setState({
            id: items.id,
            firstName: items.firstname,
            lastName: items.lastname,
            completedCourses: items.completedCourses,
            currentCourses: items.currentCourses,
            pendingCourses: penCourses,
            graduationPlan: gradPlan
        })
        console.log(this.state);
    }

    render() {
        return (
            <section className="dashboard">
                <Router>
                    <header>
                        <div className="navBar">
                            <nav>
                                <div className="logoDiv">
                                    <Link to="/"><img src={logo} alt="logo" className="logo" href="/" /></Link>
                                </div>
                                <ul>
                                    <li><Link to="/"><button>Home</button></Link></li>
                                    <li><Link to="/myreport"><button>My Report</button></Link></li>
                                    <li><Link to="/resources"><button>Resources</button></Link></li>
                                    <li><Link to="/contact"><button>Contact</button></Link></li>
                                </ul>
                                <div className="userAvatar">
                                    <img src={avatar} alt="avatar" className="avatar" />
                                    <div className="userMenu">
                                        <ul>
                                            <li><Link to="/settings"><button>Settings</button></Link></li>
                                            <li><button onClick={this.props.logOut}>Logout</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <Switch>
                        <Route path="/" exact component={() => <Home
                            id={this.state.id}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            email={this.state.email}
                            completedCourses={this.state.completedCourses}
                            graduationPlan={this.state.graduationPlan}
                            currentCourses={this.state.currentCourses}
                            enrollmentStatus={this.state.enrollmentStatus}
                            enrollmentPlan={this.changePlan} />}
                        />
                        <Route path="/myreport" component={() => <MyReport
                            id={this.state.id}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            email={this.state.email}
                            completedCourses={this.state.completedCourses}
                            graduationPlan={this.state.graduationPlan}
                            currentCourses={this.state.currentCourses}
                            enrollmentStatus={this.state.enrollmentStatus}
                            pendingCourses={this.state.pendingCourses} />}
                        />
                        <Route path="/resources" component={Resources} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/courses/:cd" component={CourseDetails} />
                        <Route path="/change-plan" exact component={() => <ChangePlan
                            id={this.state.id}
                            graduationPlan={this.state.graduationPlan} />}
                        />
                    </Switch>
                </Router>
            </section >
        )
    }
}

export default DashBoard;