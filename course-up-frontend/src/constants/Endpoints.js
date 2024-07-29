const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Endpoints = {
    USER: `${API_BASE_URL}/user`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REGISTER: `${API_BASE_URL}/user/register`,
    USER_EMAIL: `${API_BASE_URL}/user/email`,
    CHECK_EMAIL: `${API_BASE_URL}/user/email-check`,
    PASSWORD_RESET_REQ: `${API_BASE_URL}/auth/password-reset`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`
};

export default Endpoints;