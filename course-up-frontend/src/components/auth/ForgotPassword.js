import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import Header from "./components/AuthHeader";
import Footer from "./components/AuthFooter";
import mainStyles from '../css/Main.module.css'
import styles from './css/Auth.module.css';
import textStyles from '../css/Text.module.css';
import classNames from "classnames";

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
            <div className={classNames(styles['login-column'], styles['form'])}>
                <p className={classNames(textStyles['text-header-large'], textStyles['font-semi-bold'], textStyles['text-center'])}>
                    <span className={textStyles['font-light']}>CourseUp<br/></span>Şifre Sıfırlama
                </p>
                <div className={classNames(styles['login-column'], styles['container-form'])}>
                    {!formSubmitted ? (
                        <form className={styles['registration-form']} onSubmit={handleSubmit}>
                            <label htmlFor="email" className={textStyles['label']}>E-posta Adresi</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-Posta adresiniz"
                                required
                                className={styles['input']}
                                style={{fontSize:16}}
                                autoComplete="email"
                            />
                            <p></p>
                            <button type="submit" className={styles['button']} style={{ fontSize: 16 }}>
                                {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama E-postası Gönder'}
                            </button>
                        </form>
                    ) : (
                        <p className={classNames(textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>{message}</p>
                    )}
                    {!formSubmitted && message && <p className={classNames(textStyles['error'], textStyles['text-center'], styles['top-padding'])}>{message}</p>}
                    {loading && (
                        <div className={mainStyles['loader']}>
                            <div className={mainStyles['spinner']}></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
