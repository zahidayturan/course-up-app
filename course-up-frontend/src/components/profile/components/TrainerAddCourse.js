import React, {useEffect, useState} from 'react';
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
    const [coursePrice, setCoursePrice] = useState('');
    const [courseDiscount, setCourseDiscount] = useState('');
    const [sections, setSections] = useState([]);

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

    const updateSectionsWithSubtitles = (newSubtitles) => {
        setSections(prevSections => {
            return prevSections.map(section => {
                const updatedSubtitles = newSubtitles.map(subtitle => {
                    const existingSubtitle = section.subtitles.find(s => s.language === subtitle);
                    return existingSubtitle || { language: subtitle, file: null };
                });
                return { ...section, subtitles: updatedSubtitles };
            });
        });
    };

    useEffect(() => {
        updateSectionsWithSubtitles(courseSubtitles);
    }, [courseSubtitles]);

    const handleSectionFileChange = (index, event) => {
        const file = event.target.files[0];
        setSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[index].videoFile = file;
            return updatedSections;
        });
    };

    const handleSectionSubtitleFileChange = (sectionIndex, subtitleIndex, event) => {
        const file = event.target.files[0];
        setSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[sectionIndex].subtitles[subtitleIndex].file = file;
            return updatedSections;
        });
    };

    const addSection = () => {
        setSections([...sections, {
            title: '',
            description: '',
            videoFile: null,
            subtitles: courseSubtitles.map(subtitle => ({ language: subtitle, file: null }))
        }]);
    };

    const handleSectionChange = (index, field, value) => {
        setSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[index][field] = value;
            return updatedSections;
        });
    };

    const removeSection = (index) => {
        setSections(prevSections => prevSections.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('courseDescription', courseDescription);
        formData.append('courseImage', courseImage);
        formData.append('courseCategory', courseCategory);
        formData.append('courseLanguage', courseLanguage);
        formData.append('coursePrice', coursePrice);
        formData.append('courseDiscount', courseDiscount);

        sections.forEach((section, index) => {
            formData.append(`sections[${index}].title`, section.title);
            formData.append(`sections[${index}].description`, section.description);
            formData.append(`sections[${index}].videoFile`, section.videoFile);
            section.subtitles.forEach((subtitle, subtitleIndex) => {
                formData.append(`sections[${index}].subtitles[${subtitleIndex}].language`, subtitle.language);
                formData.append(`sections[${index}].subtitles[${subtitleIndex}].file`, subtitle.file);
            });
        });

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
                                {!courseImage && (<p style={{fontWeight:"normal",fontSize:15}}>Kursun<br /><span>kapak resmini </span><span style={{ color: "var(--orange-color-1)" }}>*</span><br />yükleyiniz.</p>)}
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
                                    <div  onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={style["subtitle-button"]} >{courseSubtitles.length > 0 ? courseSubtitles.join(", ") : "Varsa altyazı dillerini seçiniz"}</div>
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
                        <div className={style["custom-row"]} style={{justifyContent:"start"}}>
                            <div className={style["title-and-input"]}>
                                <p>Kursun Fiyatı (₺) <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <input type="number" id="course-price" placeholder="Kursun fiyatını giriniz" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required/>
                            </div>
                            <div className={style["title-and-input"]}>
                                <p>İndirim Oranı (%)</p>
                                <input type="number" id="course-discount" placeholder="İndirim oranını giriniz" value={courseDiscount} onChange={(e) => setCourseDiscount(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ fontWeight: "bold", fontSize: 18 ,marginBottom:8}}>Kursun Bölümleri</p>
                {sections.map((section, index) => (
                <div className={style["line-and-section"]} key={index}>
                    <div style={{height:"content-box",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                        <span>{index+1}.</span>
                        <div className={style["line"]} style={{height:"100%"}}></div>
                        <img  onClick={() => removeSection(index)} className={style["remove-icon"]} src="/icon/close.png" alt="remove-section"/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                        <div className={style["custom-row"]} >
                            <div className={style["title-and-input"]} style={{flex:1}}>
                                <p>Bölüm Başlığı <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <input type="text" placeholder="Bölüm başlığını giriniz" value={section.title} onChange={(e) => handleSectionChange(index, 'title', e.target.value)} required/>
                            </div>
                            <div className={style["title-and-input"]} style={{flex:1}}>
                                <p>Bölüm Açıklaması <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <textarea  style={{height:20}} placeholder="Bölüm açıklamasını giriniz" value={section.description} onChange={(e) => handleSectionChange(index, 'description', e.target.value)} required/>
                            </div>
                            <div className={style["title-and-input"]}>
                                <p>Bölüm Videosu <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                <div className={style["episode-input"]}>
                                    <p style={{fontWeight:"normal",fontSize:14}}>{!sections[index].videoFile ?"Videoyu yükleyiniz" :"Videoyu yüklediniz"}</p>
                                    <label className={style["custom-file-upload"]}>{sections[index].videoFile ? "Kaldır" : "Video Seç"}
                                        <input type="file" accept="video/mp4" onChange={(e) => handleSectionFileChange(index, e)} required/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {section.subtitles.map((subtitle, subtitleIndex) => (
                        <div key={subtitleIndex} className={style["title-and-input"]} style={{flexDirection:"row",alignItems:"center",marginBottom:6}}>
                            <p>{index+1}.bölüm {subtitle.language} altyazı dosyası</p>
                            <div className={style["episode-input"]}>
                                {!courseImage && (<p style={{fontWeight:"normal",fontSize:14}}>Altyazıyı yükleyiniz</p>)}
                                <label className={style["custom-file-upload"]}>{courseImage ? "Kaldır" : "Dosya Seç"}
                                    <input type="file" accept=".vtt"  onChange={(e) => handleSectionSubtitleFileChange(index, subtitleIndex, e)} required/>
                                </label>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>))}
                <p onClick={addSection} className={style["new-episode"]}>Yeni bölüm ekle</p>
                <button type="submit" className={style["form-button"]}>Onaya Gönder</button>
            </form>
        </div>
    );
};

export default TrainerAddCourse;
