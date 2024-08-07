import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoints from "../../constants/Endpoints";
import mainStyles from "../css/Main.module.css";
import RatingStars from "./RatingStars";

const CourseComments = ({ courseId }) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchComments = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`${Endpoints.COURSE_COMMENTS}/${courseId}`, {
                params: { page, size: 10 }
            });
            const newComments = response.data;
            setComments(prevComments => [...prevComments, ...newComments]);
            if (newComments.length < 10) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    return (
        <div style={{marginTop:8}}>
            {comments.map(comment => (
                <div key={comment.id} style={{backgroundColor:"var(--secondary-color-1)",padding:6,borderRadius:6,marginBottom:6,width:"100%"}}>
                    <div style={{display:"flex",alignItems:"start",justifyContent:"space-between"}}>
                        <p style={{fontWeight:600}}>{comment.owner}</p>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <RatingStars rating={comment.rating} size={12}/>
                            <p style={{fontSize:13}}>{comment.rating}</p>
                        </div>
                    </div>
                    <p style={{marginLeft:8,marginTop:2}}>{comment.comments}</p>
                </div>
            ))}
            {loading &&
                <div className={mainStyles['loader']}>
                    <div className={mainStyles['spinner']}></div>
                </div>
            }
            {!hasMore && comments.length > 0 && <p style={{textAlign:"center",fontSize:14}}>Bütün yorumları görüntülediniz</p>}
            {hasMore && !loading && (
                <button style={{cursor:"pointer",border:"none",padding:"4px 8px"}} onClick={() => setPage(prevPage => prevPage + 1)}>
                    Daha fazla yorum görüntüle
                </button>
            )}
        </div>
    );
};

export default CourseComments;
