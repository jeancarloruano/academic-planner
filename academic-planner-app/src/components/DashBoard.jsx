import React from 'react';

function DashBoard(props) {
    return (
        <section className="dashboard">
            <nav>
                <button>My Progress</button>
                <button>Settings</button>
                <button>Logout</button>
            </nav>
            <body>
                <h2>Welcome, User</h2>
            </body>
        </section>
    )
}

export default DashBoard;