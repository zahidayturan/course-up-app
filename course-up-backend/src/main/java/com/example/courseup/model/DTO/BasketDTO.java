package com.example.courseup.model.DTO;

import com.example.courseup.model.Basket;
import com.example.courseup.model.Course;
import lombok.Data;

@Data
public class BasketDTO {

    private Long id;
    private Long courseId;

    private Course course;

    public BasketDTO(Basket basket) {
        this.id = basket.getId();
        this.courseId = basket.getCourse().getId();
        this.course = basket.getCourse();
    }
}
