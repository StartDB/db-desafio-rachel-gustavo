package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Services.UserService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UserController {

    @Autowired
    public UserService userService;
    
}
