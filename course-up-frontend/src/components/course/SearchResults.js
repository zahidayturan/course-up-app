import React, {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import mainStyles from "../css/Main.module.css";
import Header from "../home/components/Header";

const SearchResults = () => {
    const location = useLocation();
    const { keywords } = useParams();
    const { results } = location.state || {};
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {loading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
            <Header/>
            <h3>Şunun İçin Arama Sonuçları {keywords}</h3>
            {results && results.length > 0 ? (
                <ul>
                    {results.map((course) => (
                        <li key={course.id}>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <p>Teacher: {course.teacher}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aradığınızı bulamadık</p>
            )}
        </div>
    );
};

export default SearchResults;
