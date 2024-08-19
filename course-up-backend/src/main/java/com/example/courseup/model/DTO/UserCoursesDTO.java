package com.example.courseup.model.DTO;

import com.example.courseup.model.Trainee;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserCoursesDTO {

    //Trainee
    private Long id;
    private LocalDate started_date;
    private LocalDate end_date;
    private Double current_duration;
    private Integer current_stage;
    private Double course_point;
    private boolean isFinished;
    private Double percentage;
    //Course
    private Long courseId;
    private String name;
    private String instructor;
    private String description;
    private Double duration;
    private Integer stage;
    private String imageId;

    public UserCoursesDTO(Trainee trainee) {
        this.id = trainee.getId();
        this.started_date = trainee.getStartedDate();
        this.end_date = trainee.getEndDate();
        this.current_duration = trainee.getCurrentDuration();
        this.current_stage = trainee.getCurrentStage();
        this.course_point = trainee.getCoursePoint();
        this.isFinished = trainee.getIsFinished();
        this.percentage = calculatePercentage(trainee.getCurrentDuration(),trainee.getCourse().getTotalDuration());
        this.courseId= trainee.getCourse().getId();
        this.name = trainee.getCourse().getName();
        this.instructor = trainee.getCourse().getTeacher().getUser().getName() + " " + trainee.getCourse().getTeacher().getUser().getSurname();
        this.description = trainee.getCourse().getDescription();
        this.duration = trainee.getCourse().getTotalDuration();
        this.stage = trainee.getCourse().getTotalStages();
        this.imageId = trainee.getCourse().getImageId();
    }

    private Double calculatePercentage(Double current_duration, Double duration) {
        if (current_duration == null || duration == null || current_duration == 0 || duration == 0) {
            return 0.0;
        }
        return Math.round((current_duration / duration) * 1000) / 10.0;
    }


}
