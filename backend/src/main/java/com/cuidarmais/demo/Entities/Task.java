package com.cuidarmais.demo.Entities;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
    
    @Id
    @Generated(GenerationType.AUTO)
    private Long id;
}
