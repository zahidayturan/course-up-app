import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/AuthHeader';
import Footer from "./components/AuthFooter";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(Endpoints.LOGIN, { email, password });

            const userResponse = await axios.get(`${Endpoints.USER_EMAIL}/${email}`);
            const user = userResponse.data;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful', response.data);
            setFormSubmitted(true);
            setTimeout(() => {
                window.location.href = '/home';
            }, 2000); // 2 saniye sonra yönlendirme
        } catch (error) {
            setLoginError('Geçersiz e-posta veya şifre');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <section id="form" className="login-column">
                <p className="text-header-large font-semi-bold">Hoş Geldiniz</p>
                <div className="login-column container-form">
                    <div className="login-row bottom-padding">
                        <p className="text-large font-normal">Giriş Yapın</p>
                        <div className="mini-cont"></div>
                    </div>

                    {!formSubmitted ? (
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-Posta adresiniz"
                                required
                            />

                            <label htmlFor="password"></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifreniz"
                                required
                            />
                            <Link to="/forgot-password" className="login-forgot-password">Şifremi Unuttum</Link>
                            <button type="submit" className="button">
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </button>
                            {loginError && <p className="error text-center top-padding bottom-padding">{loginError}</p>}
                        </form>
                    ) : (
                        <p className="text-center top-padding bottom-padding">Başarıyla giriş yaptınız. Yönlendiriliyorsunuz...</p>
                    )}
                    {loading && (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
                <p className="text-normal text-center">Bir hesabınız yok mu? <Link to="/register" className="font-bold text-underline">Kayıt Olun</Link></p>
            </section>
            <Footer />
        </div>
    );
};

export default Login;
