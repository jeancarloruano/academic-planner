package com.example.CsudhPlanner.service;

import com.example.CsudhPlanner.dao.personDao;
import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PersonService {

    private final personDao personDao;

    @Autowired
    public PersonService(@Qualifier("postgres") personDao personDao){
        this.personDao = personDao;
    }

    //Repeating Methods to return back to the front end

    public int addPerson(Person person){
        return personDao.insertPerson(person);
    }

    public List<Person> getAllPeople(){
        return personDao.selectAllPeople();
    }

    public Optional<Person> getPersonById(Integer id){
        return personDao.selectPersonById(id);
    }

    public Integer deletePersonById(int id){return personDao.deletePersonById(id);}

    public Integer updatePerson(int id, Person newPerson){return personDao.updatePersonById(id,newPerson);}

    public List<Course> NeededCourseList(int id,String name, Person person){return personDao.NeededCourseList(id,name,person);}


}
