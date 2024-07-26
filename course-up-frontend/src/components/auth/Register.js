import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import {Link} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(Endpoints.REGISTER, {
                name,
                surname,
                email,
                password
            });
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage('An error occurred');
            }
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
                <p className="text-header-large font-semi-bold text-center"> <span className="font-light">CourseUp<br/></span>Ailesine Katılın</p>
                <div className="login-column container-form">
                    <div className="login-row bottom-padding">
                        <p className="text-large font-normal">Hesap Oluşturun</p>
                        <div className="mini-cont register-mini-count"></div>
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
                        <p></p>
                        <button type="submit" className="button">İlerle</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
                <p className="text-normal">Zaten bir hesabınız var mı? <Link to="/login" className="font-bold text-underline">Giriş Yap</Link></p>
            </section>

            <section id="bottom-bar" className="login-row">
                <p className="rotated-text">Yeni Nesil<br />Online Kurs<br />Platformu</p>
                <p>© Copyright 2024 Z Her Hakkı Saklıdır.</p>
                <img src="/logo/za-l-v1.png" alt="ZA Logo" style={{ width: '32px' }} />
            </section>
        </div>
    );
};

export default Register;
