import React from 'react';

const TrainerStandOut = () => {
    return (
        <div style={{backgroundColor:"var(--primary-color-1)",padding:8,borderRadius:8}}>
            <p style={{fontSize:24}}>Kurslarını <span>Öne Çıkar</span></p>
            <p style={{marginTop:12}}>Henüz öne çıkarabileceğin bir kursun bulunmamakta</p>
        </div>
    );
};

export default TrainerStandOut;