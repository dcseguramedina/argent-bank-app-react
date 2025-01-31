import React from "react";
import { InputFieldProps } from "../../services/interfaces.service";
import styles from "./InputField.module.css";

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange, placeholder, required}) => {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default InputField;

