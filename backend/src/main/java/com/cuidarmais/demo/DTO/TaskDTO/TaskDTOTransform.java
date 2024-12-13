package com.cuidarmais.demo.DTO.TaskDTO;

import java.util.List;
import java.util.stream.Collectors;

import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.User;

public class TaskDTOTransform {
    public static TaskDTO transformToTaskDTO(Task taskList) {
        if (taskList == null) {
            return null;
        }
        return new TaskDTO(taskList.getId(),
         taskList.getTitle(),
          taskList.getSupportType(),
           taskList.isOnline(),
            taskList.getDescription(),
             taskList.getDate(),
             taskList.getTime(),
              taskList.getCity(),
               taskList.getState(),
                taskList.getStatus(),
                 transformToUserTaskDTO(taskList.getRequestBy()),
                  transformToUserTaskDTO(taskList.getVolunteer()));
    }

    public static UserTaskDTO transformToUserTaskDTO(User user) {
        if (user == null) {
            return null;
        }
        return new UserTaskDTO(user.getId(), user.getFirstName(), user.getLastName());
    }

    public static List<TaskDTO> transformToTaskDTOList (List<Task> taskList) {
        return taskList.stream().map(task -> transformToTaskDTO(task)).collect(Collectors.toList());
    }
}
