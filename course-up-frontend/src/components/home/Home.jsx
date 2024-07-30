import React from 'react';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import Header from './components/Header';
import Banner from "./components/Banner";
import Courses from "./components/Courses";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Courses />
        </div>
    );
};

export default Home;
