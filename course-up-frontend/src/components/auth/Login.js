import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/AuthHeader';
import Footer from "./components/AuthFooter";
import mainStyles from '../css/Main.module.css'
import styles from './css/Auth.module.css';
import textStyles from '../css/Text.module.css';
import classNames from "classnames";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

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
                navigate('/home');
            }, 2000);
        } catch (error) {
            setLoginError('Geçersiz e-posta veya şifre');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <section className={classNames(styles['form'], styles['login-column'])}>
                <p className={classNames(textStyles['text-header-large'], textStyles['font-semi-bold'])}>Hoş Geldiniz</p>
                <div className={classNames(styles['login-column'], styles['container-form'])}>
                    <div className={classNames(styles['login-row'], styles['bottom-padding'])}>
                        <p className={classNames(textStyles['text-large'], textStyles['font-normal'])}>Giriş Yapın</p>
                        <div className={styles['mini-cont']}></div>
                    </div>

                    {!formSubmitted ? (
                        <form className={styles['registration-form']} onSubmit={handleSubmit}>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-Posta adresiniz"
                                required
                                className={styles['input']}
                                autoComplete="email"
                            />
                            <label htmlFor="password"></label>
                            <div className={styles['input-and-icon']}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Şifreniz"
                                    minLength={4}
                                    required
                                    className={styles['input']}
                                    autoComplete="current-password"
                                />
                                <p onClick={(e) => setShowPassword(!showPassword)} className={styles['toggle-password']}>{showPassword ? "gizle" : "göster"}</p>
                            </div>
                            <Link to="/forgot-password" className={classNames(styles['login-forgot-password'], textStyles['font-normal'])}>Şifremi Unuttum</Link>
                            <button type="submit" className={styles['button']}>
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </button>
                            {loginError && <p className={classNames(textStyles['error'], textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>{loginError}</p>}
                        </form>
                    ) : (
                        <p className={classNames(textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>Başarıyla giriş yaptınız. Yönlendiriliyorsunuz...</p>
                    )}
                    {loading && (
                        <div className={mainStyles['loader']}>
                            <div className={mainStyles['spinner']}></div>
                        </div>
                    )}
                </div>
                <p className={classNames(textStyles['text-normal'], textStyles['text-center'])}>Bir hesabınız yok mu? <Link to="/register" className={classNames(textStyles['font-bold'], textStyles['text-underline'])}>Kayıt Olun</Link></p>
            </section>
            <Footer />
        </div>
    );
};

export default Login;
