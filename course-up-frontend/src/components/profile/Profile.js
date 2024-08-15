import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "../home/components/Header";
import Options from "./components/Options";
import UserCourses from "./components/UserCourses";
import UserWishList from "./components/UserWishList";
import UserStatistics from "./components/UserStatistics";
import UserComments from "./components/UserComments";
import UserSettings from "./components/UserSettings";

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
                <Route path="my-statistics" element={<UserStatistics />} />
                <Route path="my-comments" element={<UserComments />} />
                <Route path="my-settings" element={<UserSettings />} />
                <Route path="*" element={<Navigate to="my-courses" />} />
            </Routes>
        </div>
    );
};

export default Profile;
