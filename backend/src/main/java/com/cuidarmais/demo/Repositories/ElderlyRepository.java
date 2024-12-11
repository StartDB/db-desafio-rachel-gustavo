package com.cuidarmais.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cuidarmais.demo.Entities.Elderly;

public interface ElderlyRepository extends JpaRepository<Elderly, Long>{
    
}
