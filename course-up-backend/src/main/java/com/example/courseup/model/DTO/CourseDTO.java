package com.example.courseup.model.DTO;

import com.example.courseup.model.Course;
import lombok.Data;

@Data
public class CourseDTO {

    private Long id;

    public CourseDTO(Course course) {
        this.id = course.getId();
    }

}
