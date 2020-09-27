package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Person;
import java.util.List;
import java.util.Optional;
import java.lang.Math;


public interface personDao {

    //Inserst person into database with a set UUID



    //Inserst person into data base with a random UUID
    int insertPerson(Person person);

    List<Person> selectAllPeople();


    Optional<Person> selectPersonById(int id);

    int deletePersonById(int id);

    int updatePersonById(int id, Person person);

}
