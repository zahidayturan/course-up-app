package com.example.courseup.controller;

import com.example.courseup.model.CourseFile;
import com.example.courseup.service.CourseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/file")
public class CourseFileController {

    @Autowired
    private CourseFileService courseFileService;

    @PostMapping("/upload")
    public Object handleFileUpload(@RequestParam("image") MultipartFile file) throws IOException, GeneralSecurityException {
        if (file.isEmpty()) {
            return "FIle is empty";
        }
        System.out.println(file.getName());
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        CourseFile courseFile = courseFileService.uploadImageToDrive(tempFile);
        System.out.println(courseFile);
        return courseFile;
    }
}
