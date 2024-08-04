import React, { useEffect, useState } from 'react';
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import styles from "../css/TrainerCourses.module.css";
import classNames from "classnames";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import {Link, useLocation} from "react-router-dom";

const TrainerCourses = () => {
    const [user, setUser] = useState(null);
    const [activeCourses, setActiveCourses] = useState([]);
    const [inactiveCourses, setInactiveCourses] = useState([]);
    const [coursesError, setCoursesError] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchTeacherCourses = async (userId) => {
            try {
                const response = await axios.get(`${Endpoints.TEACHER_COURSES}/${userId}`);
                const courses = response.data;
                setActiveCourses(courses.filter(course => course.active));
                setInactiveCourses(courses.filter(course => !course.active));
            } catch (error) {
                setCoursesError('Kurslarınız yüklenirken bir hata oluştu');
            } finally {
                setCoursesLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setCoursesLoading(true);
            fetchTeacherCourses(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
            setCoursesError('Kurslarınız yüklenirken bir hata oluştu');
        }
    }, []);

    const CourseCard = ({ item }) => (
        <div className={classNames(styles["course-container"],styles["custom-row"])} style={{height:"100%",alignItems:"center"}}>
            <img className={styles["course-img"]} src={item.image} alt={item.name} />
            <div className={styles["custom-column"]}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className={textStyles["font-bold"]}>{item.name}</p>
                    <p className={textStyles["text-small"]} style={{ width: "100%" }}>{item.description}</p>
                </div>
                <div className={textStyles["text-small"]} style={{margin:"8px 0"}}>
                    <p><span>Kurs Süresi: </span> {item.duration} dakika</p>
                    <p><span>Bölüm Sayısı: </span> {item.stage} bölüm</p>
                    <div style={{height:6}}></div>
                    <p><span>Kayıtlı Öğrenci Sayısı: </span> {item.students} öğrenci</p>
                    <p><span>Değerlendirme Puanı: </span> {item.rating} puan ({item.reviews} kişi)</p>
                </div>
                <div className={classNames(styles["custom-row"],styles["price-button"])}>
                    <div style={{ display: "flex", alignItems: "end", gap: 4 }} >
                        <p className={textStyles["text-small"]} style={{ textDecoration: "line-through" }}>{item.originalPrice} ₺</p>
                        <p className={textStyles["font-bold"]}>{item.discountedPrice} ₺</p>
                        <p className={textStyles["text-small"]} style={{ color: "var(--orange-color-1)" }}>%{item.discount} indirim</p>
                    </div>
                    <p className={styles["text-button"]} style={{backgroundColor: item.active ? "var(--orange-color-1)": "var(--secondary-color-2)"}}>Kurs Düzenleme ve İstatistikler</p>
                </div>
            </div>
        </div>
    );

    const buttonMenu = [
        {img: "/icon/start.png", decC:"" ,text : "Kurslarını", boldText: "görüntüle",path: "/profile/trainer/my-courses"},
        {img: "/icon/add.png", decC:"var(--yellow-color-1)" ,text : "Yeni", boldText: "kurs ekle",path: "/profile/trainer/my-courses/add-course"},
        {img: "/icon/wait.png", decC:"var(--green-color-1)",text : "Onay bekleyen", boldText: "kursların",path: "/profile/trainer/my-courses/approval"},
        {img: "/icon/search.png",decC:"var(--orange-color-1)",text : "Kurslarını",boldText: "öne çıkar",path: "/profile/trainer/my-courses/stand-out"},
        {img: "/icon/people.png", decC:"var(--grey-color-1)", text :"Sözleşmeni", boldText: "incele",path: "/profile/trainer/my-courses/aggrement"},
    ];


    return (
        <div>
            {user && (
                <div className={styles["main-block"]}>
                    <div style={{width:"100%"}}>
                        {coursesLoading ? (
                            <div className={styles['courses-box']}>
                                <div style={{ padding: 12 }}>
                                    <div className={mainStyles['loader']}>
                                        <div className={mainStyles['spinner']}></div>
                                    </div>
                                </div>
                            </div>
                        ) : coursesError ? (
                            <div className={styles['courses-box']}>
                                <div style={{ padding: 12 }}>
                                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{coursesError}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {activeCourses && (
                                    <div className={styles['courses-box']}>
                                        <div style={{ padding: 12 }}>
                                            <div className={styles["custom-row"]} style={{ marginBottom: 8 }}>
                                                <p style={{ fontSize: 24 }}>Aktif <span className={textStyles["font-bold"]}>kursların </span><span style={{ fontSize: 16, fontStyle: "italic", fontWeight: 400 }}>(Öğrenci kabul ediyor)</span></p>
                                                <div className={styles["mini-decoration"]}></div>
                                            </div>
                                            {activeCourses.length > 0 ? (
                                                <div>
                                                    {activeCourses.map((item) => (
                                                        <CourseCard key={item.id} item={item} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ padding: 12 }}>
                                                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>Henüz aktif kursun yok.<br /><span className={classNames(textStyles["text-underline"], textStyles["font-bold"])}>Şimdi yeni bir kurs ekle</span></p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {(inactiveCourses && inactiveCourses.length) > 0 && (
                                    <div className={styles['courses-box']} style={{marginTop:24}}>
                                        <div style={{ padding: 12 }}>
                                            <div className={styles["custom-row"]} style={{ marginBottom: 8 }}>
                                                <p style={{ fontSize: 24 }}>Pasif <span className={textStyles["font-bold"]}>kursların </span><span style={{ fontSize: 16, fontStyle: "italic", fontWeight: 400 }}>(Öğrenci kabul etmiyor)</span></p>
                                                <div className={styles["mini-decoration"]} style={{backgroundColor:"var(--secondary-color-2)"}}></div>
                                            </div>
                                            <div>
                                                {inactiveCourses.map((item) => (
                                                    <CourseCard key={item.id} item={item} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles["button-menu"]}>
                        {buttonMenu.map((item, index) => (
                            <Link to={item.path} key={index} className={classNames(styles["button"],)} style={{backgroundColor :(location.pathname === item.path ? "var(--secondary-color-2)": "")}}>
                                <div className={styles["button-sign"]} style={{ backgroundColor:(location.pathname === item.path ? "var(--primary-color-1)" : item.decC ) }}></div>
                                <p style={{color:(location.pathname === item.path ? "var(--primary-color-1)":"")}}>{item.text} <br className={styles["mobile-button-text"]} /><span>{item.boldText}</span></p>
                                <img className={styles["button-icon"]} style={{filter:(location.pathname === item.path ? "brightness(50)" :"")}} src={item.img} alt="add" />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerCourses;
