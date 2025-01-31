import { NavLink } from "react-router-dom";
import { LogoProps } from "../../services/interfaces.service";
import styles from "./Logo.module.css";

const Logo: React.FC<LogoProps> = ({ url, src, alt, ariaLabel, srOnly }) => {
  return (
    <NavLink className={styles.logo} to={url}>
      <img
        className={styles.logoImage}
        src={src}
        alt={alt}
        aria-label={ariaLabel}
      />
      {srOnly && <h1 className={styles.srOnly}>{srOnly}</h1>}
    </NavLink>
  );
};

export default Logo;
