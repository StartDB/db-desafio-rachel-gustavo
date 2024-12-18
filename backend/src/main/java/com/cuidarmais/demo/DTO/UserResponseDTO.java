package com.cuidarmais.demo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Entities.EntityObjects.Address;

public record UserResponseDTO (Long id, String firstName, String lastName, String username, String password, String email, int phone,
            LocalDate birthdate, Address address, String description, LocalDateTime createdAt, String role, String token) {

    public static UserResponseDTO transformToUserResponseDTO(User user, String generatedToken) {
        
        return new UserResponseDTO(
            user.getId(), 
            user.getFirstName(), 
            user.getLastName(), 
            user.getUsername(), 
            user.getPassword(),
            user.getEmail(), 
            user.getPhone(), 
            user.getBirthdate(),          
            user.getAddress(), 
            user.getDescription(), 
            user.getCreatedAt(),
            (user instanceof Volunteer) ? "volunteer" : "elderly",
            generatedToken);
    }
}
