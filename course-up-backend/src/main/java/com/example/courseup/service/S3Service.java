package com.example.courseup.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    private static final Map<String, String> MIME_TYPE_TO_EXTENSION = new HashMap<>();

    static {
        MIME_TYPE_TO_EXTENSION.put("image/jpeg", ".jpg");
        MIME_TYPE_TO_EXTENSION.put("image/png", ".png");
        MIME_TYPE_TO_EXTENSION.put("video/mp4", ".mp4");
        MIME_TYPE_TO_EXTENSION.put("application/pdf", ".pdf");
    }
    public String uploadFile(MultipartFile file) throws IOException {
        String mimeType = file.getContentType();
        String extension = MIME_TYPE_TO_EXTENSION.getOrDefault(mimeType, ".bin");
        String key = UUID.randomUUID() + "_" + LocalDate.now() + extension;

        s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), null));

        return key;
    }

    public byte[] downloadFile(String key) throws IOException {
        S3Object s3Object = s3Client.getObject(bucketName, key);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();

        return IOUtils.toByteArray(inputStream);
    }

    public void deleteFile(String key) {
        s3Client.deleteObject(new DeleteObjectRequest(bucketName, key));
    }
}
