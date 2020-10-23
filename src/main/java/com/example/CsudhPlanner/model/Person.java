package com.example.CsudhPlanner.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;
import java.util.ArrayList;


public class Person {

    @NonNull
    private final Integer id;

    @NonNull
    private final String name;
    private final String email;
    @NonNull
    private final ArrayList<Integer> completedCourses;
    @NonNull
    private final String password;


    public Person(@NonNull @JsonProperty("id") Integer id,
                  @NonNull @JsonProperty("name") String name,
                  @NonNull @JsonProperty("email") String email,
                  @NonNull @JsonProperty("completedCourses") ArrayList<Integer> completed,
                  @NonNull @JsonProperty("password") String password) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.completedCourses = completed;
        this.password = password;
    }


    @NonNull
    public Integer getId(){
        return id;
    }

    @NonNull
    public String getName(){
        return name;
    }

    public String getEmail(){
        return email;
    }

    public String getPassword(){ return password;}

    @NonNull
    public ArrayList<Integer> getCompletedCourses(){
        return completedCourses;
    }
}
