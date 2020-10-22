package com.example.CsudhPlanner.api;

import com.example.CsudhPlanner.model.Person;
import com.example.CsudhPlanner.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/person")
@RestController
public class PersonController {


    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }


    //Types of request methods for the database
    //Methods will be moved through the files in a similar fashion.

    @PostMapping
    public void addPerson(@NonNull@RequestBody Person person){
        personService.addPerson(person);
    }

    @GetMapping
    public List<Person> getAllPeople(){
        return personService.getAllPeople();
    }

    @GetMapping(path = "{id}")
    public Person getPersonById(@PathVariable("id") int id){
        return personService.getPersonById(id).orElse(null);
    }


    @DeleteMapping(path = "{id}")
    public void deletePersonById(@PathVariable("id") int id){
        personService.deletePersonById(id);
    }

    @PutMapping(path = "{id}")
    public void updatePerson(@PathVariable("id") int id ,@NonNull @RequestBody Person personToUpdate){
        personService.updatePerson(id, personToUpdate);
    }

    @GetMapping(path = "{id/name}")
    public void NeededCourseList(@PathVariable("id")int id,String name, @NonNull @RequestBody Person person){
        personService.NeededCourseList(id,name,person);
    }

}
