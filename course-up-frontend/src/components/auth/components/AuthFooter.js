import React from "react";
import styles from '../../../assets/css/auth/Auth.module.css';
import classNames from "classnames";

const AuthFooter = () => (
    <section className={classNames(styles['bottom-bar'], styles['login-row'])}>
        <p className={styles['rotated-text-bottom']}>Yeni Nesil<br />Online Kurs<br />Platformu</p>
        <p>© Copyright 2024 Z Her Hakkı Saklıdır.</p>
        <img src="/logo/za-l-v1.png" alt="ZA Logo" style={{ width: '32px' }} />
    </section>
);

export default AuthFooter;
