import styles from "./Footer.module.css";
import {useEffect, useState} from "react";

const Footer = () => {
    const useCurrentYear = () => {
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
