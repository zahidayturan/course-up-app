import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Endpoints from "../../constants/Endpoints";
import styles from "./css/CourseDetail.module.css";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import Header from "../home/components/Header";
import RatingStars from "./RatingStars";
import CourseComments from "./CourseComments";
import {toast} from "react-toastify";


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

    const [openStages, setOpenStages] = useState({});

    const [categories, setCategories] = useState([]);

    const [isAlreadyExist, setIsAlreadyExist] = useState(null);
    const [isInWishList, setIsInWishList] = useState(null);
    const [isInBasket, setIsInBasket] = useState(null);

    const [mainLoading, setMainLoading] = useState(false);


    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (name) => {
        const category = categories.find(cat => cat.name === name);
        navigate(category.path);
    };

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

    useEffect(() => {
        if (isTeacherMenuOpen && !teacher && course.teacherId) {
            fetchTeacherDetail(course.teacherId);
        }
    }, [isTeacherMenuOpen, teacher]);

    useEffect(() => {
        const checkWishList = async () => {
            try {
                const response = await axios.get(`${Endpoints.CHECK_WISH_LIST}/${id}/${user.id}`);
                setIsInWishList(response.data);
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        if (user && course) {
            checkWishList();
        }
    }, [user, course, id]);

    useEffect(() => {
        const checkBasket = async () => {
            try {
                const response = await axios.get(`${Endpoints.CHECK_BASKET}/${id}/${user.id}`);
                setIsInBasket(response.data);
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        if (user && course) {
            checkBasket();
        }
    }, [user, course, id]);

    useEffect(() => {
        const checkItAlreadyExists = async () => {
            try {
                const response = await axios.get(`${Endpoints.CHECK_USER_COURSE}/${id}/${user.id}`);
                setIsAlreadyExist(response.data);
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        if (user && course) {
            checkItAlreadyExists();
        }
    }, [user, course, id]);

    const fetchTeacherDetail = async (teacherId) => {
        try {
            setTeacherLoading(true);
            const response = await axios.get(`${Endpoints.TEACHER_DETAIL}/${teacherId}`);
            setTeacher(response.data);
        } catch (error) {
            setTeacherError('Eğitmen yüklenirken bir hata oluştu');
        } finally {
            setTeacherLoading(false);
        }
    };

    const toggleTeacherMenu = () => {
        setIsTeacherMenuOpen(!isTeacherMenuOpen);
    };

    const toggleStagesMenu = (index) => {
        setOpenStages(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const addToWishList = async () => {
        try {
            setMainLoading(true);
            const wishListFormData = new FormData();
            wishListFormData.append('courseId', course.id);
            wishListFormData.append('userId', user.id);
            const response = await axios.post(`${Endpoints.ADD_TO_WISH_LIST}`, wishListFormData);
            if (response.status === 200) {
                setIsInWishList(true);
                toast.success("Kurs istek listene eklendi");
            }
        } catch (error) {
            toast.success("İşlem başarısız oldu");
            console.log(error);
        } finally {
            setMainLoading(false);
        }
    };

    const addToBasket = async () => {
        if(user){
            try {
                setMainLoading(true);
                const basketFormData = new FormData();
                basketFormData.append('courseId', course.id);
                basketFormData.append('userId', user.id);
                const response = await axios.post(`${Endpoints.ADD_TO_BASKET}`, basketFormData);
                if (response.status === 200) {
                    setIsInBasket(true);
                    toast.success("Kurs sepete eklendi");
                }
            } catch (error) {
                console.log(error);
                toast.error("Kurs sepete eklenirken bir hata oluştu");
            } finally {
                setMainLoading(false);
            }
        }else{
            toast.error("Sepete ekleyebilmek için giriş yapmalısınız");
        }
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
                            <p style={{fontSize:15,marginBottom:12,textUnderlineOffset:4}}>Kurslar/<Link to={`/category`} style={{color:"var(--secondary-color-2)"}}>Kategoriler</Link>/<span onClick={() => handleCategoryClick(course.category)} style={{color:"var(--secondary-color-2)",fontWeight:"normal",textDecoration:"underline",cursor:"pointer"}}>{course.category}</span></p>
                            <div className={styles["custom-row"]}>
                                <div style={{display:"flex",flexDirection:"row",gap:18,flexWrap:"wrap"}}>
                                    {course.imageId ? (<img className={styles["course-img"]} src={`https://${bName}.s3.amazonaws.com/${course.imageId}`} alt={course.name} />) : (<img style={{objectFit:"contain"}} className={styles["course-img"]} src="/logo/courseup-l-v1.png" alt="Course" />)}
                                    <div className={styles["course-title"]}>
                                        <div>
                                            <h1>{course.name}</h1>
                                            <p style={{height:19,fontStyle:"italic"}}>Eğitmen: {course.teacher}</p>
                                        </div>
                                        <div className={styles["course-info-box"]}>
                                            <div><span>{(course.duration/3600).toFixed(2)} Saat</span><p>Eğitim<br/>Süresi</p></div>
                                            <div><span>{course.students}</span><p>Kayıtlı<br/>Öğrenci</p></div>
                                            <div><p style={{fontSize:12}}><span style={{fontSize:15}}>{course.rating} </span>({course.reviews} kişi)</p><p>Kurs Puanı</p><RatingStars rating={course.rating}/></div>
                                        </div>
                                        <div>
                                            <p><span>Video Dili: </span>{course.language}</p>
                                            <p><span>Altyazı Desteği: </span>{course.subtitles}</p>
                                        </div>
                                        {(user) && (<p className={textStyles["text-underline"]} style={{color:"var(--orange-color-1)",fontSize:13,width:"max-content"}} onClick={ () => isInWishList ? navigate(`/profile/my-wish-list`) :addToWishList}>{isInWishList ? ("Kurs İstek Listende") : "İstek Listene Ekle"}</p>)}
                                    </div>
                                </div>
                                <div className={styles["price-and-button"]}>
                                    <div style={{textAlign:"end"}}>
                                        {course.discount !== 0 && (<p style={{textDecoration:"line-through",fontSize:20}}>{course.originalPrice} ₺</p>)}
                                        <p style={{fontWeight:"bold",fontSize:26}}>{course.discountedPrice} ₺</p>
                                        {course.discount !== 0 && (<p style={{color:"var(--orange-color-1)",fontSize:18}}>%{course.discount} indirim</p>)}
                                    </div>
                                    {isAlreadyExist ?
                                        <button className={styles["basket-button"]} onClick={() => navigate('/profile')}>Kursa Sahipsin</button>
                                        : <button className={styles["basket-button"]} disabled={isInBasket} onClick={addToBasket}><img src="/icon/basket.png" height={12} style={{filter:"brightness(100)",marginRight:6}} alt="add to basket"/>{isInBasket ? ("Sepette") : ("Sepete Ekle")} </button>
                                    }
                                </div>
                            </div>
                            <h3 style={{marginTop:24}}>Kurs Hakkında</h3>
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
                                                        const isOpen = openStages[index];
                                                        return (
                                                                <div className={styles["stages-container"]} key={index}>
                                                                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                                                        <p style={{fontSize:15,fontWeight:600}}>{index+1} - {item.name} <span style={{fontSize: 14,fontWeight:"normal" }}>{(item.duration/60).toFixed(2)} dakika</span></p>
                                                                        <div style={{display:"flex",gap:6}}>
                                                                            {index !==0 && (
                                                                                <div className={styles["show-button"]} style={{backgroundColor:"var(--orange-color-1)"}}>
                                                                                    <img  src="/icon/lock.png" alt="lock"/>
                                                                                </div>
                                                                            )}
                                                                            <div className={styles["show-button"]} onClick={() => toggleStagesMenu(index)}>
                                                                                <img style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'}} src="/icon/arrow.png" alt="toggle"/>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    {isOpen && (
                                                                        <div>
                                                                            <p style={{ fontSize: 14 }}>{item.description}</p>
                                                                            {index !==0 ? (<p style={{ fontSize: 13,fontStyle:"italic",marginTop:4}}>Bu içeriği izleyebilmek için satın almalısınız</p>) : <video width="100%" height="auto" style={{borderRadius:8,marginTop:12}} src={`https://${bName}.s3.amazonaws.com/${item.videoId}`} controls></video>}
                                                                        </div>
                                                                    )}
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
                            {course && (
                                <div>
                                    <h3 style={{marginTop:16}}>Kursun Yorumları</h3>
                                    <div className={styles["all-comments"]}>
                                        <CourseComments courseId={course.id}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetail;
