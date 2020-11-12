package com.example.CsudhPlanner.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

public class Course {

    private final String keyNumber;
    private final int number;

    @NonNull
    private final String name;
    private final String description;
    private final ArrayList<Integer> prerequisites;
    private final int credits;


    public Course(@NonNull @JsonProperty("KeyNumber") String keyNumber,
                  @NonNull @JsonProperty("Number") int number,
                  @NonNull @JsonProperty("Name") String name,
                  @JsonProperty("Description") String description,
                  @JsonProperty("Prerequisites") ArrayList<Integer> prerequistes,
                  @JsonProperty("Credits") int credits) {
        this.keyNumber = keyNumber;
        this.number = number;
        this.name = name;
        this.description = description;
        this.prerequisites = prerequistes;
        this.credits = credits;
    }


    public int getNumber(){
        return this.number;
    }

    public String getKeyNumber(){return this.keyNumber;}

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

    public int getCredits(){return credits;}
}
