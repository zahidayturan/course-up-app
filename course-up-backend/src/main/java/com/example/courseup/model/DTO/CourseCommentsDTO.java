package com.example.courseup.model.DTO;

import com.example.courseup.model.CourseComments;
import lombok.Data;

@Data
public class CourseCommentsDTO {

    private Long id;
    private Long courseId;
    private String owner;
    private String comments;
    private Double rating;
    public CourseCommentsDTO(CourseComments courseComments) {
        this.id = courseComments.getId();
        this.courseId = courseComments.getCourse().getId();
        this.owner = courseComments.getTrainee().getStudent().getUser().getName() +" "+courseComments.getTrainee().getStudent().getUser().getSurname();
        this.comments = courseComments.getComments();
        this.rating = courseComments.getTrainee().getCoursePoint();
    }

}
