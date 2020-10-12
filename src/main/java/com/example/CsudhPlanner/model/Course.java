package com.example.CsudhPlanner.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

public class Course {

    private final int number;

    @NonNull
    private final String name;
    private final String description;
    private final ArrayList<Integer> prerequisites;


    public Course(@NonNull@JsonProperty("number") int number,
                  @NonNull @JsonProperty("name") String name,
                  @JsonProperty("description") String description,
                  @JsonProperty("prerequisites") ArrayList<Integer> prerequistes) {
        this.number = number;
        this.name = name;
        this.description = description;
        this.prerequisites = prerequistes;
    }


    public int getNumber(){
        return this.number;
    }

    @NonNull
    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

    public ArrayList<Integer> getPrerequistes(){
        return prerequisites;
    }
}