import React, { useEffect, useState } from 'react';
import Header from "../home/components/Header";
import { useParams, useNavigate } from 'react-router-dom';

const OneCategory = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => {
                const foundCategory = data.find(cat => cat.path.split("/").pop() === name);
                if (foundCategory) {
                    setCategory(foundCategory);
                } else {
                    navigate('/category');
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                navigate('/category');
            });
    }, [name, navigate]);

    return (
        <div>
            <Header />
            {category && (
                <h2>Kategori: {category.name}</h2>
            )}
        </div>
    );
};

export default OneCategory;
