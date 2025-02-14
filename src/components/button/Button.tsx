import React from "react";
import styles from "./Button.module.css";

// Interfaces
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'login' | 'edit' | 'editActions' | 'transaction';
    textContent: string;
    onClick?: () => void;
}

// Component creation
const Button: React.FC<ButtonProps> = ({type, variant, textContent, onClick}) => {
    const getButtonClass = (): string => {
        switch (variant) {
            case "login":
                return styles.login;
            case "edit":
                return styles.edit;
            case "editActions":
                return styles.editActions;
            case "transaction":
                return styles.transaction;
            default:
                return "";
        }
    };

    return (
        <button type={type} className={`${styles.button} ${getButtonClass()}`} onClick={onClick}>
            {textContent}
        </button>
    );
};

export default Button;
