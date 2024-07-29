import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/Main.module.css';
import Header from "./components/AuthHeader";
import Footer from "./components/AuthFooter";
import styles from '../../assets/css/auth/Auth.module.css';
import textStyles from '../../assets/css/Text.module.css';
import classNames from "classnames";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
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
        if (newPassword !== confirmNewPassword) {
            setMessage('Şifreler eşleşmiyor.');
            return;
        }
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
            <div className={classNames(styles['form'], styles['login-column'])}>
                <p className={classNames(textStyles['text-header-large'], textStyles['font-semi-bold'], textStyles['text-center'])}>
                    <span className={textStyles['font-light']}>Şifre Sıfırlama<br/></span>Yeni Şifre
                </p>
                <div className={classNames(styles['login-column'], styles['container-form'])}>
                    {!formSubmitted ? (
                        <form className={styles['registration-form']} onSubmit={handleSubmit}>
                            <label htmlFor="newPassword" className={textStyles['label']}>Yeni Şifre</label>
                            <div className={styles['input-and-icon']}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    placeholder="Yeni şifrenizi giriniz"
                                    minLength={4}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className={styles['input']}
                                />
                                <p onClick={(e) => setShowPassword(!showPassword)} className={styles['toggle-password']}>{showPassword ? "gizle" : "göster"}</p>
                            </div>
                            <label htmlFor="confirmNewPassword"></label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Yeni şifrenizi tekrar giriniz"
                                minLength={4}
                                required
                                className={styles['input']}
                            />
                            <p></p>
                            <button type="submit" className={styles['button']} style={{ fontSize: 16 }}>
                                {loading ? 'Sıfırlanıyor...' : 'Şifreyi Sıfırla'}
                            </button>
                            {message && <p className={classNames(textStyles['error'], textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>{message}</p>}
                        </form>
                    ) : (
                        <p className={classNames(textStyles['error'], textStyles['text-center'], styles['top-padding'], styles['bottom-padding'])}>{message}</p>
                    )}
                    {loading && (
                        <div className={styles['loader']}>
                            <div className={styles['spinner']}></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;
