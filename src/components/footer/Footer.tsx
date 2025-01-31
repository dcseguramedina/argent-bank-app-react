import {FooterProps} from "../../services/interfaces.service.ts";
import styles from "./Footer.module.css";

const Footer = ({copyrightText, year, additionalText}: FooterProps) => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                {copyrightText} {year} {additionalText}
            </p>
        </footer>
    );
};

export default Footer;
