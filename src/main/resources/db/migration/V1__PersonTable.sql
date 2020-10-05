CREATE TABLE person(
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    completedCourses int[]
);
CREATE TABLE courses(
    number INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    prerequisites int[]
);

