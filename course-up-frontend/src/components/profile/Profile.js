import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "../home/components/Header";
import Options from "./components/Options";
import UserCourses from "./components/UserCourses";
import UserWishList from "./components/UserWishList";

const Profile = () => {
    const profileOptions = [
        { name: "Kurslarım", path: "/profile/my-courses" },
        { name: "İstatistiklerim", path: "/profile/my-statistics" },
        { name: "İstek Listem", path: "/profile/my-wish-list" },
        { name: "Yorumlarım", path: "/profile/my-comments" },
        { name: "Ayarlarım", path: "/profile/my-settings" }
    ];

    return (
        <div>
            <Header />
            <Options options={profileOptions} title="Profilin" />
            <Routes>
                <Route path="my-courses" element={<UserCourses />} />
                <Route path="my-wish-list" element={<UserWishList />} />
                <Route path="*" element={<Navigate to="my-courses" />} />
            </Routes>
        </div>
    );
};

export default Profile;
