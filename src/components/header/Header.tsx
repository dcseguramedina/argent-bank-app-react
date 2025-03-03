import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/types";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import { logoutUser } from "../../services/auth.service";
import styles from "./Header.module.css";

interface LogoProps {
    url: string;
    src: string;
    alt: string
    ariaLabel: string;
    srOnly?: string;
}
interface LinkProps {
    icon: string;
    text: string;
    onClick?: () => void;
    url: string;
}

const Header: React.FC = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { userProfile } = useSelector((state: RootState) => state.profile);

    const dispatch = useDispatch<AppDispatch>();

    const userName = userProfile.firstName

    const logo: LogoProps = {
        src: "/src/assets/img/argentBankLogo.png",
        alt: "Argent Bank Logo",
        ariaLabel: "Logo Image",
        srOnly: "Argent Bank",
        url: "/",
    };

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    const navigationLinks: LinkProps[] = useMemo(() => {
        if (!isLoggedIn) {
            return [
                {
                    icon: "fa fa-userProfile-circle",
                    text: "Sign In",
                    url: "/login",
                },
            ];
        } else {
            return [
                {
                    icon: "fa fa-userProfile-circle",
                    text: userName || "Profile",
                    url: "/user",
                },
                {
                    icon: "fa fa-sign-out",
                    text: "Sign Out",
                    onClick: () => handleLogout(),
                    url: "/",
                },
            ];
        }
    }, [isLoggedIn, handleLogout, userName]);

    return (
        <header className={styles.header}>
            <Logo {...logo} />
            <Navigation links={navigationLinks} />
        </header>
    );
};

export default Header;
