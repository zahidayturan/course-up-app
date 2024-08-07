import React, { useEffect, useState } from 'react';
import Header from "../home/components/Header";
import { useNavigate } from "react-router-dom";
import styles from "./css/AllCategory.module.css"

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
            <h2 style={{marginTop:24}}>Tüm Kategoriler</h2>
            <div className={styles["flex-box"]}>
                {categories.map((category) => (
                    <div className={styles["basic-category-box"]}>
                        <button className={styles["category-button"]} key={category.path} onClick={() => handleCategoryClick(category.path)}>
                            {category.name}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AllCategory;