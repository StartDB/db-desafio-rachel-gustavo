package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Services.VolunteerService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/volunteer")
public class VolunteerController {
    
    @Autowired
    private VolunteerService volunteerService;

    @GetMapping("/listAll")
    public List<Volunteer> getAllVolunteer() {
        return volunteerService.listAll();
    }
    

    @PostMapping("/save")
    public ResponseEntity<Object> saveVolunteer(@RequestBody Volunteer volunteer) {
        try {

        volunteerService.saveVolunteer(volunteer);
        
        return ResponseEntity.ok("Cadastro salvo com sucesso!");

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }
    
    
}
