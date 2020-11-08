package com.example.CsudhPlanner.api;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import com.example.CsudhPlanner.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping(path = "/email/{email}")
    public Person getPersonByEmail(@PathVariable("email") String email){
        return personService.getPersonByEmail(email).orElse(null);
    }


    @DeleteMapping(path = "{id}")
    public void deletePersonById(@PathVariable("id") int id){
        personService.deletePersonById(id);
    }

    @PutMapping(path = "{id}")
    public void updatePerson(@PathVariable("id") int id ,@NonNull @RequestBody Person personToUpdate){
        personService.updatePerson(id, personToUpdate);
    }

    @GetMapping(path = "/{id}/standardPlan")
    public ArrayList<ArrayList<Course>> standardPlan(@PathVariable("id") int id){
        return personService.standardPlan(id);
    }

    @GetMapping(path = "/{id}/acceleratedPlan")
    public ArrayList<ArrayList<Course>> acceleratedPlan(@PathVariable("id") int id){return personService.acceleratedPlan(id);}

    @GetMapping(path = "/{id}/partTimePlan")
    public ArrayList<ArrayList<Course>> partTimePlan(@PathVariable("id") int id){return  personService.partTimePlan(id);}

    @GetMapping(path = "/checkPass/{email}/{password}")
    public boolean checkPass(@PathVariable("email") String email,@PathVariable("password") String password){ return personService.checkPassword(email,password);}

    @GetMapping(path = "/currentCourses/{id}")
    public ArrayList<Integer> currentCourses(@PathVariable("id") int id){ return personService.currentCourses(id);}

    @GetMapping(path = "/neededCourses/{id}")
    public ArrayList<Integer> neededCourses(@PathVariable("id") int id){return personService.neededCourses(id);}

    @GetMapping(path = "/schoolPlan/{id}")
    public Integer schoolPlan(@PathVariable("id") int id){return  personService.schoolPlan(id);}

}
