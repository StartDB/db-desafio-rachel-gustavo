package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.LoginDTO;
import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public ResponseEntity<?> login(LoginDTO login) {

        try {

        User user = userRepository.findLogin(login.username(), login.password())
        .orElseThrow(() -> new IllegalArgumentException("Usuário ou senha inválidos."));

            return ResponseEntity.ok(user);
        

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Erro ao tentar realizar o login");
        }
    }
    

}
