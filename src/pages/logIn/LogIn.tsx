import React from "react";
import LogInForm from "../../components/logInForm/LogInForm";
import styles from "./LogIn.module.css";

const LogIn: React.FC = () => {
  return (
    <main className={styles.bgDark}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>
        <LogInForm />
      </section>
    </main>
  );
};

export default LogIn;
