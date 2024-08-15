import React, {useEffect, useState} from 'react';
import Header from "../home/components/Header";
import Options from "./components/Options";
import {Navigate, Route, Routes} from "react-router-dom";
import TrainerCoursesPanel from "./components/TrainerCoursesPanel";
import TrainerForm from "./components/TrainerForm";
import TrainerStatistics from "./components/TrainerStatistics";
import TrainerPayments from "./components/TrainerPayments";
import TrainerSettings from "./components/TrainerSettings";

const Trainer = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const profileOptions = [
        { name: "Kurslarım", path: "/profile/trainer/my-course" },
        { name: "İstatistiklerim", path: "/profile/trainer/my-statistics" },
        { name: "Ödemelerim", path: "/profile/trainer/my-payments" },
        { name: "Ayarlarım", path: "/profile/trainer/my-settings" }
    ];

    return (
        <div>
            <Header />
            {user ? (
                user.teacher ? (
                    <div>
                        <Options options={profileOptions} title="Eğitmen Panelin" />
                        <Routes>
                            <Route path="my-course/*" element={<TrainerCoursesPanel />} />
                            <Route path="my-statistics" element={<TrainerStatistics />} />
                            <Route path="my-payments" element={<TrainerPayments />} />
                            <Route path="my-settings" element={<TrainerSettings />} />
                            <Route path="*" element={<Navigate to="my-course" />} />
                        </Routes>
                    </div>
                ) : (
                    <div>
                        <Routes>
                            <Route path="be-trainer" element={<TrainerForm />} />
                            <Route path="*" element={<Navigate to="be-trainer" />} />
                        </Routes>
                    </div>
                )
            ) : (
                <div>
                    <p>Giriş yapmadan erişim</p>
                </div>
            )}
        </div>
    );
};

export default Trainer;
