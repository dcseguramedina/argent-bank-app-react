interface LogoProps {
    url: string;
    src: string;
    alt: string
    ariaLabel: string;
    srOnly?: string;
}

interface NavigationProps {
    url: string;
    text: string;
}

interface BannerProps {
    src: string;
    alt: string;
    ariaLabel: string;
    description?: {};
}

interface FeatureCardProps {
    iconSrc: string,
    title: string,
    description: string,
}

interface FooterProps {
    copyrightText: string;
    year: number;
    additionalText: string;
}


export type { LogoProps, NavigationProps, BannerProps, FeatureCardProps, FooterProps }