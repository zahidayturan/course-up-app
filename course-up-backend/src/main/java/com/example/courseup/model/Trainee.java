package com.example.courseup.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    @JsonManagedReference
    private Course course;

    private Double currentDuration;
    private Integer currentStage;
    private Double coursePoint;
    private Boolean isFinished;
    private LocalDate startedDate;
    private LocalDate endDate;

    @OneToOne(mappedBy = "trainee")
    @JsonIgnore
    private CourseComments courseComments;
}
