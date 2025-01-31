import React from "react";
import { FeatureCardProps } from "../../services/interfaces.service";
import styles from "./FeatureCard.module.css";

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconSrc,
  title,
  description,
}) => {
  return (
    <div className={styles.featureItem}>
      <img src={iconSrc} alt={`${title} Icon`} className={styles.featureIcon} />
      <h3 className={styles.featureItemTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
