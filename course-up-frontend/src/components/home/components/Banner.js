import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from '../css/Banner.module.css';
import textStyles from '../../css/Text.module.css';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import {Link, useNavigate} from "react-router-dom";

const Banner = () => {
    const [user, setUser] = useState(null);
    const [ongoingCourses, setOngoingCourses] = useState(null);
    const [ongoingCoursesError, setOngoingCoursesError] = useState(null);
    const [ongoingCoursesLoading, setOngoingCoursesLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOngoingCourses = async (userId) => {
            try {
                setOngoingCoursesLoading(true);
                const response = await axios.get(`${Endpoints.ONGOING_COURSES}/${userId}`);
                setOngoingCourses(response.data);
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
        <p className={styles['banner-text']} style={{backgroundColor:"rgb(66,76,56,0.9)"}}>
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

    const ProgressBar = ({ percentage= 0 }) => {
        const backgroundColor = percentage >= 75 ? 'var(--green-color-1)' : percentage >=50 ? 'var(--orange-color-1)' : 'var(--yellow-color-1)';

        return (
            <div className={styles["progress-bar-background"]}>
                <div
                    className={styles["progress-bar-foreground"]}
                    style={{ width: `${percentage}%`, backgroundColor }}
                ></div>
            </div>
        );
    };

    const title = (
        <div className={styles["custom-row"]} style={{ alignItems: "start" }}>
            <p style={{ fontSize: 18 }}>
                Devam eden <span className={textStyles["font-bold"]}>kursların</span>
            </p>
            <div
                style={{
                    width: 32,
                    height: 8,
                    borderRadius: 30,
                    backgroundColor: "var(--green-color-1)",
                }}
            ></div>
        </div>
    );
    return (
        <div>
            <div className={classNames(styles['custom-row'], styles['mobile-row'], styles['top-and-bottom'])} style={{alignItems:"start"}}>
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
                    <div className={styles["is-web"]}>
                        <div className={styles['ongoing-courses']}>
                        {ongoingCoursesLoading ? (
                                <div style={{padding:12}}>
                                    {title}
                                    <div className={mainStyles['loader']}>
                                        <div className={mainStyles['spinner']}></div>
                                    </div>
                                </div>
                        ) : ongoingCoursesError ? (
                                <div style={{padding:12}}>
                                    {title}
                                    <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{ongoingCoursesError}</p>
                                </div>
                        ) : ongoingCourses && ongoingCourses.length > 0 ? (
                            <div style={{padding:12}}>
                                {title}
                                {ongoingCourses.map((item) => {
                                    return (
                                        <div key={item.id} className={styles["course-box"]}>
                                            <p className={textStyles["font-bold"]}>{item.name}</p>
                                            <p className={classNames(textStyles["text-small"], textStyles["font-italic"])}>Eğitmen: {item.instructor}</p>
                                            <ProgressBar percentage={item.percentage} />
                                            <p className={textStyles["text-small"]}>İlerleme <span className={textStyles["font-bold"]}>% {item.percentage}</span></p>
                                            <Link to={`/profile/course-view/${item.name.replace(/\s+/g,'-').toLowerCase()}`} state={{ id: item.id }} className={styles["custom-row"]} style={{justifyContent:"end", gap:4,textDecoration:"none",color:"var(--secondary-color-2)"}}>
                                                <p className={textStyles["text-small"]} style={{textAlign:"end"}}>Devam Et</p>
                                                <img className={styles["arrow-icon"]} src="/icon/long-arrow.png" alt=""/>
                                            </Link>
                                        </div>
                                    );
                                })}
                                <p onClick={() => navigate(`/category`)} className={textStyles["text-center"]} style={{padding:"14px 0", fontSize:14}}>Aradığın kurs burada yok mu?<br/><span className={classNames(textStyles["text-underline"], textStyles["font-bold"])}>Şimdi yeni bir kurs ekle</span></p>
                            </div>
                        ) : (
                            <div style={{padding:12}}>
                                {title}
                                <p onClick={() => navigate(`/category`)} className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Devam eden bir kursun yok.<br/><span className={classNames(textStyles["text-underline"],textStyles["font-bold"])}>Şimdi yeni bir kurs ekle</span></p>
                            </div>
                        )}
                    </div>
                        <img className={styles["opacity-logo"]} src="/logo/courseup-l-v1.png" alt=""/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
