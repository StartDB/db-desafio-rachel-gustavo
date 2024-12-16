package com.cuidarmais.demo.Controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Entities.EntityObjects.Address;
import com.cuidarmais.demo.Services.VolunteerService;

@WebMvcTest(VolunteerController.class)
public class VolunteerControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    VolunteerService volunteerService;

    @Test
    void testGetByIdSuccess() throws Exception {
        Volunteer kendallRoy = new Volunteer(1L, "Kendall", "Roy", "kendallroy", "securepassword", "kendall@waystar.com", 
                555123456, LocalDate.of(1980, 5, 10), 
                new Address("10001", "Park Avenue", "10", "Suite 1100", "New York", "Manhattan", "NY"),
                "Ambitious and strategic.", null, 4.9, null);

        Mockito.when(volunteerService.getProfileById(1L)).thenReturn(ResponseEntity.ok(kendallRoy));

        mockMvc.perform(get("/volunteer/getProfileById")
                        .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("Kendall"))
                .andExpect(jsonPath("$.lastName").value("Roy"))
                .andExpect(jsonPath("$.username").value("kendallroy"))
                .andExpect(jsonPath("$.email").value("kendall@waystar.com"))
                .andExpect(jsonPath("$.description").value("Ambitious and strategic."))
                .andExpect(jsonPath("$.address.zip").value("10001"))
                .andExpect(jsonPath("$.address.street").value("Park Avenue"))
                .andExpect(jsonPath("$.address.number").value("10"))
                .andExpect(jsonPath("$.address.suite").value("Suite 1100"))
                .andExpect(jsonPath("$.address.city").value("New York"))
                .andExpect(jsonPath("$.address.district").value("Manhattan"))
                .andExpect(jsonPath("$.address.state").value("NY"))
                .andExpect(jsonPath("$.rating").value(4.9));
    }

    @Test
    void testGetByIdNotFound() throws Exception {
        Mockito.when(volunteerService.getProfileById(999L))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado"));

        mockMvc.perform(get("/volunteer/getProfileById")
                        .param("id", "999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuário não encontrado"));
    }

    @Test
    void testSaveVolunteerSuccess() throws Exception {
        String loganRoyJson = """
        {
          "role": "volunteer",
          "id": 2,
          "firstName": "Logan",
          "lastName": "Roy",
          "username": "loganroy",
          "password": "securepassword",
          "email": "logan@waystar.com",
          "phone": 555987654,
          "birthdate": "1950-02-14",
          "address": {
            "zip": "10001",
            "street": "Broadway",
            "number": "200",
            "suite": "Penthouse",
            "city": "New York",
            "district": "Manhattan",
            "state": "NY"
          },
          "description": "Powerful and pragmatic.",
          "rating": 4.6
        }
        """;
        
        Mockito.when(volunteerService.saveVolunteer(Mockito.any(Volunteer.class)))
                .thenReturn(ResponseEntity.ok("Cadastro salvo com sucesso!"));

        mockMvc.perform(post("/volunteer/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loganRoyJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Cadastro salvo com sucesso!"));
    }

    @Test
    void testSaveVolunteerDataIntegrityViolation() throws Exception {
        String duplicateVolunteerJson = """
        {
          "role": "volunteer",
          "id": 3,
          "firstName": "Roman",
          "lastName": "Roy",
          "username": "romanroy",
          "password": "securepassword",
          "email": "roman@waystar.com",
          "phone": 555123789,
          "birthdate": "1985-07-25",
          "address": {
            "zip": "10001",
            "street": "Madison Avenue",
            "number": "150",
            "suite": "Suite 500",
            "city": "New York",
            "district": "Manhattan",
            "state": "NY"
          },
          "description": "Sarcastic and witty.",
          "rating": 4.2
        }
        """;
        
        Mockito.when(volunteerService.saveVolunteer(Mockito.any(Volunteer.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Detail: Key (username)=(romanroy) already exists."));

        mockMvc.perform(post("/volunteer/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(duplicateVolunteerJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Detail: Key (username)=(romanroy) already exists."));
    }

    @Test
    void testUpdateVolunteerSuccess() throws Exception {
        String updatedJson = """
        {
          "id": 2,
          "firstName": "Logan",
          "lastName": "Roy",
          "username": "loganroyupdated",
          "email": "loganupdated@waystar.com",
          "phone": 555999999,
          "birthdate": "1950-02-14",
          "address": {
            "zip": "10001",
            "street": "5th Avenue",
            "number": "250",
            "suite": "Penthouse",
            "city": "New York",
            "district": "Manhattan",
            "state": "NY"
          },
          "description": "Updated description.",
          "rating": 4.8
        }
        """;

        Volunteer updatedLogan = new Volunteer(2L, "Logan", "Roy", "loganroyupdated", "securepassword", "loganupdated@waystar.com",
                555999999, LocalDate.of(1950, 2, 14), new Address("10001", "5th Avenue", "250", "Penthouse", "New York", "Manhattan", "NY"),
                "Updated description.", null, 4.8, null);

        Mockito.when(volunteerService.updateVolunteer(Mockito.any(UpdateUserDTO.class)))
                .thenReturn(ResponseEntity.ok(updatedLogan));

        mockMvc.perform(post("/volunteer/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2L))
                .andExpect(jsonPath("$.firstName").value("Logan"))
                .andExpect(jsonPath("$.username").value("loganroyupdated"))
                .andExpect(jsonPath("$.email").value("loganupdated@waystar.com"))
                .andExpect(jsonPath("$.rating").value(4.8));
    }

    @Test
    void testUpdateVolunteerNotFound() throws Exception {
        String updateJson = """
        {
          "id": 999,
          "firstName": "Connor",
          "lastName": "Roy",
          "username": "connorroyupdated",
          "email": "connorupdated@waystar.com",
          "phone": 555111222,
          "birthdate": "1975-12-12",
          "address": {
            "zip": "10001",
            "street": "Park Avenue",
            "number": "300",
            "suite": "Penthouse",
            "city": "New York",
            "district": "Manhattan",
            "state": "NY"
          },
          "description": "Idealistic and visionary.",
          "rating": 3.9
        }
        """;

        Mockito.when(volunteerService.updateVolunteer(Mockito.any(UpdateUserDTO.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado"));

        mockMvc.perform(post("/volunteer/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuário não encontrado"));
    }

    @Test
    void testUpdateVolunteerDataIntegrityViolation() throws Exception {
        String updateJson = """
        {
            "id": 1,
            "firstName": "Kendall",
            "lastName": "Roy",
            "username": "conflictusername",
            "email": "kendall@waystar.com"
        }
        """;

        Mockito.when(volunteerService.updateVolunteer(Mockito.any(UpdateUserDTO.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Key (username)=(conflictusername) already exists."));

        mockMvc.perform(post("/volunteer/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Key (username)=(conflictusername) already exists."));
    }
}

