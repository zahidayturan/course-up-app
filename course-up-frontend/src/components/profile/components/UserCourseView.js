import React, {useEffect, useState} from 'react';
import textStyles from "../../css/Text.module.css";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../home/components/Header";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import styles from "../css/UserCourseView.module.css";


const UserCourseView = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [courseError, setCourseError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [courseStages, setCourseStages] = useState(null);
    const [courseStagesLoading, setCourseStagesLoading] = useState(true);
    const [courseStagesError, setCourseStagesError] = useState(null);


    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const [mainLoading, setMainLoading] = useState(false);

    useEffect(() => {
        const fetchCourseDetail = async (courseId) => {
            try {
                const response = await axios.get(`${Endpoints.COURSE_DETAIL}/${courseId}`);
                if (response.data) {
                    setCourse(response.data);
                    console.log("Course detail set");
                    await fetchCourseStages(id);
                } else {
                    navigate('/home');
                }
            } catch (error) {
                setCourseError('Kurs yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        const fetchCourseStages = async (courseId) => {
            try {
                const response = await axios.get(`${Endpoints.COURSE_STAGES}/${courseId}`);
                if (response.data) {
                    const sortedStages = response.data.sort((a, b) => a.episodeNumber - b.episodeNumber);
                    setCourseStages(sortedStages);
                    console.log("Course stages set");
                }
            } catch (error) {
                setCourseStagesError('Kurs bölümleri yüklenirken bir hata oluştu');
            } finally {
                setCourseStagesLoading(false);
            }
        };

        fetchCourseDetail(id);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            console.log('No user data or course data found in localStorage');
        }
    }, [id, navigate]);

    return (
        <div>
            {mainLoading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
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
                <div>
                    <div className={styles['course-box']}>
                        <p>{course.name}</p>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default UserCourseView;