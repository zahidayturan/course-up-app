import React, { useRef, useState, useEffect } from 'react';
import styles from '../../../assets/css/home/Courses.module.css';
import textStyles from '../../../assets/css/Text.module.css';
import classNames from "classnames";

const coursesData = [
    {
        "id": 1,
        "name": "Microsoft Excel",
        "instructor": "Mehmet Ay",
        "description": "Excel eğitim setimiz ile Excel'in tüm detaylarını öğrenin.",
        "duration": "16 Saat Eğitim Süresi",
        "students": "2453 öğrenci",
        "rating": "4.0",
        "reviews": "159 kişi",
        "originalPrice": "499.99 ₺",
        "discountedPrice": "299.99 ₺",
        "image": "/img/excel-course.jpeg",
        "discount": "40%"
    },
    {
        "id": 2,
        "name": "İleri Seviye Python",
        "instructor": "Veli Demir",
        "description": "Python ve Programlama Öğrenin. Django , Web Geliştirme , Veri Analizi (Pandas , Numpy), Selenium",
        "duration": "40 Saat Eğitim Süresi",
        "students": "10157 öğrenci",
        "rating": "4.1",
        "reviews": "1259 kişi",
        "originalPrice": "1199.99 ₺",
        "discountedPrice": "899.99 ₺",
        "image": "/img/python-course.png",
        "discount": "25%"
    },
];

const Courses = () => {
    const containerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(coursesData);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth-100);
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
        }, []);

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
                <div className={styles["course-containers"]} ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} >
                    {courses.map((course) => (
                        <div key={course.id} className={styles["course-container"]}>
                            <div className={styles["discount-text"]}>
                                <span className={textStyles["font-bold"]}>{course.discount}</span> indirim
                            </div>
                            <img className={styles["course-img"]} src={course.image} alt={course.name} />
                            <div className={styles["text-column"]}>
                                <div>
                                    <p className={textStyles["font-bold"]} style={{ fontSize: 18 }}>{course.name}</p>
                                    <p className={classNames(textStyles["font-italic"], textStyles["text-small"])}>Eğitmen: {course.instructor}</p>
                                </div>
                                <p className={textStyles["text-small"]} style={{ textAlign: "justify" }}>{course.description}</p>
                                <p className={textStyles["text-small"]}>{course.duration} - {course.students}</p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", width: "100%" }}>
                                    <div>
                                        <p className={textStyles["text-small"]}>{course.rating} <span style={{ fontSize: 12 }}>({course.reviews})</span></p>
                                        <p>* * * * *</p>
                                    </div>
                                    <div style={{ textAlign: "end" }}>
                                        <p className={textStyles["text-small"]} style={{ textDecoration: "line-through" }}>{course.originalPrice}</p>
                                        <p className={textStyles["font-bold"]}>{course.discountedPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
