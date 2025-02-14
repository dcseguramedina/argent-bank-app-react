import React from 'react';
import Button from "../button/Button";
import styles from './AccountCard.module.css';

// Interfaces
interface AccountCardProps {
    title: string;
    amount: string;
    description: string;
    onViewTransactions?: () => void;
}

// Component creation
const AccountCard: React.FC<AccountCardProps> = ({title, amount, description, onViewTransactions}) => {
    return (
        <section className={styles.account}>
            <div className={styles.accountContentWrapper}>
                <h3 className={styles.accountTitle}>{title}</h3>
                <p className={styles.accountAmount}>{amount}</p>
                <p className={styles.accountAmountDescription}>{description}</p>
            </div>
            <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
                <Button
                    type="button"
                    variant="transaction"
                    textContent="View transactions"
                    onClick={onViewTransactions}
                ></Button>
            </div>
        </section>
    );
};

export default AccountCard;

