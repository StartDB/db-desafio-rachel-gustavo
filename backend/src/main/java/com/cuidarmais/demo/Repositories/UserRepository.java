package com.cuidarmais.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cuidarmais.demo.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from users u where u.username = :username and u.password = :password")
    public User findLogin(String username, String senha);
}
