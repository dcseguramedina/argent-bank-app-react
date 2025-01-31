import React from "react";
import { FooterProps } from "../../services/interfaces.service";
import styles from "./Footer.module.css";

const footer: FooterProps = {
  copyrightText: "Copyright",
  year: new Date().getFullYear(),
  additionalText: "Argent Bank",
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        {footer.copyrightText} {footer.year} {footer.additionalText}
      </p>
    </footer>
  );
};

export default Footer;
