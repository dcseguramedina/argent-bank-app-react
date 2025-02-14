import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/types";
import { getUserProfile } from "../../services/profile.service";
import AccountCard from "../../components/accountCard/AccountCard.tsx";
import Button from "../../components/button/Button";
import EditProfile from "../../features/editProfile/EditProfile.tsx";
import styles from "./User.module.css";

// Interfaces
interface AccountData {
  title: string;
  amount: string;
  description: string;
}

// Component creation
const User: React.FC = () => {
  // React states
  const [isEditing, setIsEditing] = useState(false);

  // Redux states
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const { userProfile } = useSelector((state: RootState) => state.profile);
  const userName = userProfile.firstName

  const openEditName = () => {
    setIsEditing(!isEditing);
  };

  const accounts: AccountData[] = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  return (
    <main className={styles.bgDark}>
      <div className={styles.header}>
        <h1>Welcome back <br />{userName}</h1>
        {!isEditing ? (
          <Button type="button" variant="edit" textContent="Edit Name" onClick={openEditName} />
        ) : (
          <EditProfile
              isEditing={isEditing}
              setIsEditing={setIsEditing}
          />
        )}
      </div>
      <h2 className={styles.srOnly}>Accounts</h2>
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default User;

