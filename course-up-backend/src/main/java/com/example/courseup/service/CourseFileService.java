package com.example.courseup.service;

import com.example.courseup.model.CourseFile;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class CourseFileService {

    @Value("${google.drive.folder_id}")
    private String driveFolderId;

    @Value("${google.drive.credentials.project_id}")
    private String projectId;

    @Value("${google.drive.credentials.private_key_id}")
    private String privateKeyId;

    @Value("${google.drive.credentials.private_key}")
    private String privateKey;

    @Value("${google.drive.credentials.client_email}")
    private String clientEmail;

    @Value("${google.drive.credentials.client_id}")
    private String clientId;

    @Value("${google.drive.credentials.client_x509_cert_url}")
    private String clientX509CertUrl;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private GoogleCredentials credentials;

    @PostConstruct
    public void init() throws IOException {
        String jsonCredentials = String.format(
                "{\"type\":\"service_account\",\"project_id\":\"%s\",\"private_key_id\":\"%s\"," +
                        "\"private_key\":\"%s\",\"client_email\":\"%s\",\"client_id\":\"%s\"," +
                        "\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\"," +
                        "\"token_uri\":\"https://oauth2.googleapis.com/token\"," +
                        "\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\"," +
                        "\"client_x509_cert_url\":\"%s\",\"universe_domain\":\"googleapis.com\"}",
                projectId, privateKeyId, privateKey, clientEmail, clientId, clientX509CertUrl
        );

        credentials = GoogleCredentials.fromStream(
                new ByteArrayInputStream(jsonCredentials.getBytes(StandardCharsets.UTF_8))
        ).createScoped(Collections.singleton(DriveScopes.DRIVE));
    }


    public CourseFile uploadImageToDrive(File file) {
        CourseFile courseFile = new CourseFile();
        try {
            Drive drive = createDriveService();

            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(driveFolderId));

            FileContent mediaContent = new FileContent("image/jpeg", file);

            com.google.api.services.drive.model.File uploadedFile = drive.files()
                    .create(fileMetaData, mediaContent)
                    .setFields("id")
                    .execute();

            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println("IMAGE URL: " + imageUrl);

            file.delete();

            courseFile.setStatus(200);
            courseFile.setMessage("Image Successfully Uploaded To Drive");
            courseFile.setUrl(imageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            courseFile.setStatus(500);
            courseFile.setMessage("Failed to upload image to Drive: " + e.getMessage());
        }
        return courseFile;
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);
        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                requestInitializer
        ).build();
    }
}
