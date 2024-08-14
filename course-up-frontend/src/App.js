import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./components/404";
import Profile from "./components/profile/Profile";
import Trainer from "./components/profile/Trainer";
import CourseDetail from "./components/course/CourseDetail";
import AllCategory from "./components/course/AllCategory";
import OneCategory from "./components/course/OneCategory";
import Basket from "./components/basket/Basket";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile/*" element={<Profile />} />
                    <Route path="/profile/trainer/*" element={<Trainer />} />
                    <Route path="/course/:id" element={<CourseDetail />} />
                    <Route path="/category" element={<AllCategory/>} />
                    <Route path="/category/:name" element={<OneCategory/>} />
                    <Route path="/basket" element={<Basket/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
