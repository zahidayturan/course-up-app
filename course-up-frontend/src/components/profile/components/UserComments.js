import React from 'react';
import textStyles from "../../css/Text.module.css";


const UserComments = () => {
    return (
        <div>
            <div style={{padding:12}}>
                <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Gösterilecek yorum yok</p>
            </div>
        </div>
    );
};

export default UserComments;