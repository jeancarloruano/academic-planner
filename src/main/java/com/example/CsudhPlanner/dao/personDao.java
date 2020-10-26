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

    int deletePersonById(int id);

    int updatePersonById(int id, Person person);

    List<Course> NeededCourseList(int id,String name, Person person);

    ArrayList<ArrayList<Course>> standardPlan();

    ArrayList<ArrayList<Course>> acceleratedPlan();

    public ArrayList<ArrayList<Course>> partTimePlan();


    int insertCourse(Course course);

    List<Course> selectAllCourses();

    Optional<Course> selectCourseById(Integer id);

    int deleteCourseById(int number);

    int updateCourseById(int number, Course course);

}
