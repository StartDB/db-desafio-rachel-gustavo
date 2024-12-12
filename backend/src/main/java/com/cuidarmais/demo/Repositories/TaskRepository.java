package com.cuidarmais.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuidarmais.demo.Entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
