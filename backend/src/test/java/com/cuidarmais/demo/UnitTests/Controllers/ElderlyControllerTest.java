package com.cuidarmais.demo.UnitTests.Controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.Controllers.ElderlyController;
import com.cuidarmais.demo.DTO.UpdateUserDTO;
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

    Mockito.when(elderlyService.getProfileById(1L)).thenReturn(ResponseEntity.ok(loganRoy));

    mockMvc.perform(get("/elderly/getProfileById")
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
        Mockito.when(elderlyService.getProfileById(999L))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado"));

        mockMvc.perform(get("/elderly/getProfileById")
                        .param("id", "999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuário não encontrado"));
    }

    @Test
    void testSaveElderlySuccess() throws Exception {
        String loganRoyJson = """
            {
              "role": "elderly",
              "id": 1,
              "firstName": "Logan",
              "lastName": "Roy",
              "username": "loganroy",
              "password": "securepassword",
              "email": "logan@waystar.com",
              "phone": 555123456,
              "birthdate": "1940-10-14",
              "address": {
                "zip": "10001",
                "street": "5th Avenue",
                "number": "50",
                "suite": "Penthouse",
                "city": "New York",
                "district": "Manhattan",
                "state": "NY"
              },
              "description": "The ruthless patriarch of the Roy family."
            }
            """;
    Mockito.when(elderlyService.saveElderly(Mockito.any(Elderly.class)))
            .thenReturn(ResponseEntity.ok("Cadastro salvo com sucesso!"));

    mockMvc.perform(post("/elderly/save")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loganRoyJson))
            .andExpect(status().isOk())
            .andExpect(content().string("Cadastro salvo com sucesso!"));
}

    @Test
    void testSaveElderlyDataIntegrityViolation() throws Exception {
        String duplicateLoganRoyJson = """
            {
              "role": "elderly",
              "id": 1,
              "firstName": "Logan",
              "lastName": "Roy",
              "username": "loganroy",
              "password": "securepassword",
              "email": "logan@waystar.com",
              "phone": 555123456,
              "birthdate": "1940-10-14",
              "address": {
                "zip": "10001",
                "street": "5th Avenue",
                "number": "50",
                "suite": "Penthouse",
                "city": "New York",
                "district": "Manhattan",
                "state": "NY"
              },
              "description": "The ruthless patriarch of the Roy family."
            }
            """;
    Mockito.when(elderlyService.saveElderly(Mockito.any(Elderly.class)))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Detail: Key (username)=(loganroy) already exists."));

    mockMvc.perform(post("/elderly/save")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(duplicateLoganRoyJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Detail: Key (username)=(loganroy) already exists."));
}


    @Test
    void testUpdateElderlySuccess() throws Exception {
    String updateJson = """
    {
      "id": 1,
      "firstName": "Logan",
      "lastName": "Roy",
      "username": "loganupdated",
      "email": "loganupdated@waystar.com",
      "phone": 555987654,
      "birthdate": "1940-10-14",
      "address": {
        "zip": "10001",
        "street": "5th Avenue",
        "number": "55",
        "suite": "Penthouse",
        "city": "New York",
        "district": "Manhattan",
        "state": "NY"
      },
      "description": "Updated description."
    }
    """;

    Elderly updatedLogan = new Elderly(1L, "Logan", "Roy", "loganupdated", "securepassword", "loganupdated@waystar.com", 
            555987654, LocalDate.of(1940, 10, 14), new Address("10001", "5th Avenue", "55", "Penthouse", "New York", "Manhattan", "NY"), 
            "Updated description.", LocalDateTime.now(), null);

    Mockito.when(elderlyService.updateElderly(Mockito.any(UpdateUserDTO.class)))
                                .thenReturn(ResponseEntity.ok(updatedLogan));

    mockMvc.perform(post("/elderly/update")
            .contentType(MediaType.APPLICATION_JSON)
            .content(updateJson))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("loganupdated"))
            .andExpect(jsonPath("$.email").value("loganupdated@waystar.com"))
            .andExpect(jsonPath("$.description").value("Updated description."));
}

    @Test
    void testUpdateElderlyNotFound() throws Exception {
        String updateJson = """
        {
        "id": 999,
        "firstName": "Logan",
        "lastName": "Roy",
        "username": "loganupdated",
        "email": "loganupdated@waystar.com"
        }
        """;

        Mockito.when(elderlyService.updateElderly(Mockito.any(UpdateUserDTO.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado"));

        mockMvc.perform(post("/elderly/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuário não encontrado"));
    }

    @Test
    void testUpdateElderlyDataIntegrityViolation() throws Exception {
        String updateJson = """
        {
        "id": 1,
        "firstName": "Logan",
        "lastName": "Roy",
        "username": "conflictusername",
        "email": "logan@waystar.com"
        }
        """;

        Mockito.when(elderlyService.updateElderly(Mockito.any(UpdateUserDTO.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Key (username)=(conflictusername) already exists."));

        mockMvc.perform(post("/elderly/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Key (username)=(conflictusername) already exists."));
    }

}
