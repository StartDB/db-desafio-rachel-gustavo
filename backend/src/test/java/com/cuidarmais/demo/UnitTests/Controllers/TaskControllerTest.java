package com.cuidarmais.demo.UnitTests.Controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.Controllers.TaskController;
import com.cuidarmais.demo.Entities.Task;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.Status;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;
import com.cuidarmais.demo.Services.TaskService;


@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    TaskService taskService;

    @Test
    void testSaveTaskSuccess() throws Exception {
        String validTaskJson = """
            {
              "title": "Corporate Takeover Assistance",
              "supportType": "TEACHING_AND_TECHNOLOGY",
              "isOnline": true,
              "description": "Assist with preparing and presenting a corporate takeover plan. Support with research, data compilation, and tech setup.",
              "date": "2024-12-31",
              "time": "10:00:00",
              "city": "New York",
              "state": "NY",
              "status": "AVAILABLE",
              "requestBy": { "id": 1, "role": "elderly" },
              "volunteer": { "id": 2, "role": "volunteer" }
            }
            """;

        Mockito.when(taskService.saveTask(Mockito.any(Task.class)))
                .thenReturn(ResponseEntity.ok("Tarefa criada com sucesso!"));

        mockMvc.perform(post("/task/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validTaskJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Tarefa criada com sucesso!"));
    }

    @Test
    void testSaveTaskDataIntegrityViolation() throws Exception {
        String duplicateTaskJson = """
            {
              "title": "Crisis Management for Scandal",
              "supportType": "MAINTENANCE_AND_REPAIRS",
              "isOnline": false,
              "description": "Help a team address a major corporate scandal, ensuring documents are reviewed and public statements are prepared efficiently.",
              "date": "2024-07-15",
              "time": "09:00:00",
              "city": "Los Angeles",
              "state": "CA",
              "status": "AVAILABLE",
              "requestBy": { "id": 1, "role": "elderly" },
              "volunteer": { "id": 2, "role": "volunteer" }
            }
            """;

        Mockito.when(taskService.saveTask(Mockito.any(Task.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Detail: Key (title)=(Company Retreat) already exists."));

        mockMvc.perform(post("/task/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(duplicateTaskJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Detail: Key (title)=(Company Retreat) already exists."));
    }

        @Test
    public void testGetTasksStatusTypeFilter_WithSupportTypeAndStatus() throws Exception {
        SupportType supportType = SupportType.SOCIAL_ACTIVITIES;
        Status status = Status.AVAILABLE;
        List<Task> tasks = Arrays.asList(new Task(), new Task());
        when(taskService.getStatusTypeFilter(supportType, status)).thenReturn(ResponseEntity.ok(tasks));

        mockMvc.perform(get("/task/status-type-filter")
                .param("supportType", supportType.name())
                .param("status", status.name()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

}