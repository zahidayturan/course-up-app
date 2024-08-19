import React, {useCallback, useEffect, useState} from 'react';
import textStyles from "../../css/Text.module.css";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../home/components/Header";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import styles from "../css/UserCourseView.module.css";
import classNames from "classnames";
import RatingStars from "../../course/RatingStars";
import {Button, Modal, Slider} from "@mui/material";


const UserCourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [courseError, setCourseError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [courseStages, setCourseStages] = useState(null);
    const [courseStagesLoading, setCourseStagesLoading] = useState(true);
    const [courseStagesError, setCourseStagesError] = useState(null);
    const [currentCourseStage, setCurrentCourseStage] = useState(null);

    const [user, setUser] = useState(null);

    const [mainLoading, setMainLoading] = useState(false);

    const navigate = useNavigate();

    const fetchCourseDetail = useCallback(async () => {
        try {
            const response = await axios.get(`${Endpoints.USER_COURSE}/${id}`);
            if (response.data) {
                setCourse(response.data);
            }
        } catch (error) {
            setCourseError('Kurs yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }, [id]);

    const fetchCourseStages = useCallback(async (courseId) => {
        try {
            const response = await axios.get(`${Endpoints.COURSE_STAGES}/${courseId}`);
            if (response.data) {
                const sortedStages = response.data.sort((a, b) => a.episodeNumber - b.episodeNumber);
                setCourseStages(sortedStages);
                const currentStage = sortedStages.find(stage => stage.episodeNumber === course?.current_stage);
                setCurrentCourseStage(currentStage);
            }
        } catch (error) {
            setCourseStagesError('Kursa ait bölümler yüklenirken bir hata oluştu');
        } finally {
            setCourseStagesLoading(false);
        }
    }, [course?.current_stage]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCourseDetail();
        } else {
            console.log('Kullanıcı verisi bulunamadı, anasayfaya yönlendiriliyor');
            navigate('/home');
        }
    }, [id, fetchCourseDetail, navigate]);

    useEffect(() => {
        if (course) {
            fetchCourseStages(course.courseId);
        }
    }, [course?.courseId, fetchCourseStages]);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const handleOpen = (currentPoint = 0) => {
        setOpen(true);
        setRating(currentPoint);
    };

    const handleClose = () => setOpen(false);
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSave = async () => {
        setMainLoading(true);
        const formData = new FormData();
        formData.append('traineeId', id);
        formData.append('coursePoint', rating);

        try {
            const response = await axios.post(Endpoints.UPDATE_COURSE_POINT, formData);
            console.log('Rating updated successfully:', response.data);
            handleClose();
            if (response.data) {
                setCourse(prevCourse => ({ ...prevCourse, course_point: rating }));
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        } finally {
            setMainLoading(false);
        }
    };

    const ProgressBar = ({ percentage = 0}) => {
        const backgroundColor = percentage >= 75 ? 'var(--green-color-1)' : percentage >= 50 ? 'var(--orange-color-1)' : 'var(--yellow-color-1)';
        return (
            <div className={styles["progress-box-content"]}>
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


    const bName = process.env.REACT_APP_S3_BUCKET_NAME;

    return (
        <div>
            {mainLoading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
            <Header />
            {loading && courseStagesLoading ? (
                <div className={styles['course-box']}>
                    <div className={mainStyles['loader']}>
                        <div className={mainStyles['spinner']}></div>
                    </div>
                </div>
            ) : courseError && courseStagesError ? (
                <div className={styles['course-box']}>
                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{courseError} {courseStagesError}</p>
                </div>
            ) : user && course && courseStages && (
                <div className={styles["custom-row"]}>
                        <div className={styles["course-info-menu"]}>
                            <div className={styles["progress-box"]}>
                                <p style={{fontSize:15,fontWeight:600}}>Kurs gösteriliyor</p>
                                <ProgressBar percentage={course.percentage}  />
                            </div>
                            <div className={classNames(styles['course-box'],styles["info-text"])}>
                                <h3>Kurs<br/>Bilgilerin</h3>
                                <div style={{marginLeft:6}}>
                                    <p style={{fontWeight:600}}>Harcadığın Süre</p>
                                    <p>{course.current_duration !== 0 ? (course.current_duration/60).toFixed(2) : 0} dakika</p>
                                    <p style={{fontStyle:"italic",fontSize:13}}>Kurs {(course.duration/60).toFixed(2)} dakika</p>
                                </div>
                                <div style={{marginLeft:6}}>
                                    <p style={{fontWeight:600}}>Kaldığın Bölüm</p>
                                    <p>Bölüm {course.current_stage}</p>
                                    <p style={{fontStyle:"italic",fontSize:13}}>Kurs {course.stage} bölüm</p>
                                </div>
                                <div style={{marginLeft:6}}>
                                    <p style={{fontWeight:600}}>Başlama Tarihin</p>
                                    <p>{course.started_date}</p>
                                </div>
                                <div style={{ marginLeft: 6 }}>
                                    <p style={{ fontWeight: 600 }}>Kurs Puanın</p>
                                    <p style={{ fontStyle: "italic", fontSize: 13 }}>
                                        {course.percentage >= 95
                                            ? (course.course_point === 0 ? "Puan vermediniz" : course.course_point)
                                            : "Puan verebilmek için kurs ilerlemen en az %95 olmalı"}
                                    </p>
                                    <div className={styles["mini-button"]} onClick={() => handleOpen(course.course_point)}>
                                        <RatingStars rating={course.course_point} size={13} />
                                    </div>

                                    <Modal open={open} onClose={handleClose}>
                                        <div className={styles["open-menu"]}>
                                            <h3>Kursu Puanla</h3>
                                            <Slider
                                                value={rating}
                                                onChange={handleRatingChange}
                                                step={0.1}
                                                min={0.1}
                                                max={5}
                                                valueLabelDisplay="auto"
                                                aria-labelledby="continuous-slider"
                                                style={{color:"var(--orange-color-1)"}}
                                            />
                                            <p>Vereceğiniz Puan: <span>{rating}</span></p>
                                            <RatingStars rating={rating}/>
                                            <button style={{backgroundColor:"var(--orange-color-1)",color:"var(--secondary-color-1)",border:"none",width:"100%",height:"32px",borderRadius:6,fontSize:14}} onClick={handleSave}>Kaydet</button>
                                        </div>
                                    </Modal>
                                </div>
                                <div style={{marginLeft:6}}>
                                    <p style={{fontWeight:600}}>Kurs Yorumun</p>
                                    <p style={{fontStyle:"italic",fontSize:13}}>{course.percentage < 95 && "Yorum yapabilmek için kurs ilerlemen en az %95 olmalı"}</p>
                                    <p className={styles["mini-button"]}>Yorum yapılmadı</p>
                                </div>
                            </div>
                        </div>
                        <div className={classNames(styles['course-box'],styles["course-view-menu"])}>
                            <div>
                                <h2>{course.name}</h2>
                                <p style={{fontSize:14}}>Eğitmen: {course.instructor}</p>
                            </div>
                            <div>
                                {currentCourseStage && (
                                    <div>
                                        <div>
                                            <div>
                                                <h3>Oynatılan Bölüm <span style={{ fontWeight: "normal", fontSize: 14 }}>{(currentCourseStage.duration / 60).toFixed(2)} dakika</span></h3>
                                                <p>{currentCourseStage.description}</p>
                                            </div>
                                            <select onChange={(e) => {
                                                const selectedStage = courseStages.find(stage => stage.episodeNumber === parseInt(e.target.value));
                                                setCurrentCourseStage(selectedStage);
                                            }} value={currentCourseStage.episodeNumber}>
                                                {courseStages.map((stage) => (
                                                    <option key={stage.episodeNumber} value={stage.episodeNumber}>
                                                        Bölüm {stage.episodeNumber}: {stage.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {currentCourseStage.videoId ? <video width="100%" height="auto" style={{ borderRadius: 8, marginTop: 12 }} src={`https://${bName}.s3.amazonaws.com/${currentCourseStage.videoId}`} controls></video> : <p>Kurs bölümü yüklenemedi</p>}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
            ) }
        </div>
    );
};

export default UserCourseView;