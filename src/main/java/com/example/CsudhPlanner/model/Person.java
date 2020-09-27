package com.example.CsudhPlanner.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;
import java.lang.Math;


public class Person {

    private final int id;

    @NonNull
    private final String name;

    public Person(@JsonProperty("id") int id,
                  @NonNull @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }


    public int getId(){
        return this.id;
    }

    @NonNull
    public String getName(){
        return name;
    }
}
