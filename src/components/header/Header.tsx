import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import { LogoProps, LinkProps } from "../../services/interfaces.service";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";
import {logoutUser} from "../../store/authSlice.ts";

const Header: React.FC = () => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    console.log(user)

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
                    icon: "fa fa-user-circle",
                    text: "Sign In",
                    url: "/login",
                },
            ];
        } else {
            return [
                {
                    icon: "fa fa-user-circle",
                    text: "",
                    url: "/user",
                },
                {
                    icon: "fa fa-sign-out",
                    text: "Sign Out",
                    onClick: handleLogout,
                    url: "/",
                },
            ];
        }
    }, [isLoggedIn, user, handleLogout]);

    return (
        <header className={styles.header}>
            <Logo {...logo} />
            <Navigation links={navigationLinks} />
        </header>
    );
};

export default Header;