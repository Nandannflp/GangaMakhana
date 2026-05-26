import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Phone, User, ArrowRight } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, signInWithGoogle, setupRecaptcha, signInWithPhone, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    }
  }, [currentUser, navigate, location]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (authMode === 'signup') {
        await signup(email, password, name);
        // You could also update profile with name here if needed
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err.code) || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err.code) || 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const appVerifier = setupRecaptcha('recaptcha-container');
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`; // Defaulting to India if no code
      const confirmationResult = await signInWithPhone(formattedPhone, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
    } catch (err) {
      setError(getErrorMessage(err.code) || 'Failed to send OTP. Please check the phone number.');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await window.confirmationResult.confirm(otp);
      navigate('/');
    } catch (err) {
      setError('Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found': return 'No user found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/email-already-in-use': return 'Email is already registered.';
      case 'auth/weak-password': return 'Password must be at least 6 characters.';
      case 'auth/invalid-email': return 'Please enter a valid email address.';
      case 'auth/invalid-phone-number': return 'Invalid phone number format.';
      default: return null;
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        <div className="login-card">
          <div className="login-header">
            <h2>{authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Phone Login'}</h2>
            <p className="login-subtitle">
              {authMode === 'login' && 'Enter your details to access your account'}
              {authMode === 'signup' && 'Sign up to get started with Ganga Makhana'}
              {authMode === 'phone' && 'Securely log in using your phone number'}
            </p>
          </div>

          {error && <div className="login-alert error">{error}</div>}

          {/* Social Logins */}
          {authMode !== 'phone' && (
            <div className="social-logins">
              <button onClick={handleGoogleSignIn} disabled={loading} className="social-btn google-btn">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="social-icon" />
                Continue with Google
              </button>
              
              <div className="divider">
                <span>or continue with</span>
              </div>
            </div>
          )}

          {/* Email / Password Forms */}
          {(authMode === 'login' || authMode === 'signup') && (
            <form onSubmit={handleEmailAuth} className="auth-form">
              {authMode === 'signup' && (
                <div className="input-group">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
              )}
              
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength="6"
                />
              </div>

              {authMode === 'login' && (
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary full-width">
                {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* Phone Auth Form */}
          {authMode === 'phone' && (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="auth-form">
              {!otpSent ? (
                <>
                  <div className="input-group">
                    <Phone className="input-icon" size={20} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (e.g. 9876543210)" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div id="recaptcha-container"></div>
                  <button type="submit" disabled={loading} className="btn-primary full-width mt-4">
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <Lock className="input-icon" size={20} />
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      required 
                      maxLength="6"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary full-width mt-4">
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                  <div className="resend-otp">
                    <button type="button" onClick={() => setOtpSent(false)} className="text-btn">Change phone number</button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* Auth Mode Toggles */}
          <div className="auth-footer">
            {authMode === 'login' ? (
              <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-btn primary-text">Sign up</button></p>
            ) : authMode === 'signup' ? (
              <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-btn primary-text">Sign in</button></p>
            ) : (
              <p>Prefer email? <button onClick={() => setAuthMode('login')} className="text-btn primary-text">Sign in with email</button></p>
            )}

            {authMode !== 'phone' && (
              <p className="mt-2">
                <button onClick={() => setAuthMode('phone')} className="text-btn flex items-center justify-center gap-2 mx-auto">
                  <Phone size={16} /> Login with Phone instead
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
