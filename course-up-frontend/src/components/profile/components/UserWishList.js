import React, {useEffect, useState} from 'react';
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import styles from "../css/UserWishList.module.css";
import mainStyles from "../../css/Main.module.css";
import textStyles from "../../css/Text.module.css";
import {toast} from "react-toastify";


const UserWishList = () => {
    const [user, setUser] = useState(null);
    const [wishList, setWishList] = useState(null);
    const [wishListError, setWishListError] = useState(null);
    const [wishListLoading, setWishListLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWishList = async (userId) => {
            try {
                setWishListLoading(true);
                const response = await axios.get(`${Endpoints.WISH_LIST}/${userId}`);
                setWishList(response.data);
                console.log('Wish list courses set');
            } catch (error) {
                setWishListError('İstek listeniz yüklenirken bir hata oluştu');
            } finally {
                setWishListLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchWishList(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const deleteCourseFromWishList = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${Endpoints.DELETE_FROM_WISH_LIST}/${id}`);
            if (response.status === 204) {
                console.log('Course successfully removed from wish list');
                toast.success("İstek listesinden kaldırıldı");
                setWishList(wishList.filter(item => item.id !== id));
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
        deleteCourseFromWishList(courseId);
    };

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;

    return (

        <div>
            {loading && (
                <div className={mainStyles["loading-overlay"]}>
                    <div className={mainStyles["main-spinner"]}></div>
                </div>
            )}
            {user && (
                <div className={styles['courses-box']}>
                    {wishListLoading ? (
                        <div style={{padding:12}}>
                            <div className={mainStyles['loader']}>
                                <div className={mainStyles['spinner']}></div>
                            </div>
                        </div>
                    ) : wishListError ? (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{wishListError}</p>
                        </div>
                    ) : wishList && wishList.length > 0 ? (
                        <div style={{padding:12,width:"100%"}}>
                            <div className={styles["custom-row"]}>
                                <p style={{fontSize:24}}><span className={textStyles["font-bold"]}>İstek</span> listen</p>
                                <div className={styles["mini-decoration"]}></div>
                            </div>

                            <div className={styles["course-grid"]}>
                                {wishList.map((item) => {
                                    return (
                                        <div key={item.id} className={styles["course-container"]}>
                                            <div style={{width:"100%"}}>
                                                {item.imageId ? (<img className={styles["course-img"]} src={`https://${bName}.s3.amazonaws.com/${item.imageId}`} alt="Course" />) : (<img style={{objectFit:"contain"}} className={styles["course-img"]} src="/logo/courseup-l-v1.png" alt="Course" />)}
                                            </div>
                                            <p>{item.name}</p>
                                            <p>{item.description}</p>
                                            {item.discount !== 0 && (<p className={textStyles["text-small"]} style={{ textDecoration: "line-through" }}>{item.originalPrice} ₺</p>)}
                                            <p className={textStyles["font-bold"]}>{item.discountedPrice} ₺</p>
                                            {item.discount > 0 && (<p>% {item.discount} indirim</p>)}
                                            <button className={styles["remove-button"]} onClick={() => handleDelete(item.id)}>İstek Listenden Çıkar</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>İstek listen boş.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserWishList;