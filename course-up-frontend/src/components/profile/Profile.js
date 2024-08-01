import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "../home/components/Header";
import Options from "./components/Options";
import MyCourses from "./components/MyCourses";

const Profile = () => {
    return (
        <div>
            <Header />
            <Options />
            <Routes>
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="/" element={<Navigate to="my-courses" />} /> {}
            </Routes>
        </div>
    );
};

export default Profile;
