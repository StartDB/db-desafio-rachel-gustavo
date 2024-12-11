package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Services.ElderlyService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/elderly")
public class ElderlyController {
    
    @Autowired
    public ElderlyService elderlyService;

    @GetMapping("/listAll")
    public List<Elderly> getAllElderly() {
        return elderlyService.listAll();
    }
    
    
    @PostMapping("/save")
    public Elderly saveElderly(@RequestBody Elderly elderly) {
        
        elderlyService.saveElderly(elderly);
        
        return elderly;
    }
}
