import React, { useRef, useState, useEffect } from 'react';
import styles from '../../../assets/css/home/Courses.module.css';
import classNames from "classnames";

const Courses = () => {
    const containerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

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
                <div style={{width:48,height:14,borderRadius:30,backgroundColor:"var(--yellow-color-1)"}}></div>
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
                    <div className={styles["course-container"]}></div>
                    <div className={styles["course-container"]}></div>
                    <div className={styles["course-container"]}></div>
                    <div className={styles["course-container"]}></div>
                    <div className={styles["course-container"]}></div>
                </div>
                <div className={classNames(styles["custom-column"], styles["right-bar"])}>
                    <div style={{ width: 10, height: 60, borderRadius: 30, backgroundColor: "var(--yellow-color-1)", alignSelf: "end" }}></div>
                    {!isAtEnd && (
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
