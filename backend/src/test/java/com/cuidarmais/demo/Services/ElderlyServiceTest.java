package com.cuidarmais.demo.Services;

import com.cuidarmais.demo.DTO.ProfileDTO;
import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Entities.EntityObjects.Address;
import com.cuidarmais.demo.Repositories.ElderlyRepository;

import jakarta.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
public class ElderlyServiceTest {

    @Autowired
    private ElderlyRepository elderlyRepository;

    @Autowired
    private ElderlyService elderlyService;
    
    private Elderly loganRoy = new Elderly(null, "Logan", "Roy", "loganroy", "securepassword", "logan@waystar.com", 
    555123456, LocalDate.of(1940, 10, 14), 
    new Address("10001", "5th Avenue", "50", "Penthouse", "New York", "Manhattan", "NY"),
    "The ruthless patriarch of the Roy family.", LocalDateTime.now(), null);

    @BeforeEach
    public void setUp() {
        elderlyRepository.deleteAll();
        elderlyService.saveElderly(loganRoy);
    }

    @Test
    public void testSaveElderly_Success() {
        Elderly ewanRoy = new Elderly(null, "Ewan", "Roy", "ewanroy", "securepassword", "ewan@waystar.com", 555987654,
                LocalDate.of(1945, 5, 22), new Address("10002", "Park Avenue", "15", "Apt 500", "New York", "Manhattan", "NY"), "Logan's estranged brother.", LocalDateTime.now(), null);

        ResponseEntity<Object> response = elderlyService.saveElderly(ewanRoy);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Cadastro salvo com sucesso!", response.getBody());
    }

    @Test
    public void testGetById_Success() {
        ResponseEntity<Object> response = elderlyService.getProfileById(loganRoy.getId());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody() instanceof ProfileDTO);

        ProfileDTO responseElderly = (ProfileDTO) response.getBody();
        assertEquals(loganRoy.getId(), responseElderly.id());
        assertEquals(loganRoy.getFirstName(), responseElderly.firstName());
    }

    @Test
    public void testGetById_NotFound() {
        ResponseEntity<Object> response = elderlyService.getProfileById(999L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Usuário não encontrado", response.getBody());
    }

    @Test
    public void testUpdateElderly_Success() {
        UpdateUserDTO updateDTO = new UpdateUserDTO(
                loganRoy.getId(), "Logan", "Roy", "loganroy", "newpassword", "logan@waystar.com", 555123456,
                LocalDate.of(1940, 10, 14), loganRoy.getAddress(), "Updated description", LocalDateTime.now(), null, 0.0);

        ResponseEntity<Object> response = elderlyService.updateElderly(updateDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Elderly updatedElderly = (Elderly) response.getBody();
        assertNotNull(updatedElderly);
        assertEquals("Updated description", updatedElderly.getDescription());
        assertEquals("newpassword", updatedElderly.getPassword());
    }

    @Test
    public void testUpdateElderly_NotFound() {
        UpdateUserDTO updateDTO = new UpdateUserDTO(
                999L, "NonExisting", "User", "nonexistinguser", "newpassword", "nonexisting@waystar.com", 555987654,
                LocalDate.of(1950, 1, 1), new Address("10004", "Park Avenue", "30", "Apt 700", "New York", "Manhattan", "NY"),
                "Non-existent user", LocalDateTime.now(), null, 4.5);

        ResponseEntity<Object> response = elderlyService.updateElderly(updateDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Usuário não encontrado", response.getBody());
    }

    @Test
    public void testUpdateElderly_DataIntegrityViolation() {

        UpdateUserDTO updateDTO = new UpdateUserDTO(
                loganRoy.getId(), "Logan", "Roy", "tomw", "newpassword", "tom@waystar.com", 555123456,
                LocalDate.of(1940, 10, 14), loganRoy.getAddress(), "Updated description", LocalDateTime.now(), null, 0.0);

        Elderly conflictingElderly = new Elderly(null, "Tom", "Wambsgans", "tomw", "securepassword", 
                                        "tom@waystar.com", 555123456, LocalDate.of(1975, 9, 10), 
                                        new Address("10005", "Park Avenue", "50", "Apt 900", "New York", "Manhattan", "NY"), 
                                        "New character", LocalDateTime.now(), null);
        
        elderlyService.saveElderly(conflictingElderly);
        elderlyRepository.flush();

        ResponseEntity<Object> response = elderlyService.updateElderly(updateDTO);
        
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(response.getBody(), " Key (email)=(tom@waystar.com) already exists.");
    }
}
