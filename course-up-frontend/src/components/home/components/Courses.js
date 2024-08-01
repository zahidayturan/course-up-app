import React, { useRef, useState, useEffect } from 'react';
import styles from '../css/Courses.module.css';
import textStyles from '../../css/Text.module.css';
import classNames from "classnames";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from '../../css/Main.module.css'


const Courses = () => {
    const containerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(Endpoints.POPULAR_COURSES);
                setCourses(response.data);
                console.log('Popular courses set');
            } catch (err) {
                console.error('Error fetching remote data:', err);
                try {
                    const fallbackResponse = await axios.get('/json/popular-courses.json');
                    setCourses(fallbackResponse.data);
                } catch (fallbackErr) {
                    console.log(err);
                    setError('Poüler kurslar yüklenirken bir hata oluştu.');
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
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth-1);
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        handleScroll();

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
                <div className={styles["course-containers"]} ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    {loading ? (
                        <div className={mainStyles["loading-overlay"]}>
                            <div className={mainStyles["main-spinner"]}></div>
                        </div>
                    ) : error ? (
                        <div><p>{error}</p></div>
                    ) : courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course.id} className={styles["course-container"]}>
                                <div className={styles["discount-text"]}>
                                    <span className={textStyles["font-bold"]}>% {course.discount}</span> indirim
                                </div>
                                <img className={styles["course-img"]} src={course.image} alt={course.name} />
                                <div className={styles["text-column"]}>
                                    <div>
                                        <p className={textStyles["font-bold"]} style={{ fontSize: 18 }}>{course.name}</p>
                                        <p className={classNames(textStyles["font-italic"], textStyles["text-small"])}>Eğitmen: {course.instructor}</p>
                                    </div>
                                    <p className={textStyles["text-small"]} style={{ textAlign: "justify" }}>{course.description}</p>
                                    <p className={textStyles["text-small"]}>{course.duration} Saat Eğitim Süresi - {course.students} öğrenci</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", width: "100%" }}>
                                        <div>
                                            <p className={textStyles["text-small"]}>{course.rating} <span style={{ fontSize: 12 }}>({course.reviews}) kişi</span></p>
                                            <p>* * * * *</p>
                                        </div>
                                        <div style={{ textAlign: "end" }}>
                                            <p className={textStyles["text-small"]} style={{ textDecoration: "line-through" }}>{course.originalPrice} ₺</p>
                                            <p className={textStyles["font-bold"]}>{course.discountedPrice} ₺</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default Courses;
