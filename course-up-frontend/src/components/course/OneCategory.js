import React, { useEffect, useState } from 'react';
import Header from "../home/components/Header";
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import styles from "../home/css/PopularCourses.module.css";
import stylesOne from "./css/OneCategory.module.css";
import classNames from "classnames";
import RatingStars from "./RatingStars";

const OneCategory = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [courses, setCourses] = useState(null);
    const [coursesError, setCoursesError] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);

    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => {
                const foundCategory = data.find(cat => cat.path.split("/").pop() === name);
                if (foundCategory) {
                    setCategory(foundCategory);
                } else {
                    navigate('/category');
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                navigate('/category');
            });
    }, [name, navigate]);

    useEffect(() => {
        const fetchOngoingCourses = async (categoryName) => {
            try {
                setCoursesLoading(true);
                console.log(categoryName);
                const response = await axios.get(`${Endpoints.COURSES_BY_CATEGORY}/${categoryName}`);
                setCourses(response.data);
                console.log('Courses set');
            } catch (error) {
                setCoursesError('Kategoriye ait kurslar yüklenirken bir hata oluştu');
            } finally {
                setCoursesLoading(false);
            }
        };
        if (category) {
            fetchOngoingCourses(category.name);
        }
    }, [category]);

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;

    return (
        <div>
            <Header />

            {coursesLoading ? (
                <div style={{ padding: 12 }}>
                    <div className={mainStyles['loader']}>
                        <div className={mainStyles['spinner']}></div>
                    </div>
                </div>
            ) : coursesError ? (
                <div style={{ padding: 12 }}>
                    <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{coursesError}</p>
                </div>
            ) : (
                courses && (
                    <div>
                        <p style={{margin:"24px 0",fontSize:16}}><span style={{fontSize:20}}>{category.name}</span> kategorisine ait kurslar</p>
                        <div className={stylesOne["all-courses"]}>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <Link to={`/course/${course.id}`} key={course.id} style={{textDecoration:"none"}}>
                                        <div key={course.id} className={styles["course-container"]}>
                                            {course.discount > 0 && (
                                                <div className={styles["discount-text"]}>
                                                    <span className={textStyles["font-bold"]}>% {course.discount}</span> indirim
                                                </div>
                                            )}
                                            <div style={{width:"100%"}}>
                                                {course.imageId ? (<img className={styles["course-img"]} src={`https://${bName}.s3.amazonaws.com/${course.imageId}`} alt="Course" />) : (<img style={{objectFit:"contain"}} className={styles["course-img"]} src="/logo/courseup-l-v1.png" alt="Course" />)}
                                            </div>
                                            <div className={styles["text-column"]}>
                                                <div>
                                                    <p className={textStyles["font-bold"]} style={{ fontSize: 18 }}>{course.name}</p>
                                                    <p className={classNames(textStyles["font-italic"], textStyles["text-small"])}>Eğitmen: {course.teacher}</p>
                                                </div>
                                                <p className={textStyles["text-small"]} style={{ textAlign: "justify" }}>{course.description}</p>
                                                <p className={textStyles["text-small"]}>{(course.duration/60).toFixed(2)} Saat Eğitim Süresi - {course.students} öğrenci</p>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", width: "100%" }}>
                                                    <div>
                                                        <p className={textStyles["text-small"]} style={{marginBottom:4}}>{course.rating} <span style={{ fontSize: 12 }}>({course.reviews}) kişi</span></p>
                                                        <RatingStars rating={course.rating} size={12}/>
                                                    </div>
                                                    <div style={{ textAlign: "end" }}>
                                                        {course.discount !== 0 && (<p className={textStyles["text-small"]} style={{ textDecoration: "line-through" }}>{course.originalPrice} ₺</p>)}
                                                        <p className={textStyles["font-bold"]}>{course.discountedPrice} ₺</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                ))
                            ) : (
                                <><p>Kategoriye ait kurs bulunamadı.</p></>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default OneCategory;
