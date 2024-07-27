import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.module.css';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import Header from "./components/AuthHeader";
import Footer from "./components/AuthFooter";

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
            <Header />

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

            <Footer />
        </div>
    );
};

export default ForgotPassword;
