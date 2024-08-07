import React, { useEffect, useState } from 'react';
import Header from "../home/components/Header";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <Header/>
            <h2>Tüm Kategoriler</h2>
            {categories.map((category) => (
                <button key={category.path} onClick={() => handleCategoryClick(category.path)}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default AllCategory;

