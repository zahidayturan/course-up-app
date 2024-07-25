-- Users
INSERT INTO "user" (id, name, surname, email, password, joining_date) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password1', '2023-01-01'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password2', '2023-02-01'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', 'password3', '2023-03-01'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', 'password4', '2023-04-01'),
(5, 'Charlie', 'Davis', 'charlie.davis@example.com', 'password5', '2023-05-01');

-- Students
INSERT INTO student (id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Teachers
INSERT INTO teacher (id, user_id, description) VALUES
(1, 4, 'Experienced Math Teacher'),
(2, 5, 'Expert in Physics');

-- Courses
INSERT INTO course (id, teacher_id, name, description, category, price, level, language, subtitles, total_stages, total_duration) VALUES
(1, 1, 'Calculus 101', 'Introductory calculus course', 'Mathematics', 100.0, 'Beginner', 'English', 'German-Chinese', 3, 20),
(2, 2, 'Physics 101', 'Basics of Physics', 'Science', 150.0, 'Beginner', 'English', 'Turkish-German', 2, 15);

-- Course Stages
INSERT INTO course_stages (id, course_id, name, description, duration) VALUES
(1, 1, 'Limits and Continuity', 'Introduction to limits and continuity', 8),
(2, 1, 'Derivatives', 'Understanding derivatives', 6),
(3, 1, 'Integrals', 'Introduction to integrals', 6),
(4, 2, 'Kinematics', 'Basics of kinematics', 10),
(5, 2, 'Dynamics', 'Introduction to dynamics', 5);

-- Trainees
INSERT INTO trainee (id, student_id, course_id, current_duration, current_stages, course_point, is_finished) VALUES
(1, 1, 1, 20, 3, 95, true),
(2, 2, 2, 4, 1, 101, false),
(3, 3, 1, 10, 2, 101, false);

-- Course Comments
INSERT INTO course_comments (id, course_id, trainee_id, comments) VALUES
(1, 1, 1, 'Great course, very informative!'),
(2, 2, 2, 'Good introduction to Physics.');

-- Basket
INSERT INTO basket (id, user_id, course_id) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 2);
