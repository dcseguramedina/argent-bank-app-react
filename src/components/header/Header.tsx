import { LogoProps, NavigationProps } from "../../services/interfaces.service";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";

const logo: LogoProps = {
  src: "/src/assets/img/argentBankLogo.png",
  alt: "Argent Bank Logo",
  ariaLabel: "Logo Image",
  srOnly: "Argent Bank",
  url: "/",
};

const navigation: NavigationProps = {
  text: "Sign In",
  url: "/login",
};

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo {...logo} />
      <Navigation {...navigation} />
    </header>
  );
};

export default Header;
