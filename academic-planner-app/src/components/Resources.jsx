import React from 'react';
import { Component } from 'react';

class Resources extends Component {
    render() {
        return (
            <div>
                <h2>Useful Links:</h2>
                <ul>
                    <li><a href="https://www.csudh.edu" target="_blank">School Website</a></li>
                    <li><a href="https://www.csudh.edu/records-registration/graduation/" target="_blank">Graduation Resources</a></li>
                    <li><a href="https://www.csudh.edu/student-support/academic-services/" target="_blank">Academic Services</a></li>
                    <li><a href="https://www.csudh.edu/csc/" target="_blank">Computer Science Department</a></li>
                    <li><a href="https://www.csudh.edu/university-catalog/2015-16/computer-science/" target="_blank">Computer Science University Catalog</a></li>
                    <li><a href="https://cscadv.csudh.edu/" target="_blank">Computer Science Advising</a></li>
                </ul>
            </div>
        );
    }
}

export default Resources;