package com.cuidarmais.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Volunteer")
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
