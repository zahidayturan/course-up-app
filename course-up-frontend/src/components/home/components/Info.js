import React, { useRef, useState, useEffect } from 'react';
import styles from '../../../assets/css/home/Info.module.css';
import textStyles from '../../../assets/css/Text.module.css';
import classNames from "classnames";

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
