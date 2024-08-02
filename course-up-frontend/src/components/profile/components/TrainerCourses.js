import React, {useEffect, useState} from 'react';
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import styles from "../css/TrainerCourses.module.css";
import classNames from "classnames";

const TrainerCourses = () => {
    const [user, setUser] = useState(null);
    const [coursesError, setCoursesError] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCoursesLoading(true);
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setCoursesLoading(false);
        } else {
            console.log('No user data found in localStorage');
            setCoursesError('Kurslarınız yüklenirken bir hata oluştu');
        }
    }, []);

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
                    ) : 1 > 0 ? (
                        <div style={{padding:12}}>
                            <div className={styles["custom-row"]}>
                                <p style={{fontSize:24}}>Aktif <span className={textStyles["font-bold"]}>kursların </span><span style={{fontSize:16,fontStyle:"italic"}}>(Öğrenci kabul ediyor)</span></p>
                                <div className={styles["mini-decoration"]}></div>
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

export default TrainerCourses;