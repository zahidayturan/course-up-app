import React, {useEffect, useState} from 'react';
import Header from '../home/components/Header';
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import styles from "./css/Basket.module.css";
import textStyles from "../css/Text.module.css";
import {Link, useNavigate} from "react-router-dom";
import classNames from "classnames";
import mainStyles from "../css/Main.module.css";
import {toast} from "react-toastify";

const Basket = () => {
    const [user, setUser] = useState(null);
    const [basketCourses, setBasketCourses] = useState([]);
    const [basketError, setBasketError] = useState(null);
    const [basketLoading, setBasketLoading] = useState(false);
    const [showHideToggle, setShowHideToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const navigate = useNavigate();

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

    const deleteFromBasket = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${Endpoints.DELETE_FROM_BASKET}/${id}`);
            if (response.status === 200 || response.status === 204) {
                console.log('Course successfully removed from basket');
                toast.success("Sepetten kaldırıldı");
                setBasketCourses(basketCourses.filter(item => item.id !== id));
            }
        } catch (error) {
            if (error.response) {
                console.error('An unexpected error occurred:', error.message);
            } else {
                console.error('Network error:', error.message);
            }
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = (courseId) => {
        deleteFromBasket(courseId);
    };

    const addCourseToTrainee = async () => {
        if (couponApplied) {
            try {
                setLoading(true);
                let allCoursesAddedSuccessfully = true;

                for (const course of basketCourses) {
                    const traineeFormData = new FormData();
                    traineeFormData.append('courseId', course.courseId);
                    traineeFormData.append('userId', user.id);

                    const response = await axios.post(`${Endpoints.ADD_TO_USER_COURSE}`, traineeFormData);

                    if (response.status === 200) {
                        toast.success(`${course.name} kursu profiline eklendi`);
                        await deleteFromBasket(course.id);
                    } else {
                        toast.error(`${course.name} kursu eklenirken bir sorun oluştu`);
                        allCoursesAddedSuccessfully = false;
                    }
                }
                if (allCoursesAddedSuccessfully) {
                    toast.success(`Profilinize yönlendiriliyorsunuz`);
                    setTimeout(() => {
                        navigate('/profile');
                    }, 4000);
                }
            } catch (error) {
                toast.error("Satın alım işlemi başarısız oldu");
                console.error('An error occurred:', error);
            } finally {
                setCouponCode('');
                setCouponApplied(false);
                setLoading(false);
            }
        } else {
            toast.error("Kupon koduna bir şeyler yazın");
        }
    };


    const toggleShowHideMenu = () => {
        setShowHideToggle(!showHideToggle);
    };

    const calculateBasketTotals = (basketCourses, couponApplied) => {
        let totalAmount = 0;
        let totalDiscount = 0;
        let netTotal = 0;

        basketCourses.forEach((item) => {
            totalAmount += item.originalPrice;
            totalDiscount += (item.originalPrice - item.discountedPrice);
            netTotal += item.discountedPrice;
        });

        if (couponApplied) {
            totalDiscount = totalAmount;
            netTotal = 0;
        }

        return {
            totalAmount,
            totalDiscount,
            netTotal
        };
    };

    const { totalAmount, totalDiscount, netTotal } = calculateBasketTotals(basketCourses, couponApplied);

    const handleApplyCoupon = (e) => {
        e.preventDefault();

        if(couponCode !== '' && couponApplied){
            setCouponCode('');
            setCouponApplied(false);
            return
        }

        if (couponCode.trim() !== '') {
            setCouponApplied(true);
        } else {
            setCouponApplied(false);
        }
    };

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;
    return (
        <div>
            {loading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
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
                            <p style={{fontSize:16}}>{basketCourses.length === 0 ? "Boş" : `${basketCourses.length} kurs`}</p>
                            <div className={styles["custom-row"]}>
                                <div style={{width:"100%"}}>
                                    {basketCourses.map((item) => (
                                    <div key={item.id} className={styles["item-box"]}>
                                        <Link to={`/course/${item.name.replace(/\s+/g, '-').toLowerCase()}/${item.courseId}`} title={item.name} style={{flex : "0 auto"}}>
                                            {item.imageId ? (<img className={styles["course-img"]} src={`https://${bName}.s3.amazonaws.com/${item.imageId}`} alt={item.name} />) : (<img style={{objectFit:"contain"}} className={styles["course-img"]} src="/logo/courseup-l-v1.png" alt="Course" />)}
                                        </Link>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between", flex:1}}>
                                            <p><span style={{fontSize:17} }>{item.name}</span><br/><span className={textStyles["font-italic"]} style={{fontWeight:"normal"}}>Eğitmen: {item.teacher}</span></p>
                                            <p>{item.category}</p>
                                            <p>{item.duration !== 0 ? (item.duration/60).toFixed(2) : 0} saat eğitim süresi<br/>{(item.stage)} bölüm</p>
                                        </div>
                                        <div className={styles["button-and-price"]}>
                                            <button onClick={() => handleDelete(item.id)} className={styles["remove-button"]}>Sepetten Kaldır</button>
                                            <div style={{textAlign:"end"}}>
                                                {item.discount > 0 && (<p style={{color:"var(--orange-color-1)",fontSize:14}}>%{item.discount} indirim</p>)}
                                                {item.discount > 0 && <p style={{textDecoration:"line-through",fontSize:14}}>{item.originalPrice} ₺</p>}
                                                <p style={{fontWeight:600,fontSize:17}}>{item.discountedPrice} ₺</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                {basketCourses.length > 0 && (
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

                                        <button onClick={toggleShowHideMenu} className={styles["show-hide-button"]} style={{borderRadius: setShowHideToggle ? 100 : 4}}>
                                            {showHideToggle === false && "Kursları Göster"}
                                            <img style={{height:12, rotate: showHideToggle ? ("90deg"): ("-90deg")}} src="/icon/arrow.png" alt=""/>
                                        </button>

                                        <form onSubmit={handleApplyCoupon} style={{display:"flex",alignItems:"center",gap:4,margin:"12px 0",width:"100%",justifyContent:"end"}}>
                                            <input style={{height:32,maxWidth:320,backgroundColor:"white"}} type="text" id="coupon-code" placeholder="Kupon kodunuz varsa yazınız" maxLength="32" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} required/>
                                            <button type="submit" style={{height:32,width:32,border:"none",backgroundColor:"white",borderRadius:4,cursor:"pointer"}}>
                                                <img style={{width:18,alignSelf:"center"}} src= { couponApplied ? "/icon/close.png" : "/icon/search.png"} alt="cupon-search"/>
                                            </button>
                                        </form>

                                        <div className={styles["text-row"]} style={{fontSize:15,fontWeight:600}}>
                                            <p>Toplam</p>
                                            <p>{totalAmount.toFixed(2)} ₺</p>
                                        </div>
                                        <div className={styles["text-row"]} style={{fontSize:15,fontWeight:600,textAlign:"end"}}>
                                            <p>İndirim</p>
                                            <p>{couponApplied && (<>Kupon uygulandı<br /></>)}{totalDiscount > 0 ? `-${totalDiscount.toFixed(2)} ₺` : "Uygulanmadı"}</p>
                                        </div>
                                        <div className={styles["text-row"]} style={{fontSize:17,fontWeight:"bold"}}>
                                            <div>
                                                <p>Net Toplam</p>
                                                <p style={{fontWeight:"normal",fontSize:12}}>KDV Dahil</p>
                                            </div>
                                            <p style={{color:"var(--orange-color-1)"}}>{netTotal.toFixed(2)} ₺</p>
                                        </div>

                                        <button onClick={addCourseToTrainee} className={styles["payment-button"]}>{couponApplied ? "Kursları Profiline Ekle" : "Ödemeye Geç" }</button>
                                    </div>
                                )}
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
