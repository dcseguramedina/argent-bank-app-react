import React, {useState} from "react";
import AccountSection from "../../components/accountSection/AccountSection";
import Button from "../../components/button/Button";
import styles from "./User.module.css";
import InputField from "../../components/inputField/InputField.tsx";

interface AccountData {
  title: string;
  amount: string;
  description: string;
}

const User: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const userName = "Tony Jarvis"; // To fetch
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

  const handleEditName = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to save the new name
    setIsEditing(false);
  };

  return (
      <main className={styles.bgDark}>
        <div className={styles.header}>
          <h1>Welcome back <br/> {userName}</h1>
          {!isEditing ? (
            <Button type="button" variant="edit" textContent="Edit Name" onClick={handleEditName} />
          ) : (
            <div className={styles.editContent}>
              <form className={styles.editForm} onSubmit={handleSave}>
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
              </form>
              <div className={styles.editBtns}>
                <Button type="button" variant="editActions" textContent="Cancel" onClick={handleCancel} />
                <Button type="submit" variant="editActions" textContent="Save" />
              </div>
            </div>
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

