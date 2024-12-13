package com.cuidarmais.demo.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.TaskDTO.TaskDTO;
import com.cuidarmais.demo.DTO.TaskDTO.TaskDTOTransform;
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

    public List<TaskDTO> listAll() {
        return TaskDTOTransform.transformToTaskDTOList(taskRepository.findAll());
    }

    public List<TaskDTO> getStatusTypeFilter(SupportType supportType, Status status) {
        List<Task> taskList = new ArrayList<Task>();

        if (supportType != null && status != null) {
            taskList = taskRepository.findBySupportTypeAndStatusOrderByDateAsc(supportType, status);
        } else if (supportType == null) {
            taskList = taskRepository.findByStatusOrderByDateAsc(status);
        } else if (status == null ) {
            taskList = taskRepository.findBySupportTypeOrderByDateAsc(supportType);
        }
        return TaskDTOTransform.transformToTaskDTOList(taskList);
        }
    }

