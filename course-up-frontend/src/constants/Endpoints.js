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
    TEACHER_SAVE: `${API_BASE_URL}/teacher`
};

export default Endpoints;