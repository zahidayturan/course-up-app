import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import styles from '../../../assets/css/home/Header.module.css';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(Endpoints.LOGOUT);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleCategoryToggle = () => {
        setShowCategories(!showCategories);
    };

    const handleLanguageToggle = () => {
        setShowLanguages(!showLanguages);
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleProfileToggle = () => {
        setShowProfile(!showProfile);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className={styles['header']}>
                <div className={styles['custom-row']}>
                    <Link to="/" className={styles['app-logo']}>
                        <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo" />
                    </Link>
                    <div className={classNames(styles['category-container'], styles['hide'])}>
                        <p onClick={handleCategoryToggle}>Kategoriler</p>
                        {showCategories && (
                            <div className={styles['dropdown-menu']}>
                                <Link to="/category/programming">Programming</Link>
                                <Link to="/category/design">Design</Link>
                                <Link to="/category/marketing">Marketing</Link>
                            </div>
                        )}
                    </div>
                </div>

                <form className={classNames(styles['search-bar'], styles['hide'])} onSubmit={handleSearch}>
                    <input type="text" placeholder="Kurs, eğitmen veya kategori arayın" />
                    <button type="submit">
                        <img src="/icon/search.png" alt="Search" style={{ height: 20 }} />
                    </button>
                </form>

                <div className={styles['custom-row']}>
                    <Link to="/basket"><img src="/icon/basket.png" alt="Basket" style={{ height: 20 }} /></Link>
                    { user ? (
                        <div className={classNames(styles['profile-container'], styles['hide'])}>
                            <div onClick={handleProfileToggle} className={classNames(styles['auth-button-register'], styles['hide'])}>Hesabım</div>
                            { showProfile && (
                                <div className={styles['dropdown-menu']}>
                                    <p onClick={handleLogout}>Çıkış Yap</p>
                                </div>)}
                        </div>
                    ) : (
                        <React.Fragment>
                            <Link to="/login" className={classNames(styles['auth-button-login'], styles['hide'])}>Giriş Yapın</Link>
                            <Link to="/register" className={classNames(styles['auth-button-register'], styles['hide'])}>Kayıt Olun</Link>
                        </React.Fragment>
                    )}
                    <div className={classNames(styles['language-container'], styles['hide'])}>
                        <p onClick={handleLanguageToggle} className={styles['language-menu']}>TR</p>
                        {showLanguages && (
                            <div className={styles['dropdown-menu']}>
                                <p>TR</p>
                            </div>)}
                    </div>
                    <div className={styles['hamburger-menu']} onClick={toggleMenu}>
                        <img src="/icon/hamburger.png" alt="Menu" />
                    </div>
                </div>

                {isMenuOpen && (
                    <div className={styles['side-menu']}>
                        <div className={styles['side-menu-content']}>
                            { user ? (
                                <React.Fragment>
                                    <p style={{textAlign:"center"} }>Merhaba <span style={{fontWeight:600}}>{user.name}</span></p>
                                    <div onClick={handleLogout} className={classNames(styles['auth-button-register'],styles['button-mobile'])}>Çıkış Yap</div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Link to="/login" className={classNames(styles['auth-button-login'], styles['button-mobile'])}>Giriş Yapın</Link>
                                    <Link to="/register" className={classNames(styles['auth-button-register'], styles['button-mobile'])}>Kayıt Olun</Link>
                                </React.Fragment>
                            )}

                            <Link to="/category/programming" className={styles['category-text']}>Programming</Link>
                            <Link to="/category/design" className={styles['category-text']}>Design</Link>
                            <Link to="/category/marketing" className={styles['category-text']}>Marketing</Link>
                            <div className={styles['language-container']} style={{display:"flex", justifyContent:"center"}}>
                                <p onClick={handleLanguageToggle} className={styles['language-menu']}>TR</p>
                                {showLanguages && (
                                    <div className={styles['dropdown-menu']}>
                                        <p>TR</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className={classNames(styles['search-bar'], styles['show'])} onSubmit={handleSearch}>
                <input type="text" placeholder="Kurs, eğitmen veya kategori arayın" />
                <button type="submit">
                    <img src="/icon/search.png" alt="Search" style={{ height: 20 }} />
                </button>
            </form>
        </div>
    );
};

export default Header;
