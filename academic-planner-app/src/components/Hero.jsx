import React from 'react';
import UserList from '/Users/jeancarlo/Desktop/CsudhPlanner/academic-planner-app/src/components/UserList.jsx';

const Hero = ({ HandleLogout }) => {
    return (
        <section className="hero">
            <nav>
                <h2>Welcome, User</h2>
                <button>My Progress</button>
                <button>Settings</button>
                <button onClick={HandleLogout}>Logout</button>
            </nav>
            <body>
                <UserList />
            </body>
        </section>
    )
}

export default Hero;