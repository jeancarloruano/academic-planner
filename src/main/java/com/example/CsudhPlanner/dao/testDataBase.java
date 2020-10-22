package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("testdb")
public class testDataBase implements personDao {

    private static List<Person> DBperson = new ArrayList<>();

    @Override
    public int insertPerson(Person person) {
        DBperson.add(new Person(person.getId(),person.getName(),person.getEmail(),person.getCompletedCourses()));
        return 0;
    }

    @Override
    public List<Person> selectAllPeople() {
        return DBperson;
    }

    @Override
    public Optional<Person> selectPersonById(Integer id) {
        return DBperson.stream()
                .filter(person -> person.getId().equals(id))
                .findFirst();
    }

    @Override
    public int deletePersonById(int id) {
        return 0;
    }

    @Override
    public int updatePersonById(int id, Person person) {
        return 0;
    }

    @Override
    public ArrayList<Integer> getPersonsNeededCourseList(String name, Person person) {
        ArrayList<Integer> test = new ArrayList<>();
        return test;
    }

    @Override
    public int insertCourse(Course course) {
        return 0;
    }

    @Override
    public List<Course> selectAllCourses() {
        return null;
    }

    @Override
    public Optional<Course> selectCourseById(Integer id) {
        return Optional.empty();
    }

    @Override
    public int deleteCourseById(int number) {
        return 0;
    }

    @Override
    public int updateCourseById(int number, Course course) {
        return 0;
    }
}
