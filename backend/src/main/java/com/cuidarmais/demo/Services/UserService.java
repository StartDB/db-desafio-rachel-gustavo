package com.cuidarmais.demo.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.User;

@Repository
public class UserService {

    private List<User> users;

    public UserService() {
        this.users = new ArrayList<User>();
    }

    public User createUser(User user) {
        users.add(user);
        return user;
   }

   public List<User> getUsers() {
        return users;
   }
}
