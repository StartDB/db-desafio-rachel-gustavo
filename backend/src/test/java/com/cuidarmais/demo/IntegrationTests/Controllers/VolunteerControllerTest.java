package com.cuidarmais.demo.IntegrationTests.Controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Repositories.VolunteerRepository;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class VolunteerControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    VolunteerRepository volunteerRepository;

    @LocalServerPort
    private int port;

    @Test
    public void testSaveVolunteerSuccessful() {
        volunteerRepository.deleteAll();
        Volunteer volunteer = new Volunteer();
        volunteer.setFirstName("John");
        volunteer.setLastName("Doe");
        volunteer.setUsername("johndoe");
        volunteer.setEmail("john.doe@example.com");

        HttpEntity<Volunteer> request = new HttpEntity<>(volunteer);
        ResponseEntity<String> response = testRestTemplate.exchange("/volunteer/save", HttpMethod.POST, request, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertThat(response.getBody()).contains("Cadastro salvo com sucesso!");
        volunteerRepository.delete(volunteer);
    }

    @Test
    public void testUpdateVolunteerNotFound() {
        

        UpdateUserDTO updateUserDTO = new UpdateUserDTO(
            1L, "John", "Updated", "johnnyd", "newpassword", "johnny.doe@example.com", 123456789, 
            null, null, null, null, null, 4.5
        );

        HttpEntity<UpdateUserDTO> request = new HttpEntity<>(updateUserDTO);
        ResponseEntity<String> response = testRestTemplate.exchange("/volunteer/update", HttpMethod.POST, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
