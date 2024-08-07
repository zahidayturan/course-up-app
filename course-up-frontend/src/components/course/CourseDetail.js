import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Endpoints from "../../constants/Endpoints";
import styles from "./css/CourseDetail.module.css";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import Header from "../home/components/Header";
import RatingStars from "./RatingStars";
import classNames from "classnames";

const CourseDetail = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [courseError, setCourseError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [courseStages, setCourseStages] = useState(null);
    const [courseStagesLoading, setCourseStagesLoading] = useState(true);
    const [courseStagesError, setCourseStagesError] = useState(null);


    const [user, setUser] = useState(null);

    const [teacher, setTeacher] = useState(null);
    const [teacherLoading, setTeacherLoading] = useState(false);
    const [teacherError, setTeacherError] = useState(null);

    const [isTeacherMenuOpen, setIsTeacherMenuOpen] = useState(false);
    const navigate = useNavigate();

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
                    setCourseStages(response.data);
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

        if (isTeacherMenuOpen && !teacher && course.teacherId) {
            fetchTeacherDetail(course.teacherId);
        }
    }, [id, navigate, isTeacherMenuOpen, teacher]);


    const fetchTeacherDetail = async (teacherId) => {
        try {
            setTeacherLoading(true);
            const response = await axios.get(`${Endpoints.TEACHER_DETAIL}/${teacherId}`);
            setTeacher(response.data);
            console.log("Teacher data set");
        } catch (error) {
            setTeacherError('Eğitmen yüklenirken bir hata oluştu');
        } finally {
            setTeacherLoading(false);
        }
    };

    const toggleTeacherMenu = () => {
        setIsTeacherMenuOpen(!isTeacherMenuOpen);
    };

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
                                <div style={{display:"flex",flexDirection:"row",gap:18,flexWrap:"wrap"}}>
                                    <img className={styles["course-img"]} src={course.image} alt={course.name} />
                                    <div className={styles["course-title"]}>
                                        <div>
                                            <h1>{course.name}</h1>
                                            <p style={{height:19,fontStyle:"italic"}}>Eğitmen: {course.teacher}</p>
                                        </div>
                                        <div className={styles["course-info-box"]}>
                                            <div><span>{(course.duration/60).toFixed(2)} Saat</span><p>Eğitim<br/>Süresi</p></div>
                                            <div><span>{course.students}</span><p>Kayıtlı<br/>Öğrenci</p></div>
                                            <div><p style={{fontSize:12}}><span style={{fontSize:15}}>{course.rating} </span>({course.reviews} kişi)</p><p>Kurs Puanı</p><RatingStars rating={course.rating}/></div>
                                        </div>
                                        <div>
                                            <p><span>Video Dili: </span>{course.language}</p>
                                            <p><span>Altyazı Desteği: </span>{course.subtitles}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles["price-and-button"]}>
                                    <div style={{textAlign:"end"}}>
                                        <p style={{textDecoration:"line-through",fontSize:20}}>{course.originalPrice} ₺</p>
                                        <p style={{fontWeight:"bold",fontSize:26}}>{course.discountedPrice} ₺</p>
                                        <p style={{color:"var(--orange-color-1)",fontSize:18}}>%{course.discount} indirim</p>
                                    </div>
                                    <div className={styles["basket-button"]}><img src="/icon/basket.png" height={12} style={{filter:"brightness(100)",marginRight:6}} alt="add to basket"/> Sepete Ekle</div>
                                </div>
                            </div>
                            <h3 style={{marginTop:16}}>Kurs Hakkında</h3>
                            <p>{course.description}</p>
                            <div className={styles["custom-row"]} style={{marginTop:24,width:"100%",gap:24}}>
                                <div className={styles["stages-row"]} style={{backgroundColor:"var(--secondary-color-1)",borderRadius:8,padding:12}}>
                                    <h3>Kursun Bölümleri</h3>
                                    {courseStages && (
                                            <div>
                                                {courseStagesLoading ? (
                                                    <div className={mainStyles['loader']}><div className={mainStyles['spinner']}></div></div>
                                                ) : courseStagesError ? (
                                                    <p className={textStyles["text-center"]}>{teacherError}</p>
                                                ) :  (
                                                    <div style={{flexDirection:"column",display:"flex",gap:8,marginTop:8}}>{courseStages.map((item,index) => {
                                                            return (
                                                                <div className={styles["stages-container"]}>
                                                                    <p style={{fontWeight:"bold",fontSize:15}}>{index+1} - {item.name}</p>
                                                                    <p style={{fontSize:13}}>{item.description}</p>
                                                                    <p style={{fontStyle:"italic",fontSize:14}}>{item.duration} dakika</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                    )}
                                </div>
                                <div className={styles["trainer-info"]}>
                                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                        <p style={{fontWeight:"bold"}}>Eğitmen Hakkında</p>
                                        <div className={styles["show-button"]} onClick={toggleTeacherMenu}>
                                            <img style={{ transform: isTeacherMenuOpen ? 'rotate(90deg)' : 'rotate(-90deg)'}} src="/icon/arrow.png" alt=""/>
                                        </div>
                                    </div>
                                    {isTeacherMenuOpen && (
                                        <div>
                                            <p style={{textAlign:"end",fontWeight:"bold",fontSize:20}}>{course.teacher}</p>
                                            <div>
                                                {teacherLoading ? (
                                                    <div className={mainStyles['loader']}>
                                                        <div className={mainStyles['spinner']}></div>
                                                    </div>
                                                ) : teacherError ? (
                                                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{teacherError}</p>
                                                ) : teacher && (
                                                    <div style={{textAlign:"end"}}>
                                                        <p>{teacher.description}</p>
                                                        <p style={{fontWeight:600}}>{teacher.students} Öğrenci - {teacher.rating} Eğitmen Puanı - {teacher.courses} Kurs</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <h3 style={{marginTop:16}}>Kursun Yorumları</h3>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetail;
