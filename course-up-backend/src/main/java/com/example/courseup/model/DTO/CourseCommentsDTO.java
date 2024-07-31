package com.example.courseup.model.DTO;

import com.example.courseup.model.CourseComments;
import lombok.Data;

@Data
public class CourseCommentsDTO {

    private Long id;

    private CourseDTO course;

    private TraineeDTO trainee;

    private String comments;

    public CourseCommentsDTO(CourseComments courseComments) {
        this.id = courseComments.getId();
        this.course = new CourseDTO(courseComments.getCourse());
        this.trainee = new TraineeDTO(courseComments.getTrainee());
        this.comments = courseComments.getComments();
    }

}
