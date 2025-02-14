import {useEffect, useState} from "react";
import styles from "./Footer.module.css";

// Component creation
const Footer = () => {
    const useCurrentYear = () => {
        // React states
        const [year, setYear] = useState(new Date().getFullYear());

        useEffect(() => {
            const interval = setInterval(() => {
                setYear(new Date().getFullYear());
            }, 60000); // Check every minute
            return () => clearInterval(interval);
        }, []);

        return year;
    };

    const currentYear = useCurrentYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                Copyright {currentYear} Argent Bank
            </p>
        </footer>
    );
};

export default Footer;
