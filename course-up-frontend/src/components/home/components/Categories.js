import React from 'react';
import styles from '../css/Categories.module.css';
import textStyles from '../../css/Text.module.css';
import classNames from "classnames";
import {Link} from "react-router-dom";

const Categories = () => {
    const categories = [
        { name: "Tasarım", path: "/" },
        { name: "Kişisel Gelişim", path: "/" },
        { name: "Yazılım ve Bilişim Teknolojileri", path: "/" },
        { name: "Fotoğrafçılık", path: "/" },
        { name: "Müzik", path: "/" },
        { name: "Dijital Pazarlama", path: "/" },
        { name: "Girişimcilik", path: "/" },
        { name: "Finans", path: "/" },
    ];
    return (
        <div className={styles["custom-row"]}>
            <div className={styles["category-names"]}>
                {categories.map((category, index) => (
                    <Link key={index} to={category.path} className={styles["text-button"]}>
                        {category.name}
                    </Link>
                ))}
                <Link to={"/"} className={classNames(styles["text-button"],styles["all"])}>
                    Tüm Kategoriler
                </Link>
            </div>
            <p className={classNames(textStyles["font-bold"],styles["title"])}>Çok İzlenen <br/><span style={{fontWeight:500}}>Kategoriler</span></p>
        </div>
    );
};

export default Categories;
