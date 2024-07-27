import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);


    const handleCategoryToggle = () => {
        setShowCategories(!showCategories);
    };

    const handleLanguageToggle = () => {
        setShowLanguages(!showLanguages);
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    return (
        <section id="header">
            <div className="custom-row">
                <Link to="/" className="app-logo">
                    <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo" />
                </Link>
                <div className="category-container">
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

            <form className="search-bar" onSubmit={handleSearch}>
                <input type="text" placeholder="Kurs, eğitmen veya kategori arayın" />
                <button type="submit">
                    <img src="/icon/search.png" alt="Search" style={{height : 20}}/>
                </button>
            </form>

            <div className="custom-row">
                <Link to="/basket"><img src="/icon/basket.png" alt="Basket" style={{height : 20}}/></Link>
                <Link to="/login" className="auth-button-login">Giriş Yapın</Link>
                <Link to="/register" className="auth-button-register">Kayıt Olun</Link>
                <div className="language-container">
                    <p onClick={handleLanguageToggle} className="language-menu">TR</p>
                    {showLanguages && (
                        <div className="dropdown-menu">
                            <p>TR</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Header;
