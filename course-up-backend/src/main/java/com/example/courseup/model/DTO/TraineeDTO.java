package com.example.courseup.model.DTO;

import com.example.courseup.model.Trainee;
import lombok.Data;

@Data
public class TraineeDTO {
    private Long id;


    public TraineeDTO(Trainee trainee) {
        this.id = trainee.getId();
    }

}