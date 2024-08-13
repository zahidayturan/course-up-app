import React, {useEffect, useState} from 'react';
import Header from '../home/components/Header';
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import styles from "./css/Basket.module.css";
import textStyles from "../css/Text.module.css";
import {Link} from "react-router-dom";
import classNames from "classnames";
import mainStyles from "../css/Main.module.css";

const Basket = () => {
    const [user, setUser] = useState(null);
    const [basketCourses, setBasketCourses] = useState([]);
    const [basketError, setBasketError] = useState(null);
    const [basketLoading, setBasketLoading] = useState(false);
    const [showHideToggle, setShowHideToggle] = useState(true);

    useEffect(() => {
        const fetchBasket = async (userId) => {
            try {
                const response = await axios.get(`${Endpoints.GET_BASKET}/${userId}`);
                const courses = response.data;
                setBasketCourses(courses);
            } catch (error) {
                setBasketError('Sepetiniz yüklenirken bir hata oluştu');
            } finally {
                setBasketLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setBasketLoading(true);
            fetchBasket(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
            setBasketError('Sepetiniz yüklenirken bir hata oluştu');
        }
    }, []);

    const toggleShowHideMenu = () => {
        setShowHideToggle(!showHideToggle);
    };

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;
    return (
        <div>
            <Header />
            <div style={{marginTop:24}}>
                <h2>Sepetin</h2>
                {user ? (basketLoading ? (
                        <div style={{ padding: 12 }}>
                            <div className={mainStyles['loader']}>
                                <div className={mainStyles['spinner']}></div>
                            </div>
                        </div>
                        ) : basketError ? (
                            <div style={{ padding: 12 }}>
                                <p className={textStyles["text-center"]} style={{ padding: "14px 0", fontSize: 14 }}>{basketError}</p>
                            </div>
                        ) : basketCourses && (
                        <>
                            <p style={{fontSize:16}}>{basketCourses.length} kurs</p>
                            <div className={styles["custom-row"]}>
                                <div style={{width:"100%"}}>
                                    {basketCourses.map((item) => (
                                    <div key={item.id} className={styles["item-box"]}>
                                        <div style={{flex : "0 auto"}}>
                                            {item.imageId ? (<img className={styles["course-img"]} src={`https://${bName}.s3.amazonaws.com/${item.imageId}`} alt={item.name} />) : (<img style={{objectFit:"contain"}} className={styles["course-img"]} src="/logo/courseup-l-v1.png" alt="Course" />)}
                                        </div>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between", flex:1}}>
                                            <p><span style={{fontSize:17} }>{item.name}</span><br/><span className={textStyles["font-italic"]} style={{fontWeight:"normal"}}>Eğitmen: {item.teacher}</span></p>
                                            <p>{item.category}</p>
                                            <p>{item.duration !== 0 ? (item.duration/60).toFixed(2) : 0} saat eğitim süresi<br/>{(item.stage)} bölüm</p>
                                        </div>
                                        <div className={styles["button-and-price"]}>
                                            <button className={styles["remove-button"]}>Sepetten Kaldır</button>
                                            <div style={{textAlign:"end"}}>
                                                {item.discount > 0 && (<p style={{color:"var(--orange-color-1)",fontSize:14}}>%{item.discount} indirim</p>)}
                                                {item.discount > 0 && <p style={{textDecoration:"line-through",fontSize:14}}>{item.originalPrice} ₺</p>}
                                                <p style={{fontWeight:600,fontSize:17}}>{item.discountedPrice} ₺</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <div className={styles["basket-summary"]}>
                                    <p style={{fontSize:20,color:"var(--primary-color-1)",textAlign:"end"}}>Sepet <span style={{color:"var(--orange-color-1)"}}>Özetin</span></p>
                                    <p style={{fontSize:14,marginBottom:16}}>{basketCourses.length} kurs</p>
                                    {showHideToggle === true && (
                                            basketCourses.map((item) =>(
                                            <div key={item.id} style={{textAlign:"end",marginBottom:12,display:"flex",gap:12}}>
                                                <div>
                                                    <p style={{fontSize:14}}>{item.name}</p>
                                                    {item.discount > 0 && <p style={{textDecoration:"line-through",fontSize:13}}>{item.originalPrice} ₺</p>}
                                                    <p style={{fontWeight:600,fontSize:14}}>{item.discountedPrice} ₺</p>
                                                    {item.discount > 0 && (<p style={{fontStyle:"italic",fontSize:13}}>Kazancınız {item.originalPrice - item.discountedPrice} ₺</p>)}
                                                </div>
                                                <div style={{width:3,height:"content-box",borderRadius:50,backgroundColor:"var(--orange-color-1)"}}></div>
                                            </div>
                                        ))
                                    )}
                                    <button onClick={toggleShowHideMenu} className={styles["show-hide-button"]} style={{borderRadius: setShowHideToggle ? 100 : 4}}>{showHideToggle === false && "Kursları Göster"}<img style={{height:12, rotate: showHideToggle ? ("90deg"): ("-90deg")}} src="/icon/arrow.png" alt=""/></button>
                                </div>
                            </div>

                        </>
                    )
                ) : (
                    <p style={{textAlign:"center",marginTop:24}}>Sepetini görüntüleyebilmek için<br/><Link to={"/login"} className={classNames(textStyles["text-underline"],textStyles["font-bold"])}>giriş yapmalısın</Link></p>
                    )
                }
            </div>

        </div>
    );
};

export default Basket;
