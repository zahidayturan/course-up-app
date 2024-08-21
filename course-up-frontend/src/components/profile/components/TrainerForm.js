import React, { useState, useEffect } from 'react';
import styles from "../css/TrainerForm.module.css";
import classNames from "classnames";
import Endpoints from "../../../constants/Endpoints";
import axios from "axios";
import mainStyles from "../../css/Main.module.css";
import TrainerAgreementText from "./AgreementText";

const TrainerForm = () => {
    const [user, setUser] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!acceptedTerms) {
            alert("Sözleşmeyi kabul etmelisiniz");
            return;
        }

        if (!user) {
            alert("Kullanıcı bilgisi bulunamadı");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(Endpoints.TEACHER_SAVE, {
                userId: user.id,
                description: "Henüz açıklama eklenmemiş"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Teacher saved successfully:');
                const userResponse = await axios.get(`${Endpoints.USER}/${user.id}`);
                const updatedUser = userResponse.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log("User data updated");
                window.location.reload();
            } else {
                console.error('Failed to save teacher', response);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
        {loading && (
            <div className={mainStyles["loading-overlay"]}>
                <div className={mainStyles["main-spinner"]}></div>
            </div>
        )}
        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div className={styles["header-box"]}>
                <div style={{padding:"12px"}}>
                    <div className={styles["custom-row"]}>
                        <div className={styles["custom-column"]} style={{flex:3}}>
                            <div className={styles["mini-dec"]}></div>
                            <p style={{fontSize:18}}>Dünyanın her tarafından öğrencilere platformumuzda <span style={{color:"var(--green-color-1)"}}>yol gösterin</span></p>
                            <img className={styles["app-logo"]} src="/logo/courseup-l-v1.png" alt=""/>
                        </div>
                        <p style={{fontSize:28,textAlign:"end",flex:2}}><span>Eğitmen<br/>olmak</span><br/>istiyorum</p>
                    </div>
                    <div className={classNames(styles["custom-row"],styles["mobile-row"])}>
                        <p>Dilediğiniz kursu, dilediğiniz şekilde yayınlayın. Her zaman <span>kontrol sahibi olun.</span></p>
                        <p style={{textAlign:"center"}}>Bildiklerinizi öğretin ve öğrencilerin ilgi alanlarını keşfetmesine  <span>yardımcı olun.</span></p>
                        <p style={{textAlign:"end"}}>Öğrenci ağınızı genişletin, kurslarınızı yayınlayın ve her ücretli kayıttan <span>kazanç elde edin.</span></p>
                    </div>
                </div>
                <img  className={styles["back-img"]} src="/img/line.png" alt=""/>
            </div>
            <div className={classNames(styles["header-box"],styles["form-box"])}>
                <div style={{padding:"12px",fontSize:12}}>
                    <TrainerAgreementText />
                    <form onSubmit={handleSubmit} style={{marginTop:16}}>
                        <div style={{display:"flex",flexDirection:"row",width:"100%",gap:6,alignItems:"center"}}>
                            <input style={{width:22}}
                                   type="checkbox"
                                   id="form-check"
                                   name="form-check"
                                   required
                                   checked={acceptedTerms}
                                   onChange={(e) => setAcceptedTerms(e.target.checked)}/>
                            <label htmlFor="form-check" style={{fontWeight:"bold"}}>Yukarıda yer alan Eğitmen Olma Sözleşmesini okudum ve sözleşmeyi kabul ediyorum</label>
                        </div>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <button className={styles["form-button"]}>
                                Eğitmen Ol
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default TrainerForm;
