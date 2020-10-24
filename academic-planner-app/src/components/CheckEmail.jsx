const { Component } = require("react");

function CheckEmail(email) {
    fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
            email: this.email
        }
    });
}