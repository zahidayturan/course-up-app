import React from 'react';
import styles from '../css/Info.module.css';
import textStyles from '../../css/Text.module.css';

const Info = () => {

    return (
        <div>
            <div className={styles["info-box"]}>
                <div className={styles["custom-row"]}>
                    <p style={{color:"var(--secondary-color-1)",fontSize:"22px"}}>Kapsamlı bir<br/><span className={textStyles["font-bold"]}>öğrenme deneyimi</span></p>
                    <p className={styles["text-button"]}>Şimdi Başlayın</p>
                </div>
                <img className={styles["app-logo"]} src="/logo/courseup-l-v2.png" alt=""/>
                <img  className={styles["back-img"]} src="/img/line.png" alt=""/>
            </div>
        </div>
    );
};

export default Info;
