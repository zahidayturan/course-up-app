import React from 'react';
import { Link } from 'react-router-dom';
import Header from './auth/components/AuthHeader';
import textStyles from '../assets/css/Text.module.css';

const NotFound = () => {
    return (
        <div>
            <Header />
            <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column", marginTop: "48px", gap: "32px"}}>
                <p style={{color:"red"}}>404 - Sayfa Bulunamadı</p>
                <p style={{fontSize:40, textAlign: "center"} }>
                    Maalesef<br/>
                    <span style={{fontWeight:600}}>aradığınız sayfayı<br/>bulamadık</span>
                </p>
                <Link to="/home" className={textStyles['text-underline']}>
                    Ana Sayfaya Git
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
