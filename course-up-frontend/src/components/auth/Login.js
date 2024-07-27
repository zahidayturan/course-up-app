import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(Endpoints.LOGIN, { email, password });

            const userResponse = await axios.get(`${Endpoints.USER_EMAIL}/${email}`);
            const user = userResponse.data;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful', response.data);
            window.location.href = '/home';
        } catch (error) {
            setLoginError('Invalid email or password: ' + error.message);
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
                        <button type="submit" className="button">Giriş Yap</button>
                        {loginError && <p className="error text-center">{loginError}</p>}
                    </form>
                </div>
                <p className="text-normal text-center">Bir hesabınız yok mu? <Link to="/register" className="font-bold text-underline">Kayıt Olun</Link></p>
            </section>

            <Footer />
        </div>
    );
};

export default Login;
