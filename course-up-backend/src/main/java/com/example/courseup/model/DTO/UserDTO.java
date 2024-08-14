package com.example.courseup.model.DTO;

import com.example.courseup.model.User;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String surname;
    private boolean isTeacher;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.isTeacher = user.getTeacher() != null;
    }
}
