package com.cuidarmais.demo.DTO.TaskDTO;

import java.time.LocalDate;
import java.time.LocalTime;

import com.cuidarmais.demo.Entities.EntityObjects.Enums.Status;
import com.cuidarmais.demo.Entities.EntityObjects.Enums.SupportType;

public record TaskDTO (
    Long id,
    String title,
    SupportType supportType,
    boolean isOnline,
    String description,
    LocalDate date,
    LocalTime time,
    String city,
    String state,
    Status status,
    UserTaskDTO requestBy,
    UserTaskDTO volunteer
) {
    
}
