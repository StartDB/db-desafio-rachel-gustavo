package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;
import com.cuidarmais.demo.Services.TaskService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


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

    @GetMapping("/listAll")
    public List<Task> getAllTasks() {
        return taskService.listAll();
    }
    
    @GetMapping("/listForVolunteer/{SupportType}")
    public List<Task> getTasksWithFilter(@PathVariable SupportType SupportType) {
        return taskService.getTypeFilter(SupportType);
    }
    
}
