package com.example.CsudhPlanner.service;


import com.example.CsudhPlanner.dao.personDao;
import com.example.CsudhPlanner.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final personDao personDao;

    @Autowired
    public CourseService(@Qualifier("postgres") personDao personDao){
        this.personDao = personDao;
    }

    //Repeating Methods to return back to the front end

    public int addCourse(Course csc){
        return personDao.insertCourse(csc);
    }

    public List<Course> getAllCourses(){
        return personDao.selectAllCourses();
    }

    public Optional<Course> getCourseById(int id){
        return personDao.selectCourseById(id);
    }

    public int deleteCourseById(int id){return personDao.deleteCourseById(id);}

    public int updateCourse(int id, Course newCourse){return personDao.updateCourseById(id,newCourse);}


}
