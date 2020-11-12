CREATE TABLE person(
    id INTEGER NOT NULL PRIMARY KEY UNIQUE,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR NOT NULL,
    email VARCHAR(100) UNIQUE,
    completedCourses int[],
    currentCourses int[],
    schoolPlan INTEGER NOT NULL,
    password VARCHAR NOT NULL,
    salt VARCHAR NOT NULL
);
CREATE TABLE courses(
    keyNumber TEXT PRIMARY KEY UNIQUE,
    number INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    prerequisites int[],
    credits INTEGER NOT NULL
);


Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-115',115,'Programming concepts','Introduces students to computer programming by teaching techniques of problem solving. Students will become acquainted with decision constructs, looping structures, and subroutine modules. Students will learn the vocabulary of object-oriented programming.'
    ,'{}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-153',153,'PRE-CALCULUS WITH TRIGONOMETRY','Topics include functions and their graphs; linear, quadratic, rational, exponential, and logarithmic functions; composition, transformation and arithmetic of functions; inverse function; inequalities; right-triangle trigonometry and circular motion; applications to contextual problems.'
    ,'{}',4);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-121',121,'INTRODUCTION TO COMPUTER SCIENCE AND PROGRAMMING 1','Organization of sequential, digital machine: CPU, I/O, storage, communications devices. Functions of operating systems: translators, editors, peripheral control utilities. The course covers the development, description, and analysis of elementary algorithms.'
    ,'{115,153}',4);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-191',191,'Calculus 1','Limits, continuity, derivatives, differentiation formulas, applications of derivatives, introduction to integration, fundamental theorum of calculus, application of integration. Satisfies the General Education Quantitative Reasoning Requirement.'
    ,'{153}',5);





Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('PHY-130',130,'General Physics','Kinematics and dynamics of particles, rigid bodies and fluids. Kinetic theory, temperature and thermodynamics. Calculus-based course. Four hours of lecture and three hours of laboratory per week'
    ,'{191}',5);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-193',193,'Calculus 2','Differentiation and integration of transcendental function. Techniques and applications of integration. Polar coordinates. Infinite sequences and series, power series, convergence. Satisfies the General Education Quantitative Reasoning Requirement.'
    ,'{191}',5);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-271',271,' Foundations of Higher Mathematics','Topics include logic, methods of mathematical proof, set theory, relations and functions. Introduction to complex numbers and proof strategies using ideas of vector algebra. Meant to prepare students for mathematics program as well as concepts of computer science'
    ,'{191}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-123',123,'Intro to Computer Science and Programming 2','Fundamental programming concepts using arrays, records, pointers, linked list, trees and recursion. Good style, documentation and structure will be emphasized. Introduction to analysis of algorithms for efficiency and correctness.'
    ,'{121}',4);






Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('PHY-132',132,'General Physics 2','Waves, light, electricity and magnetism'
    ,'{193,130}',5);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-221',221,'Assembly Language and Intro to Computer Organization','Programming problems in assembly language. Writing and using macros. Features of modern computer hardware and operating systems.'
    ,'{121}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-2xx',200,'Lower Division Elective','Student needs to choose from a list an electives'
    ,'{121}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-281',281,'Discrete Mathematics','Matrix algebra, graph theory, trees, combinatorics, Boolean algebra; with applications to computers and computer programming.'
    ,'{153,121}',3);







Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-311',311,'Data Structures','More advanced and detailed treatment of concepts of data organization introduced in CSC 123. Includes lists, trees, graphs and storage allocation and collection. Applications to such areas as symbol tables, string search and optimization.'
    ,'{123,281}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-321',321,'Programming Languages','A comparative study of programming languages. Characteristics of languages and formal description of languages. Assignments in several languages.'
    ,'{123}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-301',301,'Computers and Society','Ethical, legal, psychological, economic, and theoretical implications and limitations of the uses of digital computers. Oral and written presentations required.'
    ,'{121}',3);








Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('MAT-321',3210,'Probability and Statistics','A calculus based survey of topics in probability and statistics emphasizing applications.'
    ,'{193,271}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-331',331,'Computer Organization','Structure of the modern digital computer. Introduction to Boolean algebra and design of digital circuits. Arithmetic, control, storage and input/output systems.'
    ,'{221,281}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-401',401,'Analysis of Algorithms','Mathematical study of non-numeric computer algorithms. Topics include combinatorial techniques, algorithm proof, and program complexity.'
    ,'{311}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-471',471,'Compiler Construction 1','Introduction to the theory and practice of compiler construction. Overall structure of compilers. Lexical and syntactic analysis, code generation for block structured languages and code optimization'
    ,'{221,311}',3);




Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-341',341,'Operating Systems','Overall structure of batch and time-shared operating systems. Scheduling of jobs, CPU and I/O devices. Paged and segmented memory management. I/O programming and file handling. Synchronization of concurrent processes.'
    ,'{311,331,3210}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-3xx',300,'Upper Division Elective 1','Student needs to choose from a list an electives'
    ,'{311}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-3xy',302,'Upper Division Elective 2','Student needs to choose from a list an electives'
    ,'{311}',3);







Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-481',481,'Software Engineering','Introduction to software engineering, with emphasis on software design and specification.'
    ,'{301,311,321}',3);

Insert INTO courses (keyNumber,number, name, description, prerequisites,credits)
    VALUES ('CSC-492',492,'Senior Project',' Intensive study under the guidance of a member of the Computer Science faculty which continues and expands the research carried out in Senior Seminar. Students will study system design and total project planning and management.'
    ,'{301,321,481}',3);

