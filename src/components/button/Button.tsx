import React from "react";
import { ButtonProps } from "../../services/interfaces.service";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({ type, variant, textContent }) => {
  const getButtonClass = (): string => {
    switch (variant) {
      case "login":
        return styles.login;
      case "edit":
        return styles.edit;
      case "transaction":
        return styles.transaction;
      default:
        return "";
    }
  };

  return (
    <button type={type} className={`${styles.button} ${getButtonClass()}`}>
      {textContent}
    </button>
  );
};

export default Button;
