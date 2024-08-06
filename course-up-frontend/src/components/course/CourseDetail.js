import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Endpoints from "../../constants/Endpoints";
import styles from "./css/CourseDetail.module.css";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import Header from "../home/components/Header";
import RatingStars from "./RatingStars";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [courseError, setCourseError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetail = async (courseId) => {
            try {
                const response = await axios.get(`${Endpoints.COURSE_DETAIL}/${courseId}`);
                if (response.data) {
                    setCourse(response.data);
                } else {
                    navigate('/home');
                }
            } catch (error) {
                setCourseError('Kurs yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail(id);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            console.log('No user data or course data found in localStorage');
            setCourseError('Kurs yüklenirken bir hata oluştu');
        }
    }, [id, navigate]);

    return (
        <div>
            <Header />
            {loading ? (
                    <div className={styles['course-box']}>
                        <div style={{ padding: 12 }}>
                            <div className={mainStyles['loader']}>
                                <div className={mainStyles['spinner']}></div>
                            </div>
                        </div>
                    </div>
                ) : courseError ? (
                    <div className={styles['course-box']}>
                        <div style={{ padding: 12 }}>
                            <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{courseError}</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles['course-box']}>
                        <div style={{ padding: 12 }}>
                            <p style={{fontSize:15,marginBottom:12,textUnderlineOffset:4}}>Kurslar/<Link to={`/category`} style={{color:"var(--secondary-color-2)"}}>Kategoriler</Link>/<Link to={`/category/${course.category}`} style={{color:"var(--secondary-color-2)"}}>{course.category}</Link></p>
                            <div className={styles["custom-row"]}>
                                <img className={styles["course-img"]} src={course.image} alt={course.name} />
                                <div className="">
                                    <h1>{course.name}</h1>
                                    <p>Eiğtmen: {course.instructor}</p>
                                    <div className={styles["course-info-box"]}>
                                        <div><span>{course.duration} Saat</span><p>Eğitim<br/>Süresi</p></div>
                                        <div><span>{course.students}</span><p>Kayıtlı<br/>Öğrenci</p></div>
                                        <div><p style={{fontSize:12}}><span style={{fontSize:15}}>{course.rating} </span>({course.reviews} kişi)</p><p>Kurs Puanı</p><RatingStars rating={course.rating}/></div>
                                    </div>

                                </div>
                                <div className="">
                                    <p>{course.originalPrice} ₺</p>
                                    <p>{course.discountedPrice} ₺</p>
                                    <p>%{course.discount} indirim</p>
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetail;
