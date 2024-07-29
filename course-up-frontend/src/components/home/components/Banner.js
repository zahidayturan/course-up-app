import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from '../../../assets/css/home/Home.module.css';
import textStyles from '../../../assets/css/Text.module.css';

const Banner = () => {
    return (
        <div>
            <div className={classNames(styles['custom-row'], styles['mobile-row'], styles['top-and-bottom'])}>
                <div className={styles['banner']}>
                    <div className={classNames(styles['custom-row'], styles['banner-text-and-buttons'])}>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                            <div className={styles['arrow-to-left']}>
                                <img src="/icon/arrow.png" alt=""/>
                            </div>
                            <p className={styles['banner-text']}>Hedeflerine<br/>giden yolda<br/><span className={textStyles['font-bold']}>CourseUp<br/>yanında</span><br/><br/><br/><span
                                style={{fontSize: "18px"}}>Bir kursa kayıt ol<br/>ve yolculuğuna başla</span></p>
                        </div>
                        <div className={styles['arrow-to-right']}>
                            <img src="/icon/arrow.png" alt=""/>
                        </div>
                    </div>
                    <img className={styles['banner-img']} src="/img/banner-library.png" alt=""/>
                </div>
                <div className={styles['ongoing-courses']}></div>
            </div>
        </div>
    );
};

export default Banner;
