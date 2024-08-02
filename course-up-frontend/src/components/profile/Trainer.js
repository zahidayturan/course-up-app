import React from 'react';
import Header from "../home/components/Header";
import Options from "./components/Options";
import {Navigate, Route, Routes} from "react-router-dom";
import TrainerCourses from "./components/TrainerCourses";

const Trainer = () => {

    const profileOptions = [
        { name: "Kurslarım", path: "/profile/trainer/my-courses" },
        { name: "İstatistiklerim", path: "/profile/trainer/my-statistics" },
        { name: "Ödemelerim", path: "/profile/trainer/my-payments" },
        { name: "Ayarlarım", path: "/profile/trainer/my-settings" }
    ];

    return (
        <div>
            <Header />
            <Options options={profileOptions} title="Eğitmen Panelin" />
            <Routes>
                <Route path="my-courses" element={<TrainerCourses />} />
                <Route path="/" element={<Navigate to="my-courses" />} /> {}
            </Routes>
        </div>
    );
};

export default Trainer;
