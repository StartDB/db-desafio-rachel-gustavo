package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Services.UserService;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;
    
    @GetMapping("/listAll")
    public List<User> getAllUsers() {
        return userService.listAll();
    }
    
}
