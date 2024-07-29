import React from 'react';
import Header from './components/Header';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import Banner from "./components/Banner";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
        </div>
    );
};

export default Home;
