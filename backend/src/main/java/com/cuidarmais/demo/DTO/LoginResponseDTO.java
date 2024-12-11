package com.cuidarmais.demo.DTO;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.Role;

public record LoginResponseDTO(Role role, User user) {
    
}
