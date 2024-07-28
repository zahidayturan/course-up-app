# course-up-backend/Dockerfile

# Base image
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/course-up-backend.jar /app/course-up-backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "course-up-backend.jar"]
