package com.cuidarmais.demo.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("elderly")
public class Elderly extends User {

    @OneToMany(mappedBy = "elderly")
    private List<Task> tasks = new ArrayList<>();

    public Elderly() {}
}
