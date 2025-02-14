import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Logo.module.css";

// Interfaces
interface LogoProps {
    url: string;
    src: string;
    alt: string
    ariaLabel: string;
    srOnly?: string;
}

// Component creation
const Logo: React.FC<LogoProps> = ({url, src, alt, ariaLabel, srOnly}) => {
    return (
        <NavLink className={styles.logo} to={url}>
            <img
                className={styles.logoImage}
                src={src}
                alt={alt}
                aria-label={ariaLabel}
            />
            {srOnly && <h1 className={styles.srOnly}>{srOnly}</h1>}
        </NavLink>
    );
};

export default Logo;
