import React from "react";
import styles from "./Banner.module.css";

// Interfaces
interface BannerProps {
    src: string;
    alt: string;
    ariaLabel: string;
    description: {
        promoted: string;
        fees: string;
        deposit: string;
        interest: string;
        savings: string;
    },
}

// Component creation
const Banner: React.FC<BannerProps> = ({
                                           src,
                                           alt,
                                           ariaLabel,
                                           description,
                                       }) => {
    return (
        <section className={styles.banner} aria-label={ariaLabel}>
            <img className={styles.bannerImage} src={src} alt={alt}/>
            <div className={styles.bannerContent}>
                <h2 className={styles.srOnly}>{description.promoted}</h2>
                <p className={styles.subtitle}>{description.fees}</p>
                <p className={styles.subtitle}>{description.deposit}</p>
                <p className={styles.subtitle}>{description.interest}</p>
                <p className={styles.text}>{description.savings}</p>
            </div>
        </section>
    );
};

export default Banner;
