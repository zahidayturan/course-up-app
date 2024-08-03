import React, { useState, useEffect } from 'react';
import styles from "../css/TrainerForm.module.css";
import classNames from "classnames";
import Endpoints from "../../../constants/Endpoints";
import axios from "axios";

const TrainerForm = () => {
    const [user, setUser] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

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
            } else {
                console.error('Failed to save teacher', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
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
                    <p style={{fontWeight:"bold",fontSize:16,marginBottom:8}}>Eğitmen Olma Sözleşmesi</p>
                    <p><span>1. Taraflar:</span> Bu sözleşme, <span >CourseUp</span> ("Platform") ile <span >Eğitmen Adı</span> ("Eğitmen") arasında imzalanmıştır.</p>
                    <p><span>2. Sözleşmenin Konusu:</span> Bu sözleşme, Eğitmen'in Platform üzerinden kurslar sunmasına ve içerik üretmesine ilişkin şartları ve koşulları belirler.</p>
                    <p><span>3. Eğitmen'in Yükümlülükleri:</span></p>
                    <ul>
                        <li>Eğitmen, sunduğu tüm içeriklerin orijinal ve yasalara uygun olduğunu beyan eder.</li>
                        <li>Eğitmen, kurs içeriklerinin güncel, doğru ve anlaşılır olmasını sağlar.</li>
                        <li>Eğitmen, Platform'un belirlediği kalite standartlarına ve teknik gereksinimlere uygun içerikler üretir.</li>
                        <li>Eğitmen, öğrencilere zamanında ve etkili bir şekilde destek sağlar ve sorularını yanıtlar.</li>
                    </ul>
                    <p><span>4. Platform'un Yükümlülükleri:</span></p>
                    <ul>
                        <li>Platform, Eğitmen'in sunduğu içerikleri yayınlamak ve tanıtmak için gerekli altyapıyı sağlar.</li>
                        <li>Platform, Eğitmen'in içeriklerine erişim sağlayacak ve kurs kayıtları ile ilgili gerekli bilgileri paylaşacaktır.</li>
                        <li>Eğitmen'e ödenecek komisyon ve/veya ücretler konusunda şeffaf bir sistem oluşturur.</li>
                    </ul>
                    <p><span>5. Ücretlendirme ve Ödemeler:</span></p>
                    <ul>
                        <li>Eğitmen, Platform üzerinden satılan her kurs için belirli bir komisyon oranında ödeme alır. Bu oran %1 olarak belirlenmiştir.</li>
                        <li>Ödemeler, her ayın ilk günü Eğitmen'in belirttiği banka hesabına yapılacaktır.</li>
                        <li>Vergi ve diğer yasal kesintiler Eğitmen'in sorumluluğundadır.</li>
                    </ul>
                    <p><span>6. Fikri Mülkiyet Hakları:</span></p>
                    <ul>
                        <li>Eğitmen, sunduğu içeriklerin fikri mülkiyet haklarının kendisine ait olduğunu ve bu hakları ihlal eden hiçbir içeriği paylaşmadığını taahhüt eder.</li>
                        <li>Platform, Eğitmen'in içeriklerini tanıtım amaçlı kullanma hakkına sahiptir.</li>
                    </ul>
                    <p><span>7. Sözleşmenin Süresi ve Feshi:</span></p>
                    <ul>
                        <li>Bu sözleşme, imza tarihinden itibaren 1 yıl süreyle geçerlidir ve taraflardan biri fesih talebinde bulunmadıkça otomatik olarak yenilenir.</li>
                        <li>Taraflardan biri, karşı tarafa yazılı bildirimde bulunarak sözleşmeyi herhangi bir zamanda feshedebilir. Fesih bildirimi, en az 30 gün önceden yapılmalıdır.</li>
                    </ul>
                    <p><span>8. Gizlilik:</span></p>
                    <ul>
                        <li>Taraflar, bu sözleşme kapsamında elde edilen tüm bilgileri gizli tutacak ve üçüncü taraflarla paylaşmayacaktır.</li>
                        <li>Eğitmen, öğrencilerin kişisel bilgilerini gizli tutmakla yükümlüdür.</li>
                    </ul>
                    <p><span>9. Uyuşmazlıkların Çözümü:</span></p>
                    <ul>
                        <li>Bu sözleşmeden doğabilecek tüm uyuşmazlıklar, öncelikle taraflar arasında dostane bir şekilde çözülmeye çalışılacaktır.</li>
                        <li>Çözüm sağlanamazsa, uyuşmazlıklar Türkiye mahkemelerinde çözümlenecektir.</li>
                    </ul>
                    <p><span>10. Diğer Hükümler:</span></p>
                    <ul>
                        <li>Bu sözleşme, tarafların yazılı onayı olmadan değiştirilemez.</li>
                        <li>Bu sözleşme, tarafların tamamını bağlayıcı niteliktedir.</li>
                    </ul>
                    <form onSubmit={handleSubmit} style={{marginTop:16}}>
                        <div style={{display:"flex",flexDirection:"row",width:"100%",gap:6}}>
                            <input style={{width:24}}
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
    );
};

export default TrainerForm;
