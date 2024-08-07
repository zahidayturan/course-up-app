import React, {useEffect, useState} from 'react';
import styles from '../css/Categories.module.css';
import textStyles from '../../css/Text.module.css';
import classNames from "classnames";
import {Link} from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/json/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className={styles["custom-row"]}>
            <div className={styles["category-names"]}>
                {categories.map((category, index) => (
                    <Link key={index} to={category.path} className={styles["text-button"]}>
                        {category.name}
                    </Link>
                ))}
                <Link to={"/category"} className={classNames(styles["text-button"],styles["all"])}>
                    Tüm Kategoriler
                </Link>
            </div>
            <p className={classNames(textStyles["font-bold"],styles["title"])}>Çok İzlenen <br/><span style={{fontWeight:500}}>Kategoriler</span></p>
        </div>
    );
};

export default Categories;
