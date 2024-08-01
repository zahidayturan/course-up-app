import React, { useState, useEffect } from 'react';
import styles from "../css/Options.module.css";
import textStyles from "../../css/Text.module.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Options = () => {

    const [user, setUser] = useState(null);
    const location = useLocation();

    const options = [
        { name: "Kurslarım", path: "/profile/my-courses" },
        { name: "İstatistiklerim", path: "/profile/my-statistics" },
        { name: "İstek Listem", path: "/profile/my-wishlist" },
        { name: "Yorumlarım", path: "/profile/my-comments" },
        { name: "Ayarlarım", path: "/profile/my-settings" }
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    return (
        <div className={classNames(styles["option"],styles["custom-row"])}>
            <div className={styles["custom-row"]}>
                <p>Merhaba <br/><span className={classNames(textStyles["font-bold"],textStyles["text-large"])}>Profilin</span></p>
                <p className={styles["is-mobile"]}>1.08.2024 <br/><span className={textStyles["font-bold"]}>Perşembe</span></p>
            </div>
            <div className={styles["options-names"]}>
                {options.map((option, index) => (
                    <Link
                        key={index}
                        to={option.path}
                        className={classNames(styles["text-button"], {[styles.active]: location.pathname === option.path})}
                    >
                        {option.name}
                    </Link>
                ))}
            </div>
            <p className={styles["is-web"]}>1.08.2024 <br/><span className={textStyles["font-bold"]}>Perşembe</span></p>
        </div>
    );
};

export default Options;
