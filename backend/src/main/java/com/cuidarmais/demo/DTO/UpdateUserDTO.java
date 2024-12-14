package com.cuidarmais.demo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Entities.EntityObjects.Address;

public record UpdateUserDTO(

        Long id,

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

        List<Task> tasks,

        double rating) {

    public static Volunteer mergeUpdateToVolunteer(UpdateUserDTO userDTO, Volunteer volunteer) {
        if (userDTO.firstName() != null) {
            volunteer.setFirstName(userDTO.firstName());
        }
        if (userDTO.lastName() != null) {
            volunteer.setLastName(userDTO.lastName());
        }
        if (userDTO.username() != null) {
            volunteer.setUsername(userDTO.username());
        }
        if (userDTO.password() != null) {
            volunteer.setPassword(userDTO.password());
        }
        if (userDTO.email() != null) {
            volunteer.setEmail(userDTO.email());
        }
        if (userDTO.phone() != 0) {
            volunteer.setPhone(userDTO.phone());
        }
        if (userDTO.birthdate() != null) {
            volunteer.setBirthdate(userDTO.birthdate());
        }
        if (userDTO.address() != null) {
            volunteer.setAddress(userDTO.address());
        }
        if (userDTO.description() != null) {
            volunteer.setDescription(userDTO.description());
        }
        if (userDTO.createdAt() != null) {
            volunteer.setCreatedAt(userDTO.createdAt());
        }
        if (userDTO.tasks() != null && !userDTO.tasks().isEmpty()) {
            volunteer.setTasks(userDTO.tasks());
        }
        if (userDTO.rating() != 0) {
            volunteer.setRating(userDTO.rating());
        }
    
        return volunteer;
    }

    public static Elderly mergeUpdateToElderly(UpdateUserDTO userDTO, Elderly elderly) {
        if (userDTO.firstName() != null) {
            elderly.setFirstName(userDTO.firstName());
        }
        if (userDTO.lastName() != null) {
            elderly.setLastName(userDTO.lastName());
        }
        if (userDTO.username() != null) {
            elderly.setUsername(userDTO.username());
        }
        if (userDTO.password() != null) {
            elderly.setPassword(userDTO.password());
        }
        if (userDTO.email() != null) {
            elderly.setEmail(userDTO.email());
        }
        if (userDTO.phone() != 0) {
            elderly.setPhone(userDTO.phone());
        }
        if (userDTO.birthdate() != null) {
            elderly.setBirthdate(userDTO.birthdate());
        }
        if (userDTO.address() != null) {
            elderly.setAddress(userDTO.address());
        }
        if (userDTO.description() != null) {
            elderly.setDescription(userDTO.description());
        }
        if (userDTO.createdAt() != null) {
            elderly.setCreatedAt(userDTO.createdAt());
        }
        if (userDTO.tasks() != null && !userDTO.tasks().isEmpty()) {
            elderly.setTasks(userDTO.tasks());
        }
    
        return elderly;
    }
            
}
