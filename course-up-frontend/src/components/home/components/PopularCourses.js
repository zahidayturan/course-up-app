import React, { useRef, useState, useEffect } from 'react';
import styles from '../css/PopularCourses.module.css';
import textStyles from '../../css/Text.module.css';
import classNames from "classnames";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from '../../css/Main.module.css';
import {Link} from "react-router-dom";
import RatingStars from "../../course/RatingStars";
import CourseCard from "../../course/CourseCard";

const PopularCourses = () => {
    const containerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const scrollSpeed = 3;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(Endpoints.POPULAR_COURSES);
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching remote data:', err);
                try {
                    const fallbackResponse = await axios.get('/json/popular-courses.json');
                    setCourses(fallbackResponse.data);
                } catch (fallbackErr) {
                    console.log(err);
                    setError('Popüler kurslar yüklenirken bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        setIsAtEnd(false);
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isAtEnd, isAtStart]);

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -316, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 316, behavior: 'smooth' });
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        containerRef.current.startX = touch.clientX;
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current.startX) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - containerRef.current.startX;
        containerRef.current.scrollLeft -= deltaX;
        containerRef.current.startX = touch.clientX;
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            containerRef.current.scrollBy({ left: e.deltaY * scrollSpeed, behavior: 'smooth' });
        };

        const addWheelEventListener = () => {
            if (window.innerWidth <= 744 && containerRef.current) {
                containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
            }
        };

        const removeWheelEventListener = () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', handleWheel);
            }
        };

        const handleResize = () => {
            if (window.innerWidth <= 744) {
                addWheelEventListener();
            } else {
                removeWheelEventListener();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            removeWheelEventListener();
        };
    }, []);

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;

    return (
        <div>
            <div className={styles["mobile-title-and-row"]}>
                <p>Popüler <span style={{ fontWeight: "400" }}>Kurslar</span></p>
                <div style={{ width: 48, height: 10, borderRadius: 30, backgroundColor: "var(--yellow-color-1)" }}></div>
            </div>

            <div className={styles["custom-row"]}>
                <div className={classNames(styles["custom-column"], styles["left-bar"])}>
                    <div style={{ height: 90, alignSelf: "start" }}>
                        <p style={{ fontSize: 26, fontWeight: "700" }}>Popüler<br /><span style={{ fontWeight: "400" }}>Kurslar</span></p>
                    </div>
                    {!isAtStart && (
                        <div className={styles['arrow-to-left']} onClick={scrollLeft}>
                            <img src="/icon/arrow.png" alt="arrow" />
                        </div>
                    )}
                    <div style={{ width: 10, height: 90, borderRadius: 30, backgroundColor: "var(--yellow-color-1)", alignSelf: "start" }}></div>
                </div>
                <div
                    className={styles["course-containers"]}
                    ref={containerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {loading ? (
                        <div className={mainStyles["loading-overlay"]}>
                            <div className={mainStyles["main-spinner"]}></div>
                        </div>
                    ) : error ? (
                        <div><p>{error}</p></div>
                    ) : courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <div><p>Popüler kurs bulunamadı.</p></div>
                    )}
                </div>
                <div className={classNames(styles["custom-column"], styles["right-bar"])}>
                    <div style={{ width: 10, height: 60, borderRadius: 30, backgroundColor: "var(--yellow-color-1)", alignSelf: "end" }}></div>
                    {(isAtStart || !isAtEnd) && (
                        <div className={styles['arrow-to-right']} onClick={scrollRight}>
                            <img src="/icon/arrow.png" alt="arrow" />
                        </div>
                    )}
                    <div style={{ height: 60 }}></div>
                </div>
            </div>
        </div>
    );
};

export default PopularCourses;
