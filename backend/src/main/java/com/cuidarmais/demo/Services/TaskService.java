package com.cuidarmais.demo.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.TaskDTO.TaskDTO;
import com.cuidarmais.demo.DTO.TaskDTO.TaskDTOTransform;
import com.cuidarmais.demo.DTO.TaskDTO.TaskSaveResponseDTO;
import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.Status;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;
import com.cuidarmais.demo.Repositories.TaskRepository;
import com.cuidarmais.demo.Repositories.VolunteerRepository;


@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired VolunteerRepository volunteerRepository;

    public ResponseEntity<Object> saveTask(Task task) {
        
       try {
        taskRepository.save(task);
        
        return ResponseEntity.ok(new TaskSaveResponseDTO(task.getId(), "Tarefa Criada com Sucesso"));

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }

    public List<TaskDTO> listAll() {
        return TaskDTOTransform.transformToTaskDTOList(taskRepository.findAll());
    }

    public ResponseEntity<Object> getStatusTypeFilter(SupportType supportType, Status status) {
        try {

        List<Task> taskList = new ArrayList<Task>();

        if (supportType != null && status != null) {
            taskList = taskRepository.findBySupportTypeAndStatusOrderByDateAsc(supportType, status);
        } else if (supportType != null) {
            taskList = taskRepository.findBySupportTypeOrderByDateAsc(supportType);
        } else if (status != null ) {
            taskList = taskRepository.findByStatusOrderByDateAsc(status);
        }
        
        return ResponseEntity.ok(TaskDTOTransform.transformToTaskDTOList(taskList));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido");
        }
    }

    public ResponseEntity<Object> getTaskById(Long id) {
        try {

            Optional<Task> taskOpt = taskRepository.findById(id);

            Task task = taskOpt.orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));

            return ResponseEntity.ok(TaskDTOTransform.transformToTaskDTO(task));

        } catch (NoSuchElementException ex) {
                
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }

    public ResponseEntity<Object> updateTaskStatus(Long id, String button, Long volunteerId) {
        try {

            Optional<Task> taskOpt = taskRepository.findById(id);

            Task task = taskOpt.orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));

            switch (button) {
                case "accept":
                    task.setStatus(Status.ACCEPTED);

                    Optional<Volunteer> volunteerOpt = volunteerRepository.findById(volunteerId);

                    Volunteer volunteer = volunteerOpt.orElseThrow(() -> new NoSuchElementException("Voluntário não encontrado"));

                    task.setVolunteer(volunteer);
                    break;

                case "unlink":
                    task.setStatus(Status.AVAILABLE);
                    task.setVolunteer(null);
                    break;

                case "complete":
                    task.setStatus(Status.COMPLETED);
                    break; 
                    
                case "cancel":
                    task.setStatus(Status.CANCELED);
                    break;
                default:
                    break;
            }

            taskRepository.save(task);
            
            return ResponseEntity.ok(TaskDTOTransform.transformToTaskDTO(task));
    
            } catch (NoSuchElementException ex) {
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            
            } catch (DataIntegrityViolationException ex) {
            
            String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);
    
            } catch (JpaSystemException ex) {

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro em atualizar o status");

            } catch (Exception ex) {
    
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
        }
    }

    }

