package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.LoginDTO;
import com.cuidarmais.demo.DTO.LoginResponseDTO;
import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public LoginResponseDTO login(LoginDTO login) {

        User user = userRepository.findLogin(login.username(), login.password());

        String role = userRepository.findRoleByUsername(user.getUsername());

        LoginResponseDTO loginResponse = new LoginResponseDTO(role, user);

        return loginResponse;
    }
    

}
