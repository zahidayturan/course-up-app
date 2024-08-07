package com.example.courseup.model.DTO;

import com.example.courseup.model.Teacher;
import lombok.Data;

@Data
public class TeacherDTO {

    private String name;
    private String surname;
    private String description;
    private double rating;
    private int students;
    private int courses;

    public TeacherDTO(Teacher teacher,Double rating,Integer teacherStudents,Integer teacherCourses) {
        this.name = teacher.getUser().getName();
        this.surname = teacher.getUser().getSurname();
        this.description = teacher.getDescription();
        this.rating = rating;
        this.students = teacherStudents;
        this.courses = teacherCourses;
    }

}
