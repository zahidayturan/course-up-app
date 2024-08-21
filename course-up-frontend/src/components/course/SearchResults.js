import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import mainStyles from "../css/Main.module.css";
import Header from "../home/components/Header";
import CourseCard from "./CourseCard";
import stylesOne from "./css/OneCategory.module.css";
import textStyles from "../css/Text.module.css";
import classNames from "classnames";

const SearchResults = () => {
    const location = useLocation();
    const { keywords } = useParams();
    const { results } = location.state || {};
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            {loading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
            <Header/>
            <p style={{margin:"8px 0",fontSize:14}}><span style={{fontSize:18}}>{keywords}</span> İçin Arama Sonuçları </p>
            {results && results.length > 0 ? (
                <>
                    <div className={stylesOne["all-courses"]}>
                        {results.map((course) => (
                            <CourseCard key={course.id} course={course} />))}
                    </div>
                    <p style={{margin:"6px 0",textAlign:"center"}}>{results.length} sonuç listelendi</p>
                </>

                    ) : (
                        <p onClick={() => navigate(`/category`)} className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:15}}>Aradığınızı bulamadık<br/><span className={classNames(textStyles["text-underline"],textStyles["font-bold"])}>Kategorilere göz at</span></p>
            )}
        </div>
    );
};

export default SearchResults;
