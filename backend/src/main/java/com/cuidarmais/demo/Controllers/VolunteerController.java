package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Volunteer> getListVolunteer() {
        return volunteerService.listAll();
    }

    @PostMapping("/save")
    public Volunteer saveVolunteer(@RequestBody Volunteer volunteer) {
        
        volunteerService.saveVolunteer(volunteer);

        return volunteer;
    }
    
    
}
