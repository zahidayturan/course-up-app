import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Endpoints from "../../constants/Endpoints";
import styles from "./css/CourseDetail.module.css";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import Header from "../home/components/Header";

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
                navigate('/home');
            } finally {
                setLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCourseDetail(id);
        } else {
            console.log('No user data or course data found in localStorage');
            setCourseError('Kurs yüklenirken bir hata oluştu');
            setLoading(false);
            navigate('/home');
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
                            <h1>{course.name}</h1>
                            <p>{course.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetail;
