import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../css/Header.module.css';
import mainStyles from '../../css/Main.module.css';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.get(Endpoints.LOGOUT);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
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
            {loading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
            <div className={styles['header']}>
                <div className={styles['custom-row']}>
                    <Link to="/" className={styles['app-logo']}>
                        <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo" />
                    </Link>
                    <div className={classNames(styles['category-container'], styles['hide'])}>
                        <p onClick={handleCategoryToggle}>Kategoriler</p>
                        {showCategories && (
                            <div className={styles['dropdown-menu']}>
                                <Link to="/category/programming">Programlama</Link>
                                <Link to="/category/design">Tasarım</Link>
                                <Link to="/category/marketing">Kişisel Gelişim</Link>
                                <Link to="/category/marketing">Fotoğrafçılık</Link>
                                <Link to="/category/marketing">Müzik</Link>
                                <Link to="/category/marketing">Tüm Kategoriler</Link>
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
                                    <Link to="/profile">Profilim</Link>
                                    <Link to="/profile/my-courses">Kurslarım</Link>
                                    <Link to="/profile/my-settings">Ayarlarım</Link>
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
                                    <Link to="/profile" className={classNames(styles['auth-button-register'], styles['button-mobile'])}>Profilim</Link>
                                    <div className={styles["custom-row"]} style={{gap:"8px" ,justifyContent:"start"}}>
                                        <div style={{width:"2px",height:"100%",borderRadius:"30px",backgroundColor:"var(--grey-color-1)"}}></div>
                                        <div>
                                            <p style={{fontWeight:700,fontSize:18,paddingBottom:"4px"}}>Hızlı Menüler</p>
                                            <Link to="/profile/my-courses" className={styles['category-text']}>Kurslarım</Link>
                                            <Link to="/profile/my-wishlist" className={styles['category-text']}>İstek Listem</Link>
                                            <Link to="/profile/my-statistics" className={styles['category-text']}>İstatistiklerim</Link>
                                            <Link to="/profile/my-comments" className={styles['category-text']}>Yorumlarım</Link>
                                            <Link to="/basket" className={styles['category-text']}>Sepetim</Link>
                                            <Link to="/help" className={styles['category-text']}>Yardım Merkezi</Link>
                                            <Link to="/profile/my-settings" className={styles['category-text']}>Ayarlarım</Link>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Link to="/login" className={classNames(styles['auth-button-login'], styles['button-mobile'])}>Giriş Yapın</Link>
                                    <Link to="/register" className={classNames(styles['auth-button-register'], styles['button-mobile'])}>Kayıt Olun</Link>
                                </React.Fragment>
                            )}
                            {!user && (
                                <React.Fragment>
                                    <div className={styles["custom-row"]} style={{gap:"8px" ,justifyContent:"start"}}>
                                        <div style={{width:"2px",height:"100%",borderRadius:"30px",backgroundColor:"var(--grey-color-1)"}}></div>
                                        <div>
                                            <p style={{fontWeight:700,fontSize:18,paddingBottom:"4px"}}>Hızlı Menüler</p>
                                            <Link to="/" className={styles['category-text']}>Kategoriler</Link>
                                            <Link to="/" className={styles['category-text']}>Sepetim</Link>
                                            <Link to="/" className={styles['category-text']}>Yardım Merkezi</Link>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                            <div className={styles['language-container']} style={{display:"flex", justifyContent:"center"}}>
                                <p onClick={handleLanguageToggle} className={styles['language-menu']}>TR</p>
                                {showLanguages && (
                                    <div className={styles['dropdown-menu']}>
                                        <p>Türkçe</p>
                                    </div>
                                )}
                            </div>
                            {user && (
                                <React.Fragment>
                                    <div onClick={handleLogout} className={classNames(styles['auth-button-login'],styles['button-mobile'])}>Çıkış Yap</div>
                                </React.Fragment>
                            )}
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