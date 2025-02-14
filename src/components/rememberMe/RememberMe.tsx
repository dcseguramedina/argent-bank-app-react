import React from "react";
import styles from "./RememberMe.module.css";

// Interfaces
interface RememberMeProps {
    textContent: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Component creation
const RememberMe: React.FC<RememberMeProps> = ({textContent, checked, onChange}) => {
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

