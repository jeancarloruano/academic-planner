package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Person;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface personDao {

    //Inserst person into database with a set UUID
    int insertPerson(UUID id, Person person);


    //Inserst person into data base with a random UUID
    default int insertPerson(Person person) {
        UUID id = UUID.randomUUID();
        return insertPerson(id,person);
    }

    List<Person> selectAllPeople();


    Optional<Person> selectPersonById(UUID id);

    int deletePersonById(UUID id);

    int updatePersonById(UUID id, Person person);

}
