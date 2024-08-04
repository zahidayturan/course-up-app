import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "../css/TrainerCourseOptions.module.css";

const TrainerCourseOptions = () => {
    const location = useLocation();

    const buttonMenu = [
        { img: "/icon/start.png", decC: "", text: "Kurslarını", boldText: "görüntüle", path: "/profile/trainer/my-course/courses" },
        { img: "/icon/add.png", decC: "var(--yellow-color-1)", text: "Yeni", boldText: "kurs ekle", path: "/profile/trainer/my-course/add-course" },
        { img: "/icon/wait.png", decC: "var(--green-color-1)", text: "Onay bekleyen", boldText: "kursların", path: "/profile/trainer/my-course/approval" },
        { img: "/icon/search.png", decC: "var(--orange-color-1)", text: "Kurslarını", boldText: "öne çıkar", path: "/profile/trainer/my-course/stand-out" },
        { img: "/icon/people.png", decC: "var(--grey-color-1)", text: "Sözleşmeni", boldText: "incele", path: "/profile/trainer/my-course/agreement" },
    ];

    return (
        <div className={styles["button-menu"]}>
            {buttonMenu.map((item, index) => (
                <Link to={item.path} key={index} className={styles["button"]}
                    style={{ backgroundColor: (location.pathname === item.path ? "var(--secondary-color-2)" : "") }}
                >
                    <div className={styles["button-sign"]} style={{ backgroundColor: (location.pathname === item.path ? "var(--primary-color-1)" : item.decC) }}></div>
                    <p style={{ color: (location.pathname === item.path ? "var(--primary-color-1)" : "") }}>{item.text} <br className={styles["mobile-button-text"]} /><span>{item.boldText}</span></p>
                    <img className={styles["button-icon"]} style={{ filter: (location.pathname === item.path ? "brightness(50)" : "") }} src={item.img} alt="add"/>
                </Link>
            ))}
        </div>
    );
};

export default TrainerCourseOptions;
