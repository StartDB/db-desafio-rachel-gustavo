package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.DTO.LoginDTO;
import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;
    
    @GetMapping("/listAll")
    public List<User> getAllUsers() {
        return userService.listAll();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO login) {

        return userService.login(login);
    }
    
}
