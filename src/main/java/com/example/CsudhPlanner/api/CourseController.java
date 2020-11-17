package com.example.CsudhPlanner.api;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/course")
@RestController
public class CourseController {


    private final CourseService CourseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.CourseService = courseService;
    }


    //Types of request methods for the database
    //Methods will be moved through the files in a similar fashion.

    @PostMapping
    public void addCourse(@NonNull@RequestBody Course course){
        CourseService.addCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses(){
        return CourseService.getAllCourses();
    }

    @GetMapping(path = "{keyNumber}")
    public Course getCourseById(@PathVariable("keyNumber") String keyNumber){
        return CourseService.getCourseById(keyNumber).orElse(null);
    }


    @DeleteMapping(path = "{id}")
    public void deleteCourseById(@PathVariable("id") int id){
        CourseService.deleteCourseById(id);
    }

    @PutMapping(path = "{id}")
    public void updateCourse(@PathVariable("id") int id ,@NonNull @RequestBody Course CourseToUpdate){
        CourseService.updateCourse(id, CourseToUpdate);}

}
