package com.cuidarmais.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuidarmais.demo.Entities.User;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

}
