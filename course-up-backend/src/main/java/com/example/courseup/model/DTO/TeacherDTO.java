package com.example.courseup.model.DTO;

import com.example.courseup.model.Teacher;
import lombok.Data;

@Data
public class TeacherDTO {

    private UserDTO user;

    public TeacherDTO(Teacher teacher) {
        this.user = new UserDTO(teacher.getUser());
    }

}
