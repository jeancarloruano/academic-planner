import React from 'react';
import { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div>
                <h2>Contact Information:
                    <h5>General:
                    <p>CSU Dominguez Hills <br />
                        1000 East Victoria Street <br />
                        Carson, CA 90747 <br />
                        (310) 243-3696 <br />
                        </p>
                    </h5>

                    <h5>Computer Science Department:
                        <p>
                            Department Email - csc@csudh.edu <br />
                            Department Chair - mbeheshti@csudh.edu <br />
                            MSCS Graduate Coordinator - jhan@csudh.edu <br />
                            Administrative Coordinator - vdiaz@csudh.edu <br />
                            Student Assistant - cssa@csudh.edu <br />
                        </p>
                    </h5>

                    <h5>Site Developers:
                        <p>
                            jeancarlo email goes here... <br />
                            anthony email goes here... <br />
                        </p>
                    </h5>
                </h2>


            </div>
        );
    }
}

export default Contact;