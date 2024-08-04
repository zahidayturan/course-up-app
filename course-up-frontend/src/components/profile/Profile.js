import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "../home/components/Header";
import Options from "./components/Options";
import MyCourses from "./components/MyCourses";

const Profile = () => {
    const profileOptions = [
        { name: "Kurslarım", path: "/profile/my-courses" },
        { name: "İstatistiklerim", path: "/profile/my-statistics" },
        { name: "İstek Listem", path: "/profile/my-wishlist" },
        { name: "Yorumlarım", path: "/profile/my-comments" },
        { name: "Ayarlarım", path: "/profile/my-settings" }
    ];

    return (
        <div>
            <Header />
            <Options options={profileOptions} title="Profilin" />
            <Routes>
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="*" element={<Navigate to="my-courses" />} />
            </Routes>
        </div>
    );
};

export default Profile;
