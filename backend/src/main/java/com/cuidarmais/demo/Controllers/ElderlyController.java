package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Services.ElderlyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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
    public ResponseEntity<Object> saveElderly(@RequestBody Elderly elderly) {
        return elderlyService.saveElderly(elderly);
    }

    @GetMapping("/getById")
    public Elderly getById(@RequestParam Long id) {
        return elderlyService.getById(id);
    }
    
}
