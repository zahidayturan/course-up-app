package com.example.courseup.controller;

import com.example.courseup.model.CourseFileI;
import com.example.courseup.service.CourseFileService;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.nio.file.Files;
import java.nio.file.Path;


@RestController
@RequestMapping("/course-files")
public class CourseFileController {

    @Autowired
    private CourseFileService courseFileService;


    @PostMapping("/upload")
    public ResponseEntity<CourseFileI> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Path tempDir = Files.createTempDirectory("");
            File tempFile = tempDir.resolve(file.getOriginalFilename()).toFile();
            file.transferTo(tempFile);

            CourseFileI uploadedFile = courseFileService.uploadImageToDrive(tempFile);

            tempFile.delete();

            return ResponseEntity.ok(uploadedFile);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Dosya Güncelleme
    @PutMapping("/update/{fileId}")
    public ResponseEntity<CourseFileI> updateFile(@PathVariable String fileId, @RequestParam("file") MultipartFile file) {
        try {
            Path tempDir = Files.createTempDirectory("");
            File tempFile = tempDir.resolve(file.getOriginalFilename()).toFile();
            file.transferTo(tempFile);

            CourseFileI updatedFile = courseFileService.updateImageOnDrive(fileId, tempFile);

            tempFile.delete();

            return ResponseEntity.ok(updatedFile);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable String id) {
        try {
            Resource resource = courseFileService.downloadFileFromDrive(id);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + id + "\"")
                    .body(resource);
        } catch (IOException | GeneralSecurityException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable String fileId) {
        try {
            courseFileService.deleteFileFromDrive(fileId);
            return ResponseEntity.noContent().build();
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/url/{fileId}")
    public ResponseEntity<String> getFileUrl(@PathVariable String fileId) {
        try {
            String fileUrl = courseFileService.getFileUrlById(fileId);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
