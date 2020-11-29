import React, { Component } from 'react';

class AccountCreated extends Component {


    render() {
        return (
            <div>
                <h2>Your account was successfully created!</h2>
                <button onClick={this.props.accountStatus}>Return to login</button>
            </div>
        )

    }
}

export default AccountCreated;
