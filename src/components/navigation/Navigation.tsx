import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import styles from "./Navigation.module.css";

// Interfaces
interface LinkProps {
    icon: string;
    text: string;
    onClick?: () => void;
    url: string;
}

interface NavigationProps {
    links: LinkProps[];
}

// Create a custom hook to manage the changes in the window width and adapt the navigation component for a responsive design
const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

// Component creation
const Navigation: React.FC<NavigationProps> = ({links}) => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 568;

    return (
        <nav className={styles.headerNav}>
            <ul className={styles.headerNavList}>
                {links.map((link, index) => (
                    <li key={index} className={styles.headerNavItem}>
                        <NavLink
                            to={link.url}
                            onClick={link.onClick}
                            className={({isActive}) => (isActive ? styles.active : undefined)}
                        >
                            <i className={link.icon}></i>
                            {!isMobile && link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


export default Navigation;
