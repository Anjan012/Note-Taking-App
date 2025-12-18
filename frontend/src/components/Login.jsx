import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8000/api/auth/login";

export const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const validateLoginInput = () => {
        const newErrors = {};

        // Email validation
        const email = user.email.trim();
        if (!email) {
            newErrors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        const password = user.password;
        if (!password) {
            newErrors.password = "Password is required!";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateLoginInput();

        if (isValid) {
            // console.log("Form is valid! Proceed with login...");
            // console.log("Submitting:", user);

            const response = await axios.post(URL,
                { email: user.email, password: user.password },
                {
                    withCredentials: true
                }
            );

            const jwt = response.data.user.jwt;

            localStorage.setItem("jwt", jwt);

            console.log(jwt);
            if (response.status === 200) {
                navigate("/dashboard");
            }

        } else {
            console.log("Form has errors. Cannot submit.");
            // Errors are already set in state, you can display them in UI
        }
    };

    return (
        <div className="auth-container" id="loginPage">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleInput}
                            name="email"
                            value={user.email}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={handleInput}
                            value={user.password}
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}