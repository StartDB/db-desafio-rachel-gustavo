package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Volunteer;
import com.cuidarmais.demo.Repositories.VolunteerRepository;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    public Volunteer saveVolunteer(Volunteer volunteer) {

        volunteerRepository.save(volunteer);

        return volunteer;
    }

    public List<Volunteer> listAll() {
        return volunteerRepository.findAll();
    }
}
