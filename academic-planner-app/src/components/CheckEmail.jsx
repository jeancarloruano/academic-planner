import React from 'react';
const { Component } = require("react");

function CheckEmail(email) {
    fetch('http://localhost:8080/api/v1/person/', {
        headers: {
            email: this.email
        }
    });
}