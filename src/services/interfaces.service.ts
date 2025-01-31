import React from "react";

interface LogoProps {
    url: string;
    src: string;
    alt: string
    ariaLabel: string;
    srOnly?: string;
}

interface LinkProps {
    url: string;
    text: string;
}

interface NavigationProps {
    links: LinkProps[];
}

interface BannerProps {
    src: string;
    alt: string;
    ariaLabel: string;
    description?: object;
}

interface FeatureCardProps {
    iconSrc: string,
    title: string,
    description: string,
}

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

interface RememberMeProps {
    textContent: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'login' | 'edit' | 'transaction';
    textContent: string;
}

interface FooterProps {
    copyrightText: string;
    year: number;
    additionalText: string;
}

interface User {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    error: string | null | undefined;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        email: string,
        password: string,
        firstName: string,
        lastName: string
    };
}

export type { LogoProps, LinkProps, NavigationProps, BannerProps, FeatureCardProps, InputFieldProps, RememberMeProps, ButtonProps, FooterProps, User, AuthState, LoginCredentials, LoginResponse }