import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from '../../../assets/css/home/Banner.module.css';
import textStyles from '../../../assets/css/Text.module.css';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";

const Banner = () => {
    const [user, setUser] = useState(null);
    const [ongoingCourses, setOngoingCourses] = useState(null);
    const [ongoingCoursesError, setOngoingCoursesError] = useState(null);
    const [ongoingCoursesLoading, setOngoingCoursesLoading] = useState(false);

    useEffect(() => {
        const fetchOngoingCourses = async (userId) => {
            try {
                setOngoingCoursesLoading(true);
                const response = await axios.get(`${Endpoints.ONGOING_COURSES}/${userId}`);
                setOngoingCourses(response.data);

                if (response.data.length > 0) {
                    console.log(response.data[0].course.name);
                }

                console.log('Ongoing courses set', response.data);
            } catch (error) {
                setOngoingCoursesError('Kurslarınız yüklenirken bir hata oluştu');
            } finally {
                setOngoingCoursesLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchOngoingCourses(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);


    const Banner1 = () => (
        <p className={styles['banner-text']}>
            Hedeflerine<br />giden yolda<br />
            <span className={textStyles['font-bold']}>CourseUp<br />yanında</span><br /><br /><br />
            <span style={{ fontSize: "18px" }}>Bir kursa kayıt ol<br />ve yolculuğuna başla</span>
        </p>
    );

    const Banner2 = () => (
        <p className={styles['banner-text']}>
            Yeni hedefler<br />için<br />
            <span className={textStyles['font-bold']}>CourseUp<br />seninle</span><br /><br /><br />
            <span style={{ fontSize: "18px" }}>Kendini geliştirmeye<br />başla</span>
        </p>
    );

    const banners = [
        {
            img: "/img/banner-library.png",
            component: <Banner1 />
        },
        {
            img: "/img/banner-road.png",
            component: <Banner2 />
        }
    ];

    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 12000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const handleNext = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const handlePrev = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };
    return (
        <div>
            <div className={classNames(styles['custom-row'], styles['mobile-row'], styles['top-and-bottom'])}>
                <div className={styles['banner']}>
                    <div className={classNames(styles['custom-row'], styles['banner-text-and-buttons'])}>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <div className={styles['arrow-to-left']} onClick={handlePrev}>
                                <img src="/icon/arrow.png" alt="arrow" />
                            </div>
                            {banners[currentBanner].component}
                        </div>
                        <div className={styles['arrow-to-right']} onClick={handleNext}>
                            <img src="/icon/arrow.png" alt="arrow" />
                        </div>
                    </div>
                    <img className={styles['banner-img']} src={banners[currentBanner].img} alt="banner" />
                </div>
                {user && (
                    <div className={styles['ongoing-courses']}>
                        {ongoingCoursesLoading ? (
                            <p>Loading...</p>
                        ) : ongoingCoursesError ? (
                            <p>{ongoingCoursesError}</p>
                        ) : ongoingCourses && ongoingCourses.length > 0 ? (
                            <div>
                                {ongoingCourses.map((item) => (
                                    <div key={item.id}>
                                        <p>{item.course.name}</p>
                                        <p>{item.course.description}</p>
                                        <p>{item.course.category}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Aktif kursunuz yok</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
