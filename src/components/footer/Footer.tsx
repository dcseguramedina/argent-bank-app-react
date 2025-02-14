import styles from "./Footer.module.css";

interface FooterProps {
    copyrightText: string;
    year: number;
    additionalText: string;
}

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
