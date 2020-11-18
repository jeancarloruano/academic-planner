package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface personDao {

    int insertPerson(Person person);

    List<Person> selectAllPeople();

    Optional<Person> selectPersonById(Integer id);

    Optional<Person> selectPersonByEmail(String email);

    int deletePersonById(int id);

    int updatePersonById(int id, Person person);

    ArrayList<ArrayList<Course>> standardPlan(String email);

    ArrayList<ArrayList<Course>> acceleratedPlan(String email);

    ArrayList<ArrayList<Course>> partTimePlan(String email);

    boolean checkPassword(String email,String password);

    ArrayList<String> currentCourses(String email);

    ArrayList<String> neededCourses(int id);

    Integer schoolPlan(int id);




    int insertCourse(Course course);

    List<Course> selectAllCourses();

    Optional<Course> selectCourseById(String keyNumber);

    int deleteCourseById(int number);

    int updateCourseById(int number, Course course);

}
