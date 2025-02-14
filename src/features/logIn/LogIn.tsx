import React, {FormEvent, useEffect, useState} from "react";
import InputField from "../../components/inputField/InputField.tsx";
import RememberMe from "../../components/rememberMe/RememberMe.tsx";
import Button from "../../components/button/Button.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/types.ts";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../services/auth.service.ts";
import styles from "./LogIn.module.css";

// Component creation
const LogIn: React.FC = () => {
    // React states
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // Redux states
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's a saved email in localStorage
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userCredentials = {
            email: email,
            password: password,
        };
        const result = await dispatch(loginUser(userCredentials));

        if (result.payload) {
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            setEmail('');
            setPassword('');
            navigate('/user');
        } else {
            console.error('Login failed');
        }
    };
  return (
    <main className={styles.bgDark}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
              <InputField
                  label="Username"
                  id="username"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                  }
                  placeholder="Email"
                  required
              />
              <InputField
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                  }
                  placeholder="Password"
                  required
              />
              <RememberMe
                  textContent="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
              />

              <Button type="submit" variant="login" textContent="Sign In" />
          </form>
      </section>
    </main>
  );
};

export default LogIn;
