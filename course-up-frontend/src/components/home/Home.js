import React from 'react';
import '../css/Main.module.css';
import Header from './components/Header';
import Banner from "./components/Banner";
import PopularCourses from "./components/PopularCourses";
import Info from "./components/Info";
import Categories from "./components/Categories";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <PopularCourses />
            <Info />
            <Categories />
        </div>
    );
};

export default Home;
