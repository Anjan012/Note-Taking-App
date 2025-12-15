import { Link } from "react-router-dom"
export const Register = () => {
    return (
        <div className="auth-container" id="registerPage">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Sign up to get started</p>
                <form>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password"/>
                    </div>
                    <button type="button" className="btn" onclick="showApp()">Sign Up</button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login" onclick="showLogin()">Sign In</Link>
                </div>
            </div>
        </div>
    )
}