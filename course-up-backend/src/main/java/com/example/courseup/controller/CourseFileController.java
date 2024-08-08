package com.example.courseup.controller;

import com.example.courseup.model.CourseFileI;
import com.example.courseup.service.CourseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/fileI")
public class CourseFileController {

    @Autowired
    private CourseFileService courseFileService;

    @PostMapping("/upload")
    public Object handleFileIUpload(@RequestParam("image") MultipartFile file) throws IOException, GeneralSecurityException {
        if (file.isEmpty()) {
            return "FIle is empty";
        }
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        CourseFileI courseFileI = courseFileService.uploadImageToDrive(tempFile);
        return courseFileI.getId();
    }

    @PostMapping("/update")
    public Object handleFileIUpdate(@RequestParam("image") MultipartFile file ,@RequestParam("id") String id) throws IOException, GeneralSecurityException {
        if (file.isEmpty()) {
            return "FIle is empty";
        }
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        CourseFileI courseFileI = courseFileService.updateImageOnDrive(id,tempFile);
        return courseFileI.getId();
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getImageUrl(@PathVariable String id) {
        try {
            String imageUrl = courseFileService.getFileUrlById(id);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving image");
        }
    }
}
