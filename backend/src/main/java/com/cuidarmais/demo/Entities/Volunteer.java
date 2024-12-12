package com.cuidarmais.demo.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("volunteer")
public class Volunteer extends User {

    private double rating;

    @OneToMany(mappedBy = "volunteer")
    private List<Task> tasks = new ArrayList<>();

    public Volunteer() {}

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

}
