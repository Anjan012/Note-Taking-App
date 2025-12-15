import { Link } from "react-router-dom"
export const Login = () => {
    return (
        <div className="auth-container" id="loginPage">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password"/>
                    </div>
                    <button type="button" className="btn" onclick="showApp()">Sign In</button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}