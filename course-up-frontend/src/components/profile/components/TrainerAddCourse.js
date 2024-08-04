import React, { useState } from 'react';
import axios from 'axios';
import style from "../css/TrainerAddCourse.module.css";

const TrainerAddCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [courseSubtitles, setCourseSubtitles] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFileChange = (event) => {
        setCourseImage(event.target.files[0]);
    };

    const handleSubtitleChange = (event) => {
        const value = event.target.value;
        setCourseSubtitles(prevState =>
            prevState.includes(value)
                ? prevState.filter(item => item !== value)
                : [...prevState, value]
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('courseDescription', courseDescription);
        formData.append('courseImage', courseImage);
        formData.append('courseCategory', courseCategory);
        formData.append('courseLanguage', courseLanguage);


        try {
            const response = await axios.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <div className={style["add-box"]}>
            <form onSubmit={handleSubmit}>
                <div className={style["custom-row"]} style={{flexDirection:"row"}}>
                    <p style={{ fontSize: 24, marginBottom: 12 }}>Yeni <span>Kurs Ekle</span></p>
                    <div className={style["mini-dec"]}></div>
                </div>
                <p style={{ fontWeight: "bold", fontSize: 18 ,marginBottom:4}}>Kursun Genel Bilgileri</p>
                <div className={style["line-and-section"]}>
                    <div className={style["line"]}></div>
                    <div className={style["custom-column"]}>
                        <div className={style["custom-row"]}>
                            <div className={style["custom-column"]} style={{ height: "180px" }}>
                                <div className={style["title-and-input"]} style={{width:"100%"}}>
                                    <p>Kursun Adı <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                    <input type="text" id="course-name" placeholder="Kursun adını yazınız" maxLength="96" value={courseName} onChange={(e) => setCourseName(e.target.value)} required/>
                                </div>
                                <div className={style["title-and-input"]} style={{width:"100%",height:"100%"}}>
                                    <p>Kursun Açıklaması <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                    <textarea id="course-description" placeholder="Kursun açıklamasını yazınız" maxLength="256" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required/>
                                </div>
                            </div>
                            <div className={style["image-input"]} style={{ backgroundImage: courseImage ? `url(${URL.createObjectURL(courseImage)})` : 'none' }}>
                                {!courseImage && (<p style={{fontWeight:"normal"}}>Kursun<br /><span>kapak resmini </span><span style={{ color: "var(--orange-color-1)" }}>*</span><br />yükleyiniz.</p>)}
                                <label className={style["custom-file-upload"]}>{courseImage ? "Kaldır" : "Resim Seç"}
                                    <input type="file" accept="image/png, image/jpeg" id="course-img" onChange={handleFileChange} required/>
                                </label>
                            </div>
                        </div>
                        <div className={style["custom-row"]} style={{justifyContent:"start",flexWrap:"wrap"}}>
                            <div  className={style["title-and-input"]}>
                                <p>Kursun Kategorisi <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <select name="categories" id="categories" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} required>
                                    <option value="" disabled>Kursun kategorisini seçiniz</option>
                                    <option value="software">Yazılım</option>
                                    <option value="economy">Ekonomi</option>
                                </select>
                            </div>
                            <div  className={style["title-and-input"]}>
                                <p>Kursun Orijinal Dili <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <select name="languages" id="languages" value={courseLanguage} onChange={(e) => setCourseLanguage(e.target.value)} required>
                                    <option value="" disabled>Kursun orijinal dilini seçiniz</option>
                                    <option value="tr">Türkçe</option>
                                    <option value="en">İngilizce</option>
                                </select>
                            </div>
                            <div className={style["title-and-input"]}>
                                <p>Kursun Altyazı Dilleri</p>
                                <div>
                                    <div  onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={style["subtitle-button"]}>{courseSubtitles.length > 0 ? courseSubtitles.join(", ") : "Altyazı dillerini varsa seçiniz"}</div>
                                    {isDropdownOpen && (
                                        <div className={style["dropdown-content"]}>
                                            <label><input type="checkbox" value="tr" checked={courseSubtitles.includes("tr")} onChange={handleSubtitleChange}/>Türkçe</label>
                                            <label><input type="checkbox" value="en" checked={courseSubtitles.includes("en")} onChange={handleSubtitleChange}/>İngilizce</label>
                                            <p style={{cursor:"pointer",fontStyle:"italic",alignSelf:"center"}} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Kapat</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className={style["form-button"]}>Onaya Gönder</button>
            </form>
        </div>
    );
};

export default TrainerAddCourse;
