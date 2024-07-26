import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <section id="header">
                <div className="login-row">
                    <Link to="/home" className="app-logo">
                        <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo 1" />
                    </Link>
                    <div className="logo-v2">
                        <img src="/logo/courseup-l-v2.png" alt="CourseUp Logo 2" />
                    </div>
                </div>
            </section>

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

                        <p className="login-forgot-password">Şifremi Unuttum</p>
                        <button type="submit" className="button">Giriş Yap</button>
                        {loginError && <p className="error">{loginError}</p>}
                    </form>
                </div>
                <p className="text-normal">Bir hesabınız yok mu? <Link to="/register" className="font-bold text-underline">Kayıt Olun</Link></p>
            </section>

            <section id="bottom-bar" className="login-row">
                <p className="rotated-text">Yeni Nesil<br />Online Kurs<br />Platformu</p>
                <p>© Copyright 2024 Z Her Hakkı Saklıdır.</p>
                <img src="/logo/za-l-v1.png" alt="ZA Logo" style={{ width: '32px' }} />
            </section>
        </div>
    );
};

export default Login;
