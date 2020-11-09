import React from 'react';
<<<<<<< HEAD
import { useState, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
=======
import { Component } from 'react';
>>>>>>> cea80d413cc6ec30a8c1f649d5799a2bedb0dcff
import logo from '../img/CSUDH-RGB-Logo-Burgundy-Background.png';
import avatar from '../img/default-avatar.png';
import Home from './Home.jsx';
import MyReport from './MyReport';
import Resources from './Resources';
import Contact from './Contact';
import Settings from './Settings';


class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            completedCourses: [],
            currentCourses: [],
            graduationPlan: ''
        };
    }



    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        const items = await data.json();
        console.log(items);
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
                                            <li><button>Logout</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/myreport" component={MyReport} />
                        <Route path="/resources" component={Resources} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/settings" component={Settings} />
                    </Switch>
                </Router>
            </section >
        )
    }
}

export default DashBoard;