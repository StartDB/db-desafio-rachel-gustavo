package com.cuidarmais.demo.ControllerTests;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cuidarmais.demo.Controllers.TaskController;

@SpringBootTest
public class TaskControllerTests {
    
    @Autowired
    private TaskController taskController;

    @Test
    void smokeTest() throws Exception {
        assertThat(taskController).isNotNull();
    }
}
