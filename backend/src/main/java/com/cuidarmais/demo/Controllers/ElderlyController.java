package com.cuidarmais.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Services.ElderlyService;

@RestController
@RequestMapping("/elderly")
public class ElderlyController {
    
    @Autowired
    public ElderlyService elderlyService;
    
    @PostMapping("/save")
    public Elderly saveElderly(@RequestBody Elderly elderly) {
        
        elderlyService.saveElderly(elderly);
        
        return elderly;
    }
}
