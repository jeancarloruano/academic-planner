import React from 'react';
import UserList from './UserList.jsx';

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