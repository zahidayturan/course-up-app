package com.example.courseup.model.DTO;

import com.example.courseup.model.Student;
import com.example.courseup.model.User;
import lombok.Data;

@Data
public class StudentDTO {

    private UserDTO user;

    public StudentDTO(Student student) {
        this.user = new UserDTO(student.getUser());
    }

}
