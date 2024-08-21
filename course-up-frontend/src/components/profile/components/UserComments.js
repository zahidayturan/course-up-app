import React, {useEffect, useState} from 'react';
import textStyles from "../../css/Text.module.css";
import axios from "axios";
import Endpoints from "../../../constants/Endpoints";
import {Link, useNavigate} from "react-router-dom";
import styles from "../css/UserWishListAndComments.module.css";
import mainStyles from "../../css/Main.module.css";
import RatingStars from "../../course/RatingStars";


const UserComments = () => {

    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentsError, setCommentsError] = useState(null);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async (userId) => {
            try {
                setCommentsLoading(true);
                const response = await axios.get(`${Endpoints.USER_COMMENTS}/${userId}`);
                setComments(response.data);
                console.log('Wish list courses set');
            } catch (error) {
                setCommentsError('Yorumlarınız yüklenirken bir hata oluştu');
            } finally {
                setCommentsLoading(false);
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchComments(parsedUser.id);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    return (
        <div>
            {user && (
                <div className={styles['courses-box']}>
                    {commentsLoading ? (
                        <div style={{padding:12}}>
                            <div className={mainStyles['loader']}>
                                <div className={mainStyles['spinner']}></div>
                            </div>
                        </div>
                    ) : commentsError ? (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>{commentsError}</p>
                        </div>
                    ) : comments && comments.length > 0 ? (
                        <div style={{padding:12,width:"100%"}}>
                            <div className={styles["custom-row"]}>
                                <p style={{fontSize:24}} className={textStyles["font-bold"]}>Yorumların</p>
                                <div className={styles["mini-decoration"]} style={{backgroundColor:"var(--orange-color-1)",width:64}}></div>
                            </div>

                            <div className={styles["course-grid"]}>
                                {comments.map((item) => {
                                    return (
                                        <Link to={`/profile/course-view/${item.traineeId}`} title={"Kurs paneline git"} key={item.id}  className={styles["comments-box"]} style={{textDecoration:"none",color:"var(--secondary-color-2)"}}>
                                            <p style={{fontSize:14}}><span style={{fontSize:15}}>{item.courseName}</span> kursuna yaptığın yorum</p>
                                            <p style={{margin:"6px 6px 0 12px"}}>{item.comments}</p>
                                            <div style={{display:"flex",justifyContent:"end",alignItems:"center"}}>
                                                <RatingStars rating={item.rating} size={14}/>
                                                <p style={{fontSize:13}}>{item.rating}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{padding:12}}>
                            <p className={textStyles["text-center"]} style={{padding:"14px 0",fontSize:14}}>Gösterilecek yorum yok</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserComments;