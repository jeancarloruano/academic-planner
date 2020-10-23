CREATE TABLE person(
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    completedCourses int[]
);
CREATE TABLE courses(
    number INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    prerequisites int[],
    credits INTEGER NOT NULL
);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (115,'Programming concepts','Introduces students to computer programming by teaching techniques of problem solving. Students will become acquainted with decision constructs, looping structures, and subroutine modules. Students will learn the vocabulary of object-oriented programming.'
    ,'{}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (153,'PRE-CALCULUS WITH TRIGONOMETRY','Topics include functions and their graphs; linear, quadratic, rational, exponential, and logarithmic functions; composition, transformation and arithmetic of functions; inverse function; inequalities; right-triangle trigonometry and circular motion; applications to contextual problems.'
    ,'{}',4);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (121,'INTRODUCTION TO COMPUTER SCIENCE AND PROGRAMMING 1','Organization of sequential, digital machine: CPU, I/O, storage, communications devices. Functions of operating systems: translators, editors, peripheral control utilities. The course covers the development, description, and analysis of elementary algorithms.'
    ,'{115,153}',4);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (191,'Calculus 1','Limits, continuity, derivatives, differentiation formulas, applications of derivatives, introduction to integration, fundamental theorum of calculus, application of integration. Satisfies the General Education Quantitative Reasoning Requirement.'
    ,'{153}',5);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (281,'Discrete Mathematics','Matrix algebra, graph theory, trees, combinatorics, Boolean algebra; with applications to computers and computer programming.'
    ,'{153,121}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (123,'Intro to Computer Science and Programming 2','Fundamental programming concepts using arrays, records, pointers, linked list, trees and recursion. Good style, documentation and structure will be emphasized. Introduction to analysis of algorithms for efficiency and correctness.'
    ,'{121}',4);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (221,'Assembly Language and Intro to Computer Organization','Programming problems in assembly language. Writing and using macros. Features of modern computer hardware and operating systems.'
    ,'{121}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (193,'Calculus 2','Differentiation and integration of transcendental function. Techniques and applications of integration. Polar coordinates. Infinite sequences and series, power series, convergence. Satisfies the General Education Quantitative Reasoning Requirement.'
    ,'{191}',5);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (271,' Foundations of Higher Mathematics','Topics include logic, methods of mathematical proof, set theory, relations and functions. Introduction to complex numbers and proof strategies using ideas of vector algebra. Meant to prepare students for mathematics program as well as concepts of computer science'
    ,'{193}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (200,'Lower Division Elective','Student needs to choose from a list an elective'
    ,'{}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (130,'General Physics','Kinematics and dynamics of particles, rigid bodies and fluids. Kinetic theory, temperature and thermodynamics. Calculus-based course. Four hours of lecture and three hours of laboratory per week'
    ,'{191}',5);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (132,'General Physics 2','Waves, light, electricity and magnetism'
    ,'{193,130}',5);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (311,'Data Structures','More advanced and detailed treatment of concepts of data organization introduced in CSC 123. Includes lists, trees, graphs and storage allocation and collection. Applications to such areas as symbol tables, string search and optimization.'
    ,'{123,281}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (321,'Programming Languages','A comparative study of programming languages. Characteristics of languages and formal description of languages. Assignments in several languages.'
    ,'{123}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (331,'Computer Organization','Structure of the modern digital computer. Introduction to Boolean algebra and design of digital circuits. Arithmetic, control, storage and input/output systems.'
    ,'{221,281}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (341,'Operating Systems','Overall structure of batch and time-shared operating systems. Scheduling of jobs, CPU and I/O devices. Paged and segmented memory management. I/O programming and file handling. Synchronization of concurrent processes.'
    ,'{311,331,3210}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (301,'Computers and Society','Ethical, legal, psychological, economic, and theoretical implications and limitations of the uses of digital computers. Oral and written presentations required.'
    ,'{121}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (401,'Analysis of Algorithms','Mathematical study of non-numeric computer algorithms. Topics include combinatorial techniques, algorithm proof, and program complexity.'
    ,'{311}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (481,'Software Engineering','Introduction to software engineering, with emphasis on software design and specification.'
    ,'{301,311,321}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (492,'Senior Project',' Intensive study under the guidance of a member of the Computer Science faculty which continues and expands the research carried out in Senior Seminar. Students will study system design and total project planning and management.'
    ,'{301,321,481}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (3210,'Probability and Statistics','A calculus based survey of topics in probability and statistics emphasizing applications.'
    ,'{193,271}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (471,'Compiler Construction 1','Introduction to the theory and practice of compiler construction. Overall structure of compilers. Lexical and syntactic analysis, code generation for block structured languages and code optimization'
    ,'{221,311}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (300,'Upper Division Elective','Student needs to choose from a list an elective'
    ,'{311}',3);

Insert INTO courses (number, name, description, prerequisites,credits)
    VALUES (302,'Lower Division Elective','Student needs to choose from a list an elective'
    ,'{311}',3);