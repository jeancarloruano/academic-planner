import React, { Component } from 'react';

class AccountCreated extends Component {


    render() {
        return (
            <div className="accountCreated">
                <h1>Your account was successfully created!</h1>
                <div className="smallButtonContainer">
                    <button className="smallButton" onClick={this.props.accountStatus}>Return to login</button>
                </div>
            </div>
        )

    }
}

export default AccountCreated;
