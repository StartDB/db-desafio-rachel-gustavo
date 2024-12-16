package com.cuidarmais.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.DTO.ProfileDTO;
import com.cuidarmais.demo.DTO.UpdateUserDTO;
import com.cuidarmais.demo.DTO.TaskDTO.TaskDTO;
import com.cuidarmais.demo.DTO.TaskDTO.TaskDTOTransform;
import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Repositories.VolunteerRepository;

import jakarta.transaction.Transactional;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    @Transactional
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

    public ResponseEntity<Object> getProfileById(Long id) {
        try {

            Optional<Volunteer> volunteerOpt = volunteerRepository.findById(id);

            Volunteer volunteer = volunteerOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

            ProfileDTO profile = ProfileDTO.transformToProfileDTO(volunteer);

            return ResponseEntity.ok(profile);

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

    public ResponseEntity<Object> getMyTasks(Long id) {
       try {

            Optional<Volunteer> volunteerOpt = volunteerRepository.findById(id);

            Volunteer volunteer = volunteerOpt.orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

            List<TaskDTO> taskList = TaskDTOTransform.transformToTaskDTOList(volunteer.getTasks());

            return ResponseEntity.ok(taskList);

            } catch (NoSuchElementException ex) {
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

            } catch (Exception ex) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro desconhecido");
            }
    }
}
