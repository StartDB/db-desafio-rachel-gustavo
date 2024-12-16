package com.cuidarmais.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Repositories.ElderlyRepository;

import jakarta.transaction.Transactional;

@Service
public class ElderlyService {
    
    @Autowired
    public ElderlyRepository elderlyRepository;

    @Transactional
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

    public ResponseEntity<Object> getById(Long id) {
        try {

            Optional<Elderly> elderlyOpt = elderlyRepository.findById(id);

            Elderly elderly = elderlyOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

            return ResponseEntity.ok(elderly);

        } catch (NoSuchElementException ex) {
                
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
        
    }

    public ResponseEntity<Object> updateElderly(UpdateUserDTO elderlyUpdate) {
        try {

            Optional<Elderly> elderlyOpt = elderlyRepository.findById(elderlyUpdate.id());

            Elderly elderly = elderlyOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

            Elderly finalElderly = UpdateUserDTO.mergeUpdateToElderly(elderlyUpdate, elderly);
            elderlyRepository.save(finalElderly);
            elderlyRepository.flush();
            
            return ResponseEntity.ok(finalElderly);
    
            } catch (NoSuchElementException ex) {
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            
            } catch (DataIntegrityViolationException ex) {
            
            String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);
    
            } catch (JpaSystemException ex) {

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro em atualizar os dados");

            } catch (Exception ex) {
    
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
        }
    }
}
