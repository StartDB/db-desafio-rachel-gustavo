package com.cuidarmais.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.LoginDTO;
import com.cuidarmais.demo.DTO.LoginResponseDTO;
import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Infrastructure.Utils.TokenService;
import com.cuidarmais.demo.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public ResponseEntity<Object> login(LoginDTO login) {

        try {

        Optional<User> userOpt = userRepository.findByUsername(login.username());

        User user = userOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado."));
        
        if (user.getPassword().equals(login.password())) {
            LoginResponseDTO loginResponse = LoginResponseDTO.transformToLoginResponseDTO(user, tokenService.generateToken(user));
            return ResponseEntity.ok(loginResponse);
        }
        
        throw new IllegalArgumentException("Senha inválida");

        } catch (NoSuchElementException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Erro ao tentar realizar o login");
    }
    
    }

    public ResponseEntity<Object> getUserByToken(String token) {

        try {

        String username = tokenService.validadeToken(token);

        Optional<User> userOpt = userRepository.findByUsername(username);

        User user = userOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado."));
        
        LoginResponseDTO loginResponse = LoginResponseDTO.transformToLoginResponseDTO(user, tokenService.generateToken(user));
        return ResponseEntity.ok(loginResponse);

        } catch (NoSuchElementException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Erro ao validar a entrada automática");
    }
    
    }

}
