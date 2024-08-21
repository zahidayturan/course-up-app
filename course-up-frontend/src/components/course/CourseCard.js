import React from 'react';
import {Link} from 'react-router-dom';
import textStyles from "../css/Text.module.css";
import styles from "../home/css/PopularCourses.module.css";
import classNames from "classnames";
import RatingStars from "./RatingStars";

const CourseCard = ({course}) => {

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;

    return (
        <div>
            <Link to={`/course/${course.name.replace(/\s+/g, '-').toLowerCase()}`} state={{ id: course.id }}   key={course.id} title={course.name} style={{textDecoration:"none"}}>
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
                        <p className={textStyles["text-small"]}>{(course.duration/3660).toFixed(2)} Saat Eğitim Süresi - {course.students} öğrenci</p>
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
        </div>
    );
};

export default CourseCard;
