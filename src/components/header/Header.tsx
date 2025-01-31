import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { LogoProps, LinkProps } from "../../services/interfaces.service";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const logo: LogoProps = {
    src: "/src/assets/img/argentBankLogo.png",
    alt: "Argent Bank Logo",
    ariaLabel: "Logo Image",
    srOnly: "Argent Bank",
    url: "/",
  };

  const navigationLinks: LinkProps[] = !isLoggedIn
      ? [
        {
          text: "Sign In",
          url: "/login",
        },
      ]
      : [
        {
          text: "Sign Out",
          url: "/",
        },
      ];

  return (
      <header className={styles.header}>
        <Logo {...logo} />
        <Navigation links={navigationLinks} />
      </header>
  );
};

export default Header;
