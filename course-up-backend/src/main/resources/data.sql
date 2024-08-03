-- Users
INSERT INTO "user" (name, surname, email, password, joining_date) VALUES
('John', 'Doe', 'john@example.com', '$2a$10$h.m5v59FONvSx/WtZg93rerEsWHfjVlWYRZJfxMhk52zih4J6FiYe', '2023-01-01'),
('Jane', 'Smith', 'jane@example.com', '$2a$10$h.m5v59FONvSx/WtZg93rerEsWHfjVlWYRZJfxMhk52zih4J6FiYe', '2023-02-01'),
('Alice', 'Johnson', 'alice@example.com', '$2a$10$h.m5v59FONvSx/WtZg93rerEsWHfjVlWYRZJfxMhk52zih4J6FiYe', '2023-03-01'),
('Bob', 'Brown', 'bob@example.com', '$2a$10$h.m5v59FONvSx/WtZg93rerEsWHfjVlWYRZJfxMhk52zih4J6FiYe', '2023-04-01'),
('Charlie', 'Davis', 'charlie@example.com', '$2a$10$h.m5v59FONvSx/WtZg93rerEsWHfjVlWYRZJfxMhk52zih4J6FiYe', '2023-05-01');

-- Students
INSERT INTO student (user_id) VALUES
(1),
(2),
(3);

-- Teachers
INSERT INTO teacher (user_id, description) VALUES
(4, 'Experienced Math Teacher'),
(5, 'Expert in Physics');

-- Courses
INSERT INTO course (teacher_id, name, description, category, price, discount ,level, language, subtitles, total_stages, total_duration, image) VALUES
(1, 'Calculus 101', 'Introductory calculus course', 'Mathematics', 100.0, 25,'Beginner', 'English', 'German-Chinese', 3, 20, "null"),
(2, 'Physics 101', 'Basics of Physics', 'Science', 150.0, 10,'Beginner', 'English', 'Turkish-German', 2, 15, "null");

-- Course Stages
INSERT INTO course_stages (course_id, name, description, duration) VALUES
(1, 'Limits and Continuity', 'Introduction to limits and continuity', 8),
(1, 'Derivatives', 'Understanding derivatives', 6),
(1, 'Integrals', 'Introduction to integrals', 6),
(2, 'Kinematics', 'Basics of kinematics', 10),
(2, 'Dynamics', 'Introduction to dynamics', 5);

-- Trainees
INSERT INTO trainee (student_id, course_id, current_duration, current_stages, course_point, is_finished) VALUES
(1, 1, 20, 3, 95, true),
(2, 2, 4, 1, 101, false),
(3, 1, 10, 2, 101, false);

-- Course Comments
INSERT INTO course_comments (course_id, trainee_id, comments) VALUES
(1, 1, 'Great course, very informative!'),
(2, 2, 'Good introduction to Physics.');

-- Basket
INSERT INTO basket (user_id, course_id) VALUES
(1, 2),
(2, 1),
(3, 2);
