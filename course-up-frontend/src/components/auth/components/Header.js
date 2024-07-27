import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <section id="header">
        <div className="login-row row-center">
            <Link to="/" className="app-logo">
                <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo 1" />
            </Link>
            <div className="logo-v2">
                <img src="/logo/courseup-l-v2.png" alt="CourseUp Logo 2" />
            </div>
        </div>
        <p className="rotated-text-top">Yeni Nesil<br />Online Kurs Platformu</p>
    </section>
);

export default Header;
