import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUserProfile, editUserProfile } from "../../store/profileSlice";
import AccountSection from "../../components/accountSection/AccountSection";
import Button from "../../components/button/Button";
import styles from "./User.module.css";
import InputField from "../../components/inputField/InputField.tsx";

interface AccountData {
  title: string;
  amount: string;
  description: string;
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'login' | 'edit' | 'editActions' | 'transaction';
  textContent: string;
  onClick?: () => void;
}

const User: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const userData = useSelector((state: RootState) => state.profile.data);
  const userName = userData.body.firstName;

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

  const openEditName = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditName = async (e: FormEvent<HTMLFormElement>) => {
    console.log('hello from save');

    e.preventDefault();

    const newUserData = {
      firstName: newFirstName,
      lastName: newLastName,
    };
    console.log(newUserData);

    const result = await dispatch(editUserProfile(newUserData));
    console.log(result);

    setIsEditing(false);
  };

  return (
    <main className={styles.bgDark}>
      <div className={styles.header}>
        <h1>Welcome back <br />{userName}</h1>
        {!isEditing ? (
          <Button type="button" variant="edit" textContent="Edit Name" onClick={openEditName} />
        ) : (
          <form className={styles.editContent} onSubmit={handleEditName}>
            <div className={styles.editForm}>
            <InputField
              id="name"
              type="text"
              placeholder="First Name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <InputField
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            </div>          
            <div className={styles.editBtns}>
              <Button type="button" variant="editActions" textContent="Cancel" onClick={handleCancel} />
              <Button type="submit" variant="editActions" textContent="Save" />
            </div>
          </form>
        )}
      </div>
      <h2 className={styles.srOnly}>Accounts</h2>
      {accounts.map((account, index) => (
        <AccountSection
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

