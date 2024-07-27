import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import Header from "./components/AuthHeader";
import Footer from "./components/AuthFooter";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    useEffect(() => {
        if (!token) {
            setMessage('Geçersiz token');
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${Endpoints.RESET_PASSWORD}`, null, {
                params: {
                    token: token,
                    newPassword: newPassword
                }
            });
            setMessage('Şifre başarıyla sıfırlandı');
            setFormSubmitted(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Bir hata oluştu');
            } else {
                setMessage('Bir hata oluştu');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />

            <section id="form" className="login-column">
                <p className="text-header-large font-semi-bold text-center">
                    <span className="font-light">Şifre Sıfırlama<br/></span>Yeni Şifre
                </p>
                <div className="login-column container-form">
                    {!formSubmitted ? (
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label htmlFor="newPassword">Yeni Şifre</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                placeholder={"Yeni şifrenizi giriniz"}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <p></p>
                            <button type="submit" className="button" style={{ fontSize: 16 }}>
                                {loading ? 'Sıfırlanıyor...' : 'Şifreyi Sıfırla'}
                            </button>
                            {message && <p className="error text-center top-padding bottom-padding">{message}</p>}
                        </form>
                    ) : (
                        <p className="error text-center top-padding bottom-padding">{message}</p>
                    )}
                    {loading && (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ResetPassword;
