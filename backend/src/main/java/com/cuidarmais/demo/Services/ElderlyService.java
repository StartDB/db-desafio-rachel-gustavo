package com.cuidarmais.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Entities.User;
import com.cuidarmais.demo.Repositories.ElderlyRepository;

@Service
public class ElderlyService {
    
    @Autowired
    public ElderlyRepository elderlyRepository;

    public User saveElderly(Elderly elderly) {
        return this.elderlyRepository.save(elderly);
    }

    public List<Elderly> listAll() {
        return this.elderlyRepository.findAll();
    }
}
