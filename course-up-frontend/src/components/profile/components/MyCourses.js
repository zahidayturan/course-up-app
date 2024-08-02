import React, {useEffect, useState} from 'react';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import styles from "../css/MyCourses.module.css";
import classNames from "classnames";

const MyCourses = () => {
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

    const ProgressBar = ({ percentage }) => {
        const backgroundColor = percentage >= 75 ? 'var(--green-color-1)' : percentage >=50 ? 'var(--orange-color-1)' : 'var(--yellow-color-1)';
        return (
            <div className={styles["progress-bar-background"]}>
                <div
                    className={styles["progress-bar-foreground"]}
                    style={{ height: `${percentage}%`, backgroundColor }}
                ></div>
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
                        <div style={{padding:12}}>
                            <p style={{fontSize:24}}>Devam eden <span className={textStyles["font-bold"]}>kurslarım</span></p>
                            {courses.map((item) => {
                                const percentage = ((item.current_duration / item.duration) * 100).toFixed(1);
                                return (
                                    <div key={item.id} className={styles["course-container"]}>
                                        <p className={textStyles["font-bold"]}>{item.name}</p>
                                        <p className={classNames(textStyles["text-small"], textStyles["font-italic"])}>Eğitmen: {item.instructor}</p>
                                        <p className={classNames(textStyles["text-small"])}>{item.description}</p>
                                        <p className={classNames(textStyles["text-small"])}>Kurs Süresi {item.duration}</p>
                                        <p className={classNames(textStyles["text-small"])}>Bölüm Sayısı {item.stage}</p>
                                        <p className={classNames(textStyles["text-small"])}>Geçen Süre {item.current_duration}</p>
                                        <p className={classNames(textStyles["text-small"])}>Kaldığın Bölüm {item.current_stage}</p>
                                        <p className={classNames(textStyles["text-small"])}>Başlama Tarihi {item.started_date}</p>
                                        <ProgressBar percentage={percentage} />
                                        <p className={textStyles["text-small"]}>İlerleme <span className={textStyles["font-bold"]}>% {percentage}</span></p>
                                    </div>
                                );
                            })}
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

export default MyCourses;
