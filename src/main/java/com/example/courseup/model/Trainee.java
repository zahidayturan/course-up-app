package com.example.courseup.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private int currentDuration;
    private int currentStages;
    private double coursePoint;
    private boolean isFinished;
}