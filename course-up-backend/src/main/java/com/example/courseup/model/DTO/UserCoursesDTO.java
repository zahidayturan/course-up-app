package com.example.courseup.model.DTO;

import com.example.courseup.model.Course;
import com.example.courseup.model.Trainee;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserCoursesDTO {

    //Trainee
    private Long id;
    private LocalDate started_date;
    private LocalDate end_date;
    private Integer current_duration;
    private Integer current_stage;
    private Double course_point;
    private boolean is_finished;

    //Course
    private String name;
    private String instructor;
    private String description;
    private Integer duration;
    private Integer stage;
    private String imageId;

    public UserCoursesDTO(Course course, Trainee trainee) {
        this.id = trainee.getId();
        this.started_date = trainee.getStartedDate();
        this.end_date = trainee.getEndDate();
        this.current_duration = trainee.getCurrentDuration();
        this.current_stage = trainee.getCurrentStages();
        this.course_point = trainee.getCoursePoint();
        this.is_finished = trainee.getIsFinished();
        this.name = course.getName();
        this.instructor = course.getTeacher().getUser().getName() + " " + course.getTeacher().getUser().getSurname();
        this.description = course.getDescription();
        this.duration = course.getTotalDuration();
        this.stage = course.getTotalStages();
        this.imageId = course.getImageId();
    }

}
