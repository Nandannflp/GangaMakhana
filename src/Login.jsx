import { useState } from "react";
import { Link } from "react-router-dom";
import { login, googleLogin, sendOtp, verifyOtp } from "./auth";
import "./pages/LoginPage.css";

function Login() {

  // Email/Password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Tab: "email" | "phone"
  const [tab, setTab] = useState("email");

  // ── Email Login ─────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // ── Send OTP ────────────────────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    await sendOtp(phone);
    setOtpSent(true);
  };

  // ── Verify OTP ──────────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    await verifyOtp(otp);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          {/* Header */}
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">
              Sign in to your Ganga Makhana account
            </p>
          </div>

          {/* Google */}
          <div className="social-logins">
            <button onClick={googleLogin} className="social-btn google-btn">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="social-icon"
              />
              Continue with Google
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${tab === "email" ? "active" : ""}`}
              onClick={() => { setTab("email"); setOtpSent(false); }}
            >
              Email
            </button>
            <button
              className={`tab-btn ${tab === "phone" ? "active" : ""}`}
              onClick={() => { setTab("phone"); setOtpSent(false); }}
            >
              Phone
            </button>
          </div>

          {/* Email/Password Form */}
          {tab === "email" && (
            <form onSubmit={handleLogin} className="auth-form">
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
                Sign In
              </button>
            </form>
          )}

          {/* Phone OTP Form */}
          {tab === "phone" && (
            <div className="auth-form">
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="input-group">
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 9876543210)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div id="recaptcha-container"></div>
                  <button type="submit" className="btn-primary full-width" style={{ marginTop: "12px" }}>
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                    />
                  </div>
                  <button type="submit" className="btn-primary full-width" style={{ marginTop: "12px" }}>
                    Verify & Login
                  </button>
                  <div className="resend-otp">
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setOtpSent(false)}
                    >
                      Change phone number
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="primary-text">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
