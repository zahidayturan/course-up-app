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
        const fetchCourseDetail = async (courseId,userId) => {
            try {
                const response = await axios.get(`${Endpoints.USER_COURSE}/${courseId}/${userId}`);
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
                    setCourseStagesError('Kurs ait bölümler yüklenirken bir hata oluştu');
                } finally {
                    setCourseStagesLoading(false);
                }
            };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCourseDetail(id,parsedUser.id);
        } else {
            console.log('No user data or course data found in localStorage');
        }
    }, [id, navigate]);

    const ProgressBar = ({ current_duration, duration }) => {
        const percentage = current_duration !== 0 ? ((current_duration / duration) * 100).toFixed(0) : "0";
        const backgroundColor = percentage >= 75 ? 'var(--green-color-1)' : percentage >=50 ? 'var(--orange-color-1)' : 'var(--yellow-color-1)';

        return (
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div className={styles["progress-bar-background"]}>
                    <div
                        className={styles["progress-bar-foreground"]}
                        style={{ width: `${percentage}%`, backgroundColor }}
                    ></div>
                </div>
                <p style={{textAlign:"center",fontSize:12}}>İlerleme <br/><span>%{percentage}</span></p>
            </div>

        );
    };

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
                    <div className={mainStyles['loader']}>
                        <div className={mainStyles['spinner']}></div>
                    </div>
                </div>
            ) : courseError ? (
                <div className={styles['course-box']}>
                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{courseError}</p>
                </div>
            ) : (
                <div>
                    <div className={styles['course-box']}>
                        <div style={{display:"flex",gap:12}}>
                            <div className={styles["progress-box"]}>
                                <p style={{fontSize:15,fontWeight:600}}>Kurs gösteriliyor</p>
                                <ProgressBar current_duration={course.current_duration} duration={course.duration} />
                            </div>
                            <div>
                                <h2>{course.name}</h2>
                                <p style={{fontSize:14}}>Eğitmen: {course.instructor}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
            }
        </div>
    );
};

export default UserCourseView;