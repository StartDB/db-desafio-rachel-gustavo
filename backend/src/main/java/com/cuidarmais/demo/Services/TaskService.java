package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.Status;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;
import com.cuidarmais.demo.Repositories.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        
        taskRepository.save(task);

        return task;
    }

    public List<Task> listAll() {
        return taskRepository.findAll();
    }

    public List<Task> getStatusTypeFilter(SupportType supportType, Status status) {
        if (supportType != null && status != null) {
            return taskRepository.findBySupportTypeAndStatusOrderByDateAsc(supportType, status);
        } else if (supportType == null) {
            return taskRepository.findByStatusOrderByDateAsc(status);
        } else if (status == null ) {
            return taskRepository.findBySupportTypeOrderByDateAsc(supportType);
        } else {
            return taskRepository.findAll();
        }
    }
}
