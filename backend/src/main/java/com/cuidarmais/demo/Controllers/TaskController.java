package com.cuidarmais.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Services.TaskService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/task")
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    @PostMapping("/save")
    public Task saveTask(@RequestBody Task task) {

        taskService.saveTask(task);

        return task;
    }
    
}
