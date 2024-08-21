import React, { useEffect, useState } from 'react';
import Header from "../home/components/Header";
import {useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import mainStyles from "../css/Main.module.css";
import textStyles from "../css/Text.module.css";
import stylesOne from "./css/OneCategory.module.css";
import CourseCard from "./CourseCard";

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
                                    <CourseCard key={course.id} course={course}/>  // Burada benzersiz bir `key` propu ekliyoruz
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