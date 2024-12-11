package com.cuidarmais.demo.Entities;

import jakarta.persistence.Entity;

@Entity
public class Volunteer extends User {

    private double rating;

    public Volunteer() {}

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

}
