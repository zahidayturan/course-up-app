import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/Main.module.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/AuthHeader";
import Footer from "./components/AuthFooter";
import styles from '../../assets/css/auth/Auth.module.css';
import textStyles from '../../assets/css/Text.module.css';
import classNames from "classnames";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.CHECK_EMAIL}/${email}`);

            if (response.status === 200) {
                setIsEmailValid(true);
                setMessage('');
            } else {
                setMessage('Beklenmedik bir durum oluştu.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('Bu mail zaten kayıt edilmiş');
            } else {
                setMessage('Bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(Endpoints.REGISTER, {
                name,
                surname,
                email,
                password
            });

            if (response.status === 200) {
                setFormSubmitted(true);
                setMessage('Kayıt başarılı! Giriş yapılıyor.');
                const userResponse = await axios.get(`${Endpoints.USER_EMAIL}/${email}`);
                const user = userResponse.data;
                localStorage.setItem('user', JSON.stringify(user));
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setMessage('Beklenmedik bir durum oluştu.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage('Bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setIsEmailValid(false);
        setName('');
        setSurname('');
        setPassword('');
        setMessage('');
    };

    return (
        <div>
            <Header />
            <div className={classNames(styles['form'], styles['login-column'])}>
                <p className={classNames(textStyles['text-header-large'], textStyles['font-semi-bold'], textStyles['text-center'])}>
                    <span className={textStyles['font-light']}>CourseUp<br /></span>Ailesine Katılın
                </p>
                <div className={classNames(styles['login-column'], styles['container-form'])}>
                    <div className={classNames(styles['login-row'], styles['bottom-padding'])}>
                        <p className={classNames(textStyles['text-large'], textStyles['font-normal'])}>Hesap Oluşturun</p>
                        <div className={classNames(styles['mini-cont'], styles['register-mini-count'])}></div>
                    </div>

                    {!formSubmitted && !isEmailValid ? (
                        <form className={styles['registration-form']} onSubmit={handleEmailSubmit}>
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
                            />
                            <p></p>
                            <button type="submit" className={styles['button']}>
                                {loading ? 'Kontrol ediliyor...' : 'İlerle'}
                            </button>
                            {message && <p className={classNames(textStyles['error'], textStyles['text-center'])}>{message}</p>}
                        </form>
                    ) : !formSubmitted ? (
                        <form className={styles['registration-form']} onSubmit={handleRegisterSubmit}>
                            <p className={classNames(styles['go-back'], textStyles['text-underline'])} onClick={handleGoBack}>Geri Dön</p>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                readOnly
                                placeholder="E-Posta adresiniz"
                                className={classNames(styles['input'], styles['readOnly'])}
                                required
                            />
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Adınız"
                                className={styles['input']}
                                required
                            />
                            <label htmlFor="surname"></label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Soyadınız"
                                className={styles['input']}
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
                                className={styles['input']}
                                required
                            />
                            <p></p>
                            <button type="submit" className={styles['button']}>
                                {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                            </button>
                            {message && <p className={classNames(textStyles['error'], textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>{message}</p>}
                        </form>
                    ) : (
                        <p className={classNames(textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>Kayıt başarılı! Giriş yapabilirsiniz.</p>
                    )}
                    {loading && (
                        <div className={styles['loader']}>
                            <div className={styles['spinner']}></div>
                        </div>
                    )}
                </div>
                <p className={classNames(textStyles['text-normal'], textStyles['text-center'])}>Zaten bir hesabınız var mı? <Link to="/login" className={classNames(textStyles['font-bold'], textStyles['text-underline'])}>Giriş Yap</Link></p>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
