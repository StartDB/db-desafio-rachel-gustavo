package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
        
        return volunteerService.saveVolunteer(volunteer);
    }
    
    
}
