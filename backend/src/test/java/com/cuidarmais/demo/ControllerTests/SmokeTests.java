package com.cuidarmais.demo.ControllerTests;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cuidarmais.demo.Controllers.ElderlyController;
import com.cuidarmais.demo.Controllers.TaskController;
import com.cuidarmais.demo.Controllers.UserController;
import com.cuidarmais.demo.Controllers.VolunteerController;


@SpringBootTest
public class SmokeTests {
    
    @Autowired
    private TaskController taskController;

    @Autowired
    private UserController userController;

    @Autowired
    private VolunteerController volunteerController;

    @Autowired
    private ElderlyController elderlyController;

    @Test
    void taskTest() throws Exception {
        assertThat(taskController).isNotNull();
    }

    @Test
    void userTest() throws Exception {
        assertThat(userController).isNotNull();
    }

    @Test
    void volunteerTest() throws Exception {
        assertThat(volunteerController).isNotNull();
    }

    @Test
    void elderlyTest() throws Exception {
        assertThat(elderlyController).isNotNull();
    }

}