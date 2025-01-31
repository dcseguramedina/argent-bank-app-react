import React from "react";
import { RememberMeProps } from "../../services/interfaces.service";
import styles from "./RememberMe.module.css";

const RememberMe: React.FC<RememberMeProps> = ({ textContent, checked, onChange }) => {
    return (
        <div className={styles.inputRemember}>
            <input
                type="checkbox"
                id="remember-me"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor="remember-me">{textContent}</label>
        </div>
    );
};

export default RememberMe;

