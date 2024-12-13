package com.cuidarmais.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> saveElderly(@RequestBody Elderly elderly) {
        try {

        elderlyService.saveElderly(elderly);
        
        return ResponseEntity.ok("Cadastro salvo com sucesso!");

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }
}
