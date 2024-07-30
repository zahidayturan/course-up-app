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

    return (
        <div>
            <div className={classNames(styles['custom-row'], styles['mobile-row'], styles['top-and-bottom'])}>
                <div className={styles['banner']}>
                    <div className={classNames(styles['custom-row'], styles['banner-text-and-buttons'])}>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <div className={styles['arrow-to-left']}>
                                <img src="/icon/arrow.png" alt="arrow" />
                            </div>
                            <p className={styles['banner-text']}>
                                Hedeflerine<br />giden yolda<br />
                                <span className={textStyles['font-bold']}>CourseUp<br />yanında</span><br /><br /><br />
                                <span style={{ fontSize: "18px" }}>Bir kursa kayıt ol<br />ve yolculuğuna başla</span>
                            </p>
                        </div>
                        <div className={styles['arrow-to-right']}>
                            <img src="/icon/arrow.png" alt="arrow" />
                        </div>
                    </div>
                    <img className={styles['banner-img']} src="/img/banner-library.png" alt="banner" />
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
