package com.cuidarmais.demo.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("elderly")
public class Elderly extends User {

    @OneToMany(mappedBy = "requestBy")
    private List<Task> tasks = new ArrayList<>();

    public Elderly() {}

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    
}
