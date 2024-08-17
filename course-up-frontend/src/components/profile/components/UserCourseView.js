import React from 'react';
import textStyles from "../../css/Text.module.css";
import {useParams} from "react-router-dom";
import Header from "../../home/components/Header";


const UserCourseView = () => {
    const { id } = useParams();
    return (
        <div>
            <Header/>
            <div style={{padding:12}}>
                <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{id} Kurs görüntüleme</p>
            </div>
        </div>
    );
};

export default UserCourseView;