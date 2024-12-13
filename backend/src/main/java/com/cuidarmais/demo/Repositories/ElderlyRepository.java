package com.cuidarmais.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuidarmais.demo.Entities.Elderly;
import java.util.Optional;


@Repository
public interface ElderlyRepository extends JpaRepository<Elderly, Long>{

    Optional<Elderly> findById(Long id);
}
