package com.cuidarmais.demo.Entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.cuidarmais.demo.Entities.EntityObjects.Address;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("elderly")
public class Elderly extends User {

    @OneToMany(mappedBy = "requestBy")
    private List<Task> tasks = new ArrayList<>();

    public Elderly() {}
    
    public Elderly(Long id, String firstName, String lastName, String username, String password, String email, int phone,
            LocalDate birthdate, Address address, String description, LocalDateTime createdAt, List<Task> tasks) {
        super(id, firstName, lastName, username, password, email, phone,
        birthdate, address, description, createdAt);
        this.tasks = tasks;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    
}
