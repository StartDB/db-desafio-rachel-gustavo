package com.cuidarmais.demo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.EntityObjects.Address;


public record UpdateUserDTO (Long id,

String firstName,

String lastName,

String username,

String password,

String email,

int phone,

LocalDate birthdate,

Address address,

String description,

LocalDateTime createdAt,

List<Task> tasks) {
    
    

}
