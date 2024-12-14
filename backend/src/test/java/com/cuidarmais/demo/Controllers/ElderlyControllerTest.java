package com.cuidarmais.demo.Controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Entities.EntityObjects.Address;
import com.cuidarmais.demo.Services.ElderlyService;

@WebMvcTest(ElderlyController.class)
public class ElderlyControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    ElderlyService elderlyService;


    @Test
    void testGetByIdSuccess() throws Exception {
   
    Elderly loganRoy = new Elderly(1L, "Logan", "Roy", "loganroy", "securepassword", "logan@waystar.com", 
            555123456, LocalDate.of(1940, 10, 14), 
            new Address("10001", "5th Avenue", "50", "Penthouse", "New York", "Manhattan", "NY"),
            "The ruthless patriarch of the Roy family.", LocalDateTime.now(), null);

    Mockito.when(elderlyService.getById(1L)).thenReturn(ResponseEntity.ok(loganRoy));

    mockMvc.perform(get("/elderly/getById")
                    .param("id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1L))
            .andExpect(jsonPath("$.firstName").value("Logan"))
            .andExpect(jsonPath("$.lastName").value("Roy"))
            .andExpect(jsonPath("$.username").value("loganroy"))
            .andExpect(jsonPath("$.email").value("logan@waystar.com"))
            .andExpect(jsonPath("$.description").value("The ruthless patriarch of the Roy family."))
            .andExpect(jsonPath("$.address.zip").value("10001"))
            .andExpect(jsonPath("$.address.street").value("5th Avenue"))
            .andExpect(jsonPath("$.address.number").value("50"))
            .andExpect(jsonPath("$.address.suite").value("Penthouse"))
            .andExpect(jsonPath("$.address.city").value("New York"))
            .andExpect(jsonPath("$.address.district").value("Manhattan"))
            .andExpect(jsonPath("$.address.state").value("NY"));
        }


    @Test
    void testGetByIdNotFound() throws Exception {
        Mockito.when(elderlyService.getById(999L))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado"));

        mockMvc.perform(get("/elderly/getById")
                        .param("id", "999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuário não encontrado"));
    }

    @Test
    void testSaveElderly() {

    }

    @Test
    void testUpdateElderly() {

    }
}
