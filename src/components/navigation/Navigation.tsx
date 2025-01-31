import React from "react";
import { NavLink } from "react-router-dom";
import { NavigationProps } from "../../services/interfaces.service";
import styles from "./Navigation.module.css";

const Navigation: React.FC<NavigationProps> = ({ url, text }) => (
  <nav className={styles.headerNav}>
    <ul>
      <li className={styles.headerNavItem}>
        <NavLink
          to={url}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <i className="fa fa-user-circle"></i>
          {text}
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
