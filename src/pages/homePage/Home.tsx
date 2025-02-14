import React from "react";
import Banner from "../../components/banner/Banner";
import FeatureCard from "../../components/featureCard/FeatureCard";
import styles from "./Home.module.css";

//Interfaces
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

interface FeatureCardProps {
    iconSrc: string,
    title: string,
    description: string,
}

// Component creation
const Home: React.FC = () => {
    const banner: BannerProps = {
        src: "../src/assets/img/bank-tree.jpeg",
        alt: "Savings plant",
        ariaLabel: "Banner image",
        description: {
            promoted: "Promoted Content",
            fees: "No fees.",
            deposit: "No minimum deposit.",
            interest: "High interest rates.",
            savings: "Open a savings account with Argent Bank today!",
        },
    };

    const features: FeatureCardProps[] = [
        {
            iconSrc: "src/assets/img/icon-chat.png",
            title: "You are our #1 priority",
            description:
                "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        },
        {
            iconSrc: "src/assets/img/icon-money.png",
            title: "More savings means higher rates",
            description:
                "The more you save with us, the higher your interest rate will be!",
        },
        {
            iconSrc: "src/assets/img/icon-security.png",
            title: "Security you can trust",
            description:
                "We use top of the line encryption to make sure your data and money is always safe.",
        },
    ];

    return (
        <main>
            <Banner {...banner} />
            <section className={styles.features}>
                <h2 className={styles.srOnly}>Features</h2>
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </section>
        </main>
    );
};

export default Home;
