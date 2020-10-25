import React from 'react';

function DashBoard(props) {
    return (
        <section className="dashboard">
            <nav>
                <button>My Progress</button>
                <button>Settings</button>
                <button>Logout</button>
            </nav>
            <div>
                <h2>Welcome, User</h2>
            </div>
        </section>
    )
}

export default DashBoard;