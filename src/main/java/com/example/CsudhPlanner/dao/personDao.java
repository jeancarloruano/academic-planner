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

    ArrayList<ArrayList<Course>> standardPlan(int id);

    ArrayList<ArrayList<Course>> acceleratedPlan(int id);

    ArrayList<ArrayList<Course>> partTimePlan(int id);

    boolean checkPassword(String email,String password);

    ArrayList<Integer> currentCourses(int id);

    ArrayList<Integer> neededCourses(int id);

    Integer schoolPlan(int id);




    int insertCourse(Course course);

    List<Course> selectAllCourses();

    Optional<Course> selectCourseById(Integer id);

    int deleteCourseById(int number);

    int updateCourseById(int number, Course course);

}
