import React, { useState } from 'react';
import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/auth/Auth.css';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';
import { Link, useNavigate} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${Endpoints.CHECK_EMAIL}/${email}`);

            if (response.status === 200) {
                setIsEmailValid(true);
                //setMessage('E-posta adresi kullanılabilir.');
            } else {
                setMessage('Beklenmedik bir durum oluştu.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('Bu mail zaten kayıt edilmiş');
            } else {
                setMessage('Bir hata oluştu.');
            }
        }
    };


    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(Endpoints.REGISTER, {
                name,
                surname,
                email,
                password
            });

            if (response.status === 200) {
                setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
                const userResponse = await axios.get(`${Endpoints.USER_EMAIL}/${email}`);
                const user = userResponse.data;
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            } else {
                setMessage('Beklenmedik bir durum oluştu.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage('Bir hata oluştu.');
            }
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
            <section id="form" className="login-column">
                <p className="text-header-large font-semi-bold text-center">
                    <span className="font-light">CourseUp<br /></span>Ailesine Katılın
                </p>
                <div className="login-column container-form">
                    <div className="login-row bottom-padding">
                        <p className="text-large font-normal">Hesap Oluşturun</p>
                        <div className="mini-cont register-mini-count"></div>
                    </div>

                    {!isEmailValid ? (
                        <form className="registration-form" onSubmit={handleEmailSubmit}>
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
                            {message && <p className="error text-center">{message}</p>}
                        </form>
                    ) : (
                        <form className="registration-form" onSubmit={handleRegisterSubmit}>
                            <p className="go-back text-underline" onClick={handleGoBack}>Geri Dön</p>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                readOnly
                                placeholder="E-Posta adresiniz"
                                className="readOnly"
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
                            <p></p>
                            <button type="submit" className="button">Kayıt Ol</button>
                            {message && <p className="error text-center">{message}</p>}
                        </form>
                    )}
                </div>
                <p className="text-normal text-center">Zaten bir hesabınız var mı? <Link to="/login" className="font-bold text-underline">Giriş Yap</Link></p>
            </section>

            <Footer />
        </div>
    );
};

export default Register;
