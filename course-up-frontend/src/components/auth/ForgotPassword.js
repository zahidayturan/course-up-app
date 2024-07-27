import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.post(Endpoints.PASSWORD_RESET_REQ, { email });
            setMessage(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi. Lütfen kontrol ediniz.`);
            setFormSubmitted(true);
        } catch (error) {
            setMessage('E-posta bulunamadı. Lütfen doğru e-posta adresini girdiğinizden emin olun.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section id="header">
                <div className="login-row">
                    <Link to="/" className="app-logo">
                        <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo 1" />
                    </Link>
                    <div className="logo-v2">
                        <img src="/logo/courseup-l-v2.png" alt="CourseUp Logo 2" />
                    </div>
                </div>
            </section>

            <section id="form" className="login-column">
                <p className="text-header-large font-semi-bold text-center"> <span className="font-light">CourseUp<br/></span>Şifre Sıfırlama</p>
                <div className="login-column container-form">
                    {!formSubmitted ? (
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label htmlFor="email">E-posta Adresi</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-Posta adresiniz"
                                required
                            />
                            <p></p>
                            <button type="submit" className="button" style={{ fontSize: 16 }}>
                                {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama E-postası Gönder'}
                            </button>
                        </form>
                    ) : (
                        <p className="text-center top-padding bottom-padding">{message}</p>
                    )}
                    {!formSubmitted && message && <p className="error text-center top-padding">{message}</p>}
                    {loading && (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
            </section>

            <section id="bottom-bar" className="login-row">
                <p className="rotated-text">Yeni Nesil<br />Online Kurs<br />Platformu</p>
                <p>© Copyright 2024 Z Her Hakkı Saklıdır.</p>
                <img src="/logo/za-l-v1.png" alt="ZA Logo" style={{ width: '32px' }} />
            </section>
        </div>
    );
};

export default ForgotPassword;
