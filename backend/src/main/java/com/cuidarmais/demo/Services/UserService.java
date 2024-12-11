package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }

    public List<User> listAll() {
        return this.userRepository.findAll();
    }
}
