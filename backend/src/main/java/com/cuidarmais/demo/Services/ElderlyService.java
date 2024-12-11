package com.cuidarmais.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuidarmais.demo.Entities.Elderly;
import com.cuidarmais.demo.Repositories.ElderlyRepository;

@Service
public class ElderlyService {
    
    @Autowired
    public ElderlyRepository elderlyRepository;

    public Elderly saveElderly(Elderly elderly) {
        return this.elderlyRepository.save(elderly);
    }

}
