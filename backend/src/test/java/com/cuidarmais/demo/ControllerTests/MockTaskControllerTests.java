package com.cuidarmais.demo.ControllerTests;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.Controllers.TaskController;
import com.cuidarmais.demo.DTO.TaskDTO.TaskDTO;
import com.cuidarmais.demo.Services.TaskService;

@WebMvcTest(TaskController.class)
public class MockTaskControllerTests {
    
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService taskService;

    @Test
    void getTasks() throws Exception {
        List<TaskDTO> mockList = new ArrayList<TaskDTO>();
        when(taskService.getStatusTypeFilter(null, null)).thenReturn(mockList);
        this.mockMvc.perform(get("/task/SupportTypeOrStatusFilter"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
        }
    }
