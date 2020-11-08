import React from 'react';
import { Component } from 'react';
import logo from '../img/CSUDH-RGB-Logo-Burgundy-Background.png';
import avatar from '../img/default-avatar.png';
import Home from './Home.jsx';
import Resources from './Resources';
import Contact from './Contact';
import MyReport from './MyReport';

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: 'James',
            lastName: '',
            email: '',
            completedCourses: [115, 121, 123, 311, 321],
            currentCourses: [295, 255, 471],
            graduationPlan: 'Part Time',
            currentPage: 'Home'
        };
    }

    handleHome = () => {
        this.setState({
            currentPage: 'Home'
        });
    }

    handleMyReport = () => {
        this.setState({
            currentPage: 'My Report'
        });
    }

    handleResources = () => {
        this.setState({
            currentPage: 'Resources'
        });
    }

    handleContact = () => {
        this.setState({
            currentPage: 'Contact'
        });
    }

    renderComponent = () => {
        switch (this.state.currentPage) {
            case 'Home': return <Home />;
            case 'My Report': return <MyReport />;
            case 'Resources': return <Resources />;
            case 'Contact': return <Contact />;
            default: return <Home />
        }
    }


    render() {
        return (
            <section className="dashboard">
                <header>
                    <div className="navBar">
                        <nav>
                            <img src={logo} alt="logo" className="logo" onClick={this.handleHome} />
                            <ul>
                                <li><button onClick={this.handleHome}>Home</button></li>
                                <li><button onClick={this.handleMyReport}>My Report</button></li>
                                <li><button onClick={this.handleResources}>Resources</button></li>
                                <li><button onClick={this.handleContact}>Contact</button></li>
                            </ul>
                            <img src={avatar} alt="avatar" className="avatar" />
                        </nav>
                    </div>
                </header>
                <>
                    {this.renderComponent()}
                </>
            </section>
        )
    }
}

export default DashBoard;