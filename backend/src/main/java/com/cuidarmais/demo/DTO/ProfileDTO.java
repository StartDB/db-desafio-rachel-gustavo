package com.cuidarmais.demo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Entities.EntityObjects.Address;

public record ProfileDTO (Long id, String firstName, String lastName, String username, String email, int phone,
            LocalDate birthdate, Address address, String description, LocalDateTime createdAt) {

    public static ProfileDTO transformToProfileDTO(User user) {
        return new ProfileDTO(
            user.getId(), 
            user.getFirstName(), 
            user.getLastName(), 
            user.getUsername(), 
            user.getEmail(), 
            user.getPhone(), 
            user.getBirthdate(),          
            user.getAddress(), 
            user.getDescription(), 
            user.getCreatedAt());
    }
}
