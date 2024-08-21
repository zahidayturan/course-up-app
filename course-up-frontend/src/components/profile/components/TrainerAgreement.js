import React from 'react';
import textStyles from "../../css/Text.module.css";
import TrainerAgreementText from "./AgreementText";


const TrainerAgreement = () => {
    return (
        <div style={{backgroundColor:"var(--primary-color-1)",padding:8,borderRadius:8}}>
            <TrainerAgreementText/>
            <div style={{padding:12}}>
                <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:15,fontStyle:"italic",fontWeight:600}}>Sözleşmen hakkında dilediğin soruları sorabilirsin. Bizimle iletişime geçmen yeterli. Aramızda olduğun için çok mutluyuz.</p>
            </div>
        </div>
    );
};

export default TrainerAgreement;