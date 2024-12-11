package com.cuidarmais.demo.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ELDERLY")
public class Elderly extends User {

}
