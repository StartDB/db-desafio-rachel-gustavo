package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.DTO.TaskDTO.TaskDTO;
import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.Status;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;
import com.cuidarmais.demo.Services.TaskService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/task")
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    @PostMapping("/save")
    public ResponseEntity<Object> saveTask(@RequestBody Task task) {

        try {

        taskService.saveTask(task);
        
        return ResponseEntity.ok("Cadastro salvo com sucesso!");

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }

    @GetMapping("/listAll")
    public List<TaskDTO> getAllTasks() {
        return taskService.listAll();
    }

    @GetMapping("/status-type-filter")
    public List<TaskDTO> getTasks(@RequestParam(required = false) SupportType supportType, 
                                        @RequestParam (required = false) Status status) {
        return taskService.getStatusTypeFilter(supportType, status);
    }
    
    
}
