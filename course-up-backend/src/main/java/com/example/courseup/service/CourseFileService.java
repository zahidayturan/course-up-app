package com.example.courseup.service;

import com.example.courseup.model.CourseFileI;
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
import org.springframework.core.io.ByteArrayResource;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Collections;
import org.springframework.core.io.Resource;

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


    public CourseFileI uploadImageToDrive(File file) {
        CourseFileI courseFileI = new CourseFileI();
        try {
            Drive drive = createDriveService();

            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(driveFolderId));

            FileContent mediaContent = new FileContent("image/jpeg, image/png", file);

            com.google.api.services.drive.model.File uploadedFile = drive.files()
                    .create(fileMetaData, mediaContent)
                    .setFields("id")
                    .execute();

            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println(imageUrl);

            courseFileI.setId(uploadedFile.getId());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return courseFileI;
    }

    public CourseFileI updateImageOnDrive(String fileId, File newFile) {
        try {
            Drive drive = createDriveService();

            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(newFile.getName());

            FileContent mediaContent = new FileContent("image/jpeg, image/png", newFile);

            com.google.api.services.drive.model.File updatedFile = drive.files()
                    .update(fileId, fileMetaData, mediaContent)
                    .setFields("id")
                    .execute();

            String imageUrl = "https://drive.google.com/uc?export=view&id=" + updatedFile.getId();
            System.out.println("Updated Image URL: " + imageUrl);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteFileFromDrive(String fileId) throws IOException, GeneralSecurityException {
        Drive drive = createDriveService();
        drive.files().delete(fileId).execute();
    }

    public String getFileUrlById(String fileId) throws IOException, GeneralSecurityException {
        Drive drive = createDriveService();
        com.google.api.services.drive.model.File file = drive.files().get(fileId)
                .setFields("webViewLink")
                .execute();
        return file.getWebViewLink();
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);
        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                requestInitializer
        ).setApplicationName("CourseUpApp").build();
    }

    public Resource downloadFileFromDrive(String fileId) throws IOException, GeneralSecurityException {
        Drive drive = createDriveService();
        com.google.api.services.drive.model.File file = drive.files().get(fileId).execute();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        drive.files().get(fileId).executeMediaAndDownloadTo(outputStream);

        return new ByteArrayResource(outputStream.toByteArray());
    }
}
