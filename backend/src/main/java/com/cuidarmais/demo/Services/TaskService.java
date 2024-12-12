package com.cuidarmais.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Repositories.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        
        taskRepository.save(task);

        return task;
    }
}
