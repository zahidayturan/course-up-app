import React, {useEffect, useState} from 'react';
import Header from '../home/components/Header';
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

const Basket = () => {
    const [user, setUser] = useState(null);
    const [basketCourses, setBasketCourses] = useState([]);
    const [basketError, setBasketError] = useState(null);
    const [basketLoading, setBasketLoading] = useState(false);

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

    const bName = process.env.REACT_APP_S3_BUCKET_NAME;
    return (
        <div>
            <Header />
            {basketCourses.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Basket;
