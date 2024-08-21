package com.example.courseup.model.DTO;

import com.example.courseup.model.CourseComments;
import lombok.Data;

@Data
public class CourseCommentsDTO {

    private Long id;
    private Long courseId;
    private Long traineeId;
    private String courseName;
    private String owner;
    private String comments;
    private Double rating;
    public CourseCommentsDTO(CourseComments courseComments) {
        this.id = courseComments.getId();
        this.courseId = courseComments.getCourse().getId();
        this.traineeId = courseComments.getTrainee().getId();
        this.courseName = courseComments.getCourse().getName();
        this.owner = courseComments.getTrainee().getUser().getName() +" "+courseComments.getTrainee().getUser().getSurname();
        this.comments = courseComments.getComments();
        this.rating = courseComments.getTrainee().getCoursePoint();
    }

}
