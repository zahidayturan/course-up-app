package com.example.courseup.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JsonFileController {

    @Value("${json.file.path}")
    private String jsonFilePath;

    @GetMapping("/popular-courses-json")
    public Resource getPopularCoursesJson() {
        return new FileSystemResource(jsonFilePath);
    }
}
