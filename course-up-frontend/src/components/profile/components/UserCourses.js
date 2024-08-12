import React, {useEffect, useState} from 'react';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import styles from "../css/UserCourses.module.css";
import classNames from "classnames";

const UserCourses = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState(null);
    const [coursesError, setCoursesError] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);

    useEffect(() => {
        const fetchOngoingCourses = async (userId) => {
            try {
                setCoursesLoading(true);
                const response = await axios.get(`${Endpoints.USER_COURSES}/${userId}`);
                setCourses(response.data);
                console.log('Ongoing courses set');
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
            fetchOngoingCourses(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const ProgressBarAndPlayButton = ({ percentage }) => {
        const backgroundColor = percentage >= 75 ? 'var(--green-color-1)' : percentage >=40 ? 'var(--orange-color-1)' : 'var(--yellow-color-1)';
        return (
            <div className={styles["custom-column"]} style={{marginLeft:8}}>
                <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                    <div className={styles["progress-bar-background"]}>
                        <div
                            className={styles["progress-bar-foreground"]}
                            style={{ height: `${percentage}%`, backgroundColor }}
                        ></div>
                    </div>
                    <p className={classNames(textStyles["text-center"])} style={{fontSize:12}}>İlerleme<br/><span className={textStyles["font-bold"]}>% {percentage}</span></p>
                </div>
                <div className={styles["play-button"]} style={{backgroundColor}}>
                    <img src="/icon/play.png" alt="Play" />
                </div>
            </div>

        );
    };

    return (
        <div>
            {user && (
                <div className={styles['courses-box']}>
                    {coursesLoading ? (
                        <div style={{padding:12}}>
                            <div className={mainStyles['loader']}>
                                <div className={mainStyles['spinner']}></div>
                            </div>
                        </div>
                    ) : coursesError ? (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{coursesError}</p>
                        </div>
                    ) : courses && courses.length > 0 ? (
                        <div style={{padding:12,width:"100%"}}>
                            <div className={styles["custom-row"]}>
                                <p style={{fontSize:24}}>Devam eden <span className={textStyles["font-bold"]}>kursların</span></p>
                                <div className={styles["mini-decoration"]}></div>
                            </div>

                            <div className={styles["course-grid"]}>
                                {courses.map((item) => {
                                    const percentage = item.current_duration !== 0 ? ((item.current_duration / item.duration) * 100).toFixed(1) : 0;
                                    return (
                                            <div key={item.id} className={styles["course-container"]}>
                                                <div className={styles["custom-row"]} style={{height:"100%"}}>
                                                    <div className={styles["text-info"]}>
                                                        <div>
                                                            <p className={textStyles["font-bold"]}>{item.name}</p>
                                                            <p className={classNames(textStyles["text-small"], textStyles["font-italic"])}>Eğitmen: {item.teacher}</p>
                                                        </div>
                                                        <p className={textStyles["text-small"]} style={{width:"100%"}}>{item.description}</p>
                                                        <div className={textStyles["text-small"]}>
                                                            <p><span style={{fontWeight:"bold"}}>Kurs Süresi: </span> {item.duration} dakika</p>
                                                            <p><span style={{fontWeight:"bold"}}>Bölüm Sayısı: </span> {item.stage} bölüm</p>
                                                        </div>

                                                        <div className={classNames(styles["custom-row"],styles["course-info"])}>
                                                            <p>Geçirdiğin Süre<br/><span style={{fontWeight:400}}>{item.current_duration} dakika</span></p>
                                                            <p>Kaldığın Bölüm<br/><span  style={{fontWeight:400}}>Bölüm {item.current_stage}</span></p>
                                                            <p>Başlama Tarihin<br/><span  style={{fontWeight:400}}>{item.started_date}</span></p>
                                                        </div>
                                                    </div>
                                                    <ProgressBarAndPlayButton percentage={percentage} />
                                                </div>
                                            </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Devam eden bir kursun yok.<br/><span className={classNames(textStyles["text-underline"],textStyles["font-bold"])}>Şimdi yeni bir kurs ekle</span></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCourses;