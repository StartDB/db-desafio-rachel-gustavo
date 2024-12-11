package com.cuidarmais.demo.DTO;

import com.cuidarmais.demo.Entities.User;

public record LoginResponseDTO(String role, User user) {
    
}
