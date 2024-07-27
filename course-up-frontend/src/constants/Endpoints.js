const API_BASE_URL = 'http://localhost:8080';

const Endpoints = {
    USER: `${API_BASE_URL}/user`,
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/user/register`,
    USER_EMAIL: `${API_BASE_URL}/user/email`,
    CHECK_EMAIL: `${API_BASE_URL}/user/email-check`,
    PASSWORD_RESET_REQ: `${API_BASE_URL}/login/password-reset`,
    RESET_PASSWORD: `${API_BASE_URL}/login/reset-password`

};

export default Endpoints;
