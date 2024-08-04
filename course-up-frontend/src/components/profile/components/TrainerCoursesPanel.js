import React from 'react';
import styles from "../css/TrainerCoursePanel.module.css";
import {Navigate, Route, Routes} from "react-router-dom";
import TrainerCourseOptions from "./TrainerCourseOptions";
import TrainerCourses from "./TrainerCourses";
import TrainerAddCourse from "./TrainerAddCourse";

const TrainerCoursesPanel = () => {
    return (
        <div>
            <div className={styles["main-block"]}>
                <div style={{width:"100%"}}>
                    <Routes>
                        <Route path="courses" element={<TrainerCourses />} />
                        <Route path="add-course" element={<TrainerAddCourse />} />
                        <Route path="/" element={<Navigate to="courses" />} /> {}
                    </Routes>
                </div>
                <TrainerCourseOptions />
            </div>
        </div>
    );
};

export default TrainerCoursesPanel;
