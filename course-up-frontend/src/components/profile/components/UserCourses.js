import React, {useEffect, useState} from 'react';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import styles from "../css/UserCourses.module.css";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

const UserCourses = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState(null);
    const [coursesError, setCoursesError] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOngoingCourses = async (userId) => {
            try {
                setCoursesLoading(true);
                const response = await axios.get(`${Endpoints.USER_COURSES}/${userId}`);
                setCourses(response.data);
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

    const ProgressBarAndPlayButton = ({ percentage , traineeId, courseName}) => {
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
                <div onClick={() => navigate(`/profile/course-view/${courseName.replace(/\s+/g, '-').toLowerCase()}`, { state: { id: traineeId } })} title={"Kursu oynat"}
                     className={styles["play-button"]} style={{backgroundColor}}>
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
                                    return (
                                            <div key={item.id} className={styles["course-container"]}>
                                                <div className={styles["custom-row"]} style={{height:"100%"}}>
                                                    <div className={styles["text-info"]}>
                                                        <div>
                                                            <p className={textStyles["font-bold"]}>{item.name}</p>
                                                            <p className={classNames(textStyles["text-small"], textStyles["font-italic"])}>Eğitmen: {item.instructor}</p>
                                                        </div>
                                                        <p className={textStyles["text-small"]} style={{width:"100%"}}>{item.description}</p>
                                                        <div className={textStyles["text-small"]}>
                                                            <p><span style={{fontWeight:"bold"}}>Kurs Süresi: </span> {(item.duration/60).toFixed(2)} dakika</p>
                                                            <p><span style={{fontWeight:"bold"}}>Bölüm Sayısı: </span> {item.stage} bölüm</p>
                                                        </div>

                                                        <div className={classNames(styles["custom-row"],styles["course-info"])}>
                                                            <p>Geçirdiğin Süre<br/><span style={{fontWeight:400}}>{(item.current_duration/60).toFixed(2)} dakika</span></p>
                                                            {item.finished ? (
                                                                <p>Bitirme Tarihi<br/><span  style={{fontWeight:400}}>{item.end_date}</span></p>
                                                            ) : (
                                                                <p>Kaldığın Bölüm<br/><span  style={{fontWeight:400}}>Bölüm {item.current_stage}</span></p>
                                                            )}
                                                            <p>Başlama Tarihin<br/><span  style={{fontWeight:400}}>{item.started_date ? item.started_date : "Başlamadın"}</span></p>
                                                        </div>
                                                    </div>
                                                    <ProgressBarAndPlayButton percentage={item.percentage} traineeId={item.id} courseName={item.name}/>
                                                </div>
                                            </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{padding:12}}>
                            <p onClick={() => navigate(`/category`)} className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Devam eden bir kursun yok.<br/><span className={classNames(textStyles["text-underline"],textStyles["font-bold"])}>Şimdi yeni bir kurs ekle</span></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCourses;