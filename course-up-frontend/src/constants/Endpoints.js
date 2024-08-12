const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Endpoints = {
    USER: `${API_BASE_URL}/user`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REGISTER: `${API_BASE_URL}/user/register`,
    USER_EMAIL: `${API_BASE_URL}/user/email`,
    CHECK_EMAIL: `${API_BASE_URL}/user/email-check`,
    PASSWORD_RESET_REQ: `${API_BASE_URL}/auth/password-reset`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    USER_COURSES: `${API_BASE_URL}/trainee/user`,
    ONGOING_COURSES: `${API_BASE_URL}/trainee/active/user`,
    POPULAR_COURSES: `${API_BASE_URL}/api/json/popular-courses`,
    TEACHER_SAVE: `${API_BASE_URL}/teacher`,
    TEACHER_COURSES: `${API_BASE_URL}/teacher/courses`,
    TEACHER_ID: `${API_BASE_URL}/teacher/courses`,
    COURSE_DETAIL: `${API_BASE_URL}/course`,
    COURSE_STAGES: `${API_BASE_URL}/course-stages/all`,
    COURSE_COMMENTS: `${API_BASE_URL}/course-comments/all`,
    TEACHER_DETAIL: `${API_BASE_URL}/teacher/get`,
    COURSE_FILE_UPLOAD: `${API_BASE_URL}/course-files/upload`,
    COURSE_SAVE: `${API_BASE_URL}/course/save`,
    COURSE_STAGE_SAVE: `${API_BASE_URL}/course-stages/save`,
    WISH_LIST: `${API_BASE_URL}/course-wish-list/all`,
    CHECK_WISH_LIST: `${API_BASE_URL}/course-wish-list/check`,
    ADD_TO_WISH_LIST: `${API_BASE_URL}/course-wish-list/save`

};

export default Endpoints;