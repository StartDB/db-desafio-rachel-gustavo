package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Repositories.ElderlyRepository;

@Service
public class ElderlyService {
    
    @Autowired
    public ElderlyRepository elderlyRepository;

    public ResponseEntity<Object> saveElderly(Elderly elderly) {
        try {

        elderlyRepository.save(elderly);
        
        return ResponseEntity.ok("Cadastro salvo com sucesso!");

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }

    public List<Elderly> listAll() {
        return elderlyRepository.findAll();
    }
}
