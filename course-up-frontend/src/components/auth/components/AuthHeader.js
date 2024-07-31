import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Auth.module.css';
import classNames from "classnames";

const AuthHeader = () => (
    <div className={styles['header']}>
        <div className={classNames(styles['login-row'], styles['row-center'])}>
            <Link to="/" className={styles['app-logo']}>
                <img src="/logo/courseup-l-v1.png" alt="CourseUp Logo 1" />
            </Link>
            <div className={styles['logo-v2']}>
                <img src="/logo/courseup-l-v2.png" alt="CourseUp Logo 2" />
            </div>
        </div>
        <p className={styles['rotated-text-top']}>Yeni Nesil<br />Online Kurs Platformu</p>
    </div>
);

export default AuthHeader;
