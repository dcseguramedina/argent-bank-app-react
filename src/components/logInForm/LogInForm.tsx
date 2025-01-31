import React, {useState, FormEvent, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { loginUser } from "../../store/authSlice";
import InputField from "../inputField/InputField";
import RememberMe from "../rememberMe/RememberMe";
import Button from "../button/Button";

const LogInForm: React.FC = () => {
    // states
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // redux states
    //const { isLoggedIn } = useSelector((state: RootState) => state.auth);
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
        console.log(userCredentials);
        const result = await dispatch(loginUser(userCredentials));
        console.log(result);
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
            // Handle login failure (show error message, etc.)
        }
    };

    return (
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
    );
};

export default LogInForm;
