import React from 'react';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import Header from './components/Header';
import Banner from "./components/Banner";
import Courses from "./components/Courses";
import Info from "./components/Info";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Courses />
            <Info />
        </div>
    );
};

export default Home;
