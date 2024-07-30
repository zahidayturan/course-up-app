package com.example.courseup.model.DTO;

import com.example.courseup.model.CourseStages;
import lombok.Data;

@Data
public class CourseStagesDTO {

    private CourseStages courseStages;
    private CourseDTO course;

    public CourseStagesDTO(CourseStages courseStages) {
        this.courseStages = courseStages;
        this.course = new CourseDTO(courseStages.getCourse());
    }
}
