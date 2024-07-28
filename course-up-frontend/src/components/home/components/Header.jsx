import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../../../assets/css/home/Header.module.css';

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

    const handleCategoryToggle = () => {
        setShowCategories(!showCategories);
    };

    const handleLanguageToggle = () => {
        setShowLanguages(!showLanguages);
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearchBar = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    };

    return (
        <div className={styles['header']}>
            <div className={styles['custom-row']}>
                <Link to="/" className={styles['app-logo']}>
                    <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo" />
                </Link>
                <div className={classNames(styles['category-container'], styles['hide'])}>
                    <p onClick={handleCategoryToggle}>Kategoriler</p>
                    {showCategories && (
                        <div className="dropdown-menu">
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
                <img
                    src={isSearchBarVisible ? "/icon/close.png" : "/icon/search.png"}
                    alt="Search"
                    className={styles['show']}
                    style={{ height: 20, cursor: 'pointer' }}
                    onClick={toggleSearchBar}
                />
                <Link to="/basket"><img src="/icon/basket.png" alt="Basket" style={{ height: 20 }} /></Link>
                <Link to="/login" className={classNames(styles['auth-button-login'], styles['hide'])}>Giriş Yapın</Link>
                <Link to="/register" className={classNames(styles['auth-button-register'], styles['hide'])}>Kayıt Olun</Link>
                <div className={classNames(styles['language-container'], styles['hide'])}>
                    <p onClick={handleLanguageToggle} className={styles['language-menu']}>TR</p>
                    {showLanguages && (
                        <div className={styles['dropdown-menu']}>
                            <p>TR</p>
                        </div>
                    )}
                </div>
                <div className={styles['hamburger-menu']} onClick={toggleMenu}>
                    <img src="/icon/hamburger.png" alt="Menu" />
                </div>
            </div>

            {isMenuOpen && (
                <div className={styles['side-menu']}>
                    <div className={styles['side-menu-content']}>
                        <Link to="/login" className={classNames(styles['auth-button-login'], styles['button-mobile'])}>Giriş Yapın</Link>
                        <Link to="/register" className={classNames(styles['auth-button-register'], styles['button-mobile'])}>Kayıt Olun</Link>

                        <Link to="/category/programming" className={styles['category-text']}>Programming</Link>
                        <Link to="/category/design" className={styles['category-text']}>Design</Link>
                        <Link to="/category/marketing" className={styles['category-text']}>Marketing</Link>

                        <div className={styles['language-container']}>
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
    );
};

export default Header;
