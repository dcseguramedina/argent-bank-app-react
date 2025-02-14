import React from "react";
import { NavLink } from "react-router-dom";
import { NavigationProps } from "../../services/interfaces.service";
import styles from "./Navigation.module.css";

const Navigation: React.FC<NavigationProps> = ({ links }) => (
    <nav className={styles.headerNav}>
        <ul className={styles.headerNavList}>
            {links.map((link, index) => (
                <li key={index} className={styles.headerNavItem}>
                    <NavLink
                        to={link.url}
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        <i className={link.icon}></i>
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
