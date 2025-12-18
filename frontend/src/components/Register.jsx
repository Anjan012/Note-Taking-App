import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const URL = "http://localhost:8000/api/auth/register";

export const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const validateSignupInput = () => {

        const newErrors = {};

        const fullname = user.fullname.trim();
        const email = user.email.trim();
        const password = user.password;

        if (!fullname) {
            newErrors.fullname = "Fullname is required";
        } else if (fullname.length < 3) {
            newErrors.fullname = "Name must be atleast 3 characters";
        }

        if (!email) {
            newErrors.email = "Email is Required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be atleast 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const isValid = validateSignupInput();

            if (isValid) {

                const response = await axios.post(URL,
                    {
                        name: user.fullname,
                        email: user.email,
                        password: user.password
                    },
                    {
                        withCredentials: true // for future
                    }
                )

                const userData = response.data.user;

                localStorage.setItem("userData", JSON.stringify(userData));

                const jwt = response.data.user.jwt;

                localStorage.setItem("jwt", jwt);

                if (response.status === 201) {
                    navigate("/dashboard");
                }

            }
        } catch (error) {
            console.log("Registration Error: ", error);
        }
    }


    return (
        <div className="auth-container" id="registerPage">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Sign up to get started</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            name="fullname"
                            onChange={handleInput}
                            value={user.fullname}
                        />
                        {errors.fullname && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.fullname}</span>}

                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleInput}
                            value={user.email}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}

                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            name="password"
                            onChange={handleInput}
                            value={user.password}
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}

                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    )
}