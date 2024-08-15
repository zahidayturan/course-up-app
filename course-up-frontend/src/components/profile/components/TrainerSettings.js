import React from 'react';
import textStyles from "../../css/Text.module.css";


const TrainerSettings = () => {
    return (
        <div>
            <div style={{padding:12}}>
                <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Ayarlar henüz değiştirilemez</p>
            </div>
        </div>
    );
};

export default TrainerSettings;