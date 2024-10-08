import React, {useEffect, useState} from 'react';
import axios from 'axios';
import style from "../css/TrainerAddCourse.module.css";
import Endpoints from "../../../constants/Endpoints";
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import {toast} from "react-toastify";

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
    const [totalDuration, setTotalDuration] = useState(0);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('');
    const [error, setError] = useState('');

    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setUserLoading(true);
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                try {
                    const userResponse = await axios.get(`${Endpoints.USER}/${storedUser.id}`);
                    const userData = userResponse.data;
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                } catch (error) {
                    setUserError('Kullanıcı bilgileri alınırken bir hata oluştu: ' + error.message);
                } finally {
                    setUserLoading(false);
                }
            } else {
                setUserError("Kullanıcı bilgileriniz bulunamadı lütfen oturum açınız");
                setUserLoading(false);
                console.log('No user data found in localStorage');
            }
        };
        fetchUser();
    }, []);


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

    useEffect(() => {
        if(sections.length === 0){
            addSection();
        }
    }, []);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSectionFileChange = (index, event) => {
        const file = event.target.files[0];
        if (!file) {
            setSections(prevSections => {
                const updatedSections = [...prevSections];
                updatedSections[index] = { ...updatedSections[index], videoFile: null, duration: 0 };
                const newTotalDuration = updatedSections.reduce((acc, section) => acc + (section.duration || 0), 0);
                setTotalDuration(newTotalDuration);
                return updatedSections;
            });
            return;
        }

        const videoElement = document.createElement('video');
        const fileURL = URL.createObjectURL(file);
        videoElement.src = fileURL;

        videoElement.addEventListener('loadedmetadata', () => {
            const duration = videoElement.duration;
            URL.revokeObjectURL(fileURL);
            setSections(prevSections => {
                const updatedSections = [...prevSections];
                updatedSections[index] = { ...updatedSections[index], videoFile: file, duration: duration };
                const newTotalDuration = updatedSections.reduce((acc, section) => acc + (section.duration || 0), 0);
                setTotalDuration(newTotalDuration);
                return updatedSections;
            });
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

        if (!courseImage) {
            alert("Lütfen kursun kapak resmini yükleyiniz.");
            return;
        }

        let courseId = null;

        try {
            setLoading(true);

            // Kurs Resmi Yükleme
            setStep('Kurs resmi yükleniyor...');
            const imageFormData = new FormData();
            imageFormData.append('file', courseImage);
            const { data: imageId } = await axios.post(Endpoints.COURSE_FILE_UPLOAD, imageFormData);

            // Kurs Kaydetme
            setStep('Kurs kaydediliyor...');
            const courseFormData = new FormData();
            courseFormData.append('courseName', courseName);
            courseFormData.append('courseDescription', courseDescription);
            courseFormData.append('courseCategory', courseCategory);
            courseFormData.append('courseLanguage', courseLanguage);
            const courseSubtitlesString = courseSubtitles.length > 0 ? courseSubtitles.join('-') : "Yok";
            courseFormData.append('courseSubtitles', courseSubtitlesString);
            courseFormData.append('coursePrice', coursePrice);
            const courseDiscountChecked = courseDiscount !== '' ? courseDiscount : "0";
            courseFormData.append('courseDiscount', courseDiscountChecked);
            courseFormData.append('imageId', imageId);
            courseFormData.append('userId', user.id);

            const courseResponse = await axios.post(Endpoints.COURSE_SAVE, courseFormData);
            courseId = courseResponse.data;

            // Videoları ve Bölümleri Yükleme
            const uploadPromises = sections.map(async (section, index) => {
                setStep(`Video ${index + 1} yükleniyor...`);
                const videoFormData = new FormData();
                videoFormData.append('file', section.videoFile);
                const { data: videoId } = await axios.post(Endpoints.COURSE_FILE_UPLOAD, videoFormData);

                const sectionFormData = new FormData();
                sectionFormData.append('title', section.title);
                sectionFormData.append('description', section.description);
                sectionFormData.append('videoId', videoId);
                sectionFormData.append('duration', section.duration);
                sectionFormData.append('episode', index + 1);
                sectionFormData.append('courseId', courseId);

                return axios.post(Endpoints.COURSE_STAGE_SAVE, sectionFormData);
            });

            await Promise.all(uploadPromises);

            // Kurs Güncelleme
            setStep('Kurs bilgileri güncelleniyor...');
            const courseUpdateFormData = new FormData();
            courseUpdateFormData.append('courseId', courseId);
            courseUpdateFormData.append('totalStages', sections.length);
            courseUpdateFormData.append('totalDuration', totalDuration / 60);
            await axios.post(Endpoints.COURSE_UPDATE, courseUpdateFormData);

            toast.success("Kurs onaya gönderildi");
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Form gönderilirken bir hata oluştu', error);
            setTimeout(() => {
                setError('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
            }, 3000);
            setStep('Kurs bilgileri siliniyor...');
            if (courseId) {
                await axios.delete(`${Endpoints.COURSE_DELETE}/${courseId}`);
            }
            toast.error("Kurs onaya gönderilirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };


    const totalPrice = (100 > courseDiscount > 0)
        ? Number((Number(coursePrice) * (1 - courseDiscount / 100)).toFixed(2))
        : Number(Number(coursePrice).toFixed(2));

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = (durationInSeconds % 60).toFixed(2);
        return `${minutes} dk ${seconds} sn`;
    };


    const LoadingScreen = ({ step, error }) => {
        return (
            <div className={mainStyles["loading-overlay"]} style={{textAlign:"center"}}>
                <h2 style={{color:"var(--secondary-color-2)"}}>{error ? 'Hata Oluştu' : 'Kurs Kaydediliyor'}</h2>
                <div className={mainStyles["main-spinner"]}></div>
                <h4>Lütfen Bekleyiniz</h4>
                <p style={{color:"var(--orange-color-1)",fontSize:18}}><span>Aşama</span><br/>{step}</p>
                {error && <p style={{color:"red"}}>Hata<br/>{error}</p>}
            </div>

        );
    };

    return (
        <>
            {loading && <LoadingScreen step={step} error={error} />}
            <div className={style["add-box"]}>
                {userLoading ? (
                    <div style={{padding:12}}>
                        <div className={mainStyles['loader']}>
                            <div className={mainStyles['spinner']}></div>
                        </div>
                    </div>
                ) : userError ? (
                    <div style={{padding:12}}>
                        <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{userError}</p>
                    </div>
                ) : (
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
                                                <input type="file" name="course-img" accept="image/png, image/jpeg" id="course-img" onChange={handleFileChange}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={style["custom-row"]} style={{justifyContent:"start",flexWrap:"wrap"}}>
                                        <div  className={style["title-and-input"]}>
                                            <p>Kursun Kategorisi <span style={{ color: "var(--orange-color-1)" }}>*</span></p>
                                            <select name="categories" id="categories" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} required>
                                                <option value="" disabled>Kursun kategorisini seçiniz</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.name}>{category.name}</option>
                                                ))}
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
                                                <div  onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={style["subtitle-button"]}>{courseSubtitles.length > 0 ? courseSubtitles.join(", ") : "Bu özellik henüz kullanılamaz"}</div>
                                                {(isDropdownOpen && false) && (
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
                                            <input type="number" step="0.01" id="course-price" placeholder="Kursun fiyatını giriniz" min={1} maxLength={9999} value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required/>
                                        </div>
                                        <div className={style["title-and-input"]}>
                                            <p>İndirim Oranı (%)</p>
                                            <input type="number" id="course-discount" placeholder="İndirim oranını giriniz" min={0} maxLength={100} value={courseDiscount} onChange={(e) => setCourseDiscount(e.target.value)}/>
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
                                        {(index!==0) && <img onClick={() => removeSection(index)} className={style["remove-icon"]} src="/icon/close.png" alt="remove-section"/>}
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
                                                    <p style={{fontWeight:"normal",fontSize:14}}>{!sections[index].videoFile ?"Videoyu yükleyiniz" :"Videoyu seçtiniz"}</p>
                                                    <label className={style["custom-file-upload"]}>{sections[index].videoFile ? "Kaldır" : "Video Seç"}
                                                        <input type="file" accept="video/mp4" onChange={(e) => handleSectionFileChange(index, e)}/>
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
                                                        <input type="file" accept=".vtt"  onChange={(e) => handleSectionSubtitleFileChange(index, subtitleIndex, e)}/>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>))}
                            <button type={"button"} onClick={addSection} className={style["new-episode"]}>Yeni bölüm ekle</button>
                            <div className={style["custom-row"]} style={{marginTop:32,alignItems:"end",gap:32,marginBottom:0}}>
                                <div className={style["info-box"]}>
                                    <p>Hesaplanan<br/><span>Toplam Süre</span><br/><br/>{formatDuration(totalDuration)}</p>
                                    <p>Hesaplanan<br/><span>Fiyat</span><br/><br/>{totalPrice} ₺</p>
                                </div>
                                <div className={style["custom-column"]} style={{alignItems:"end"}}>
                                    <p style={{fontWeight:"normal",fontSize:14,textAlign:"end"}}>Girdiğiniz bilgiler incelemeye alınacaktır. Eğitmen panelinden onayda olan kurslar bölümünde durumunu takip edebilirsiniz.</p>
                                    <button type={"submit"} className={style["form-button"]}>Onaya Gönder</button>
                                </div>

                            </div>


                        </form>
                )}
            </div>
        </>
    );
};

export default TrainerAddCourse;