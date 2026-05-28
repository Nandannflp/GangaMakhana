import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "./auth";
import "./pages/LoginPage.css"; // Reuse the same CSS for now

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Create Account</h2>
            <p className="login-subtitle">
              Sign up for Ganga Makhana
            </p>
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="btn-primary full-width">
              Sign Up
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="primary-text">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
