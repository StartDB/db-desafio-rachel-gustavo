package com.cuidarmais.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Repositories.VolunteerRepository;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    public ResponseEntity<Object> saveVolunteer(Volunteer volunteer) {

        try {

        volunteerRepository.save(volunteer);
        
        return ResponseEntity.ok("Cadastro salvo com sucesso!");

        } catch (DataIntegrityViolationException ex) {
        
        String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
    }

    public List<Volunteer> listAll() {
        return volunteerRepository.findAll();
    }

    public ResponseEntity<Object> getById(Long id) {
        try {

            Optional<Volunteer> volunteerOpt = volunteerRepository.findById(id);

            Volunteer volunteer = volunteerOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

            return ResponseEntity.ok(volunteer);

        } catch (NoSuchElementException ex) {
                
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        } catch (Exception ex) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
    }
       
    }

    public ResponseEntity<Object> updateVolunteer(UpdateUserDTO volunteerUpdate) {
        try {

            Optional<Volunteer> volunteerOpt = volunteerRepository.findById(volunteerUpdate.id());

            Volunteer volunteer = volunteerOpt.orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

            Volunteer finalVolunteer = UpdateUserDTO.mergeUpdateToVolunteer(volunteerUpdate, volunteer);

            volunteerRepository.save(finalVolunteer);
            
            return ResponseEntity.ok(finalVolunteer);
    
            } catch (DataIntegrityViolationException ex) {
            
            String detail = ex.getMostSpecificCause().getLocalizedMessage().split("Detail:")[1];
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(detail);
    
            } catch (IllegalArgumentException ex) {
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            
            } catch (Exception ex) {
    
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido.");
        }
    }
}
