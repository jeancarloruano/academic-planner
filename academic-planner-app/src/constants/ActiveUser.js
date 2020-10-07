class ActiveUser {
    static TYPE_ADMIN = 'admin';
    static TYPE_REGULAR = 'regular';

    type;
    firstName;
    lastName;
    email;
    studentID;

    constructor(type, firstName, lastName, email, studentID) {
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.studentID = studentID;
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
        //for testing...
    }
}

const user = new ActiveUser('Jon', 'Snow', 'jonsnow@testmail.com', '12345678');
console.log(user.getName()); // => 'Jon Snow'