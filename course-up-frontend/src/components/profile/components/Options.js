import React, { useState, useEffect } from 'react';
import styles from "../css/Options.module.css";
import textStyles from "../../css/Text.module.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Options = ({ options, title }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            console.log('No user data found in localStorage');
        }

        const date = new Date();
        const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} <br/><span class="${textStyles["font-bold"]}">${days[date.getDay()]}</span>`;
        setCurrentDate(formattedDate);
    }, []);

    return (
        <div className={classNames(styles["option"], styles["custom-row"])}>
            <div className={styles["custom-row"]}>
                <p>Merhaba <br/><span className={classNames(textStyles["font-bold"], textStyles["text-large"])}>{title}</span></p>
                <p className={styles["is-mobile"]} dangerouslySetInnerHTML={{ __html: currentDate }}></p>
            </div>
            <div className={styles["options-names"]}>
                {options.map((option, index) => (
                    <Link
                        key={index}
                        to={option.path}
                        className={classNames(styles["text-button"], { [styles.active]: location.pathname === option.path })}
                    >
                        {option.name}
                    </Link>
                ))}
            </div>
            <p className={styles["is-web"]} dangerouslySetInnerHTML={{ __html: currentDate }}></p>
        </div>
    );
};

export default Options;
