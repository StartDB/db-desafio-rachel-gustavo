package com.cuidarmais.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Services.UserService;



@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;
    
}
