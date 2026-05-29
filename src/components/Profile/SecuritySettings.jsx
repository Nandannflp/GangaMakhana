import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Smartphone, AlertTriangle } from 'lucide-react';

export default function SecuritySettings() {
  const { userProfile, updateEmail, updatePassword, reauthenticate } = useAuth();
  
  const [activeSection, setActiveSection] = useState(null); // 'email', 'phone', 'password'
  
  // States for changing data
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // For re-authentication
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (pass) => {
    // Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!currentPassword) return setError("Please enter your current password to verify.");
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await reauthenticate(currentPassword);
      await updateEmail(newEmail);
      setSuccess("Email updated successfully.");
      setActiveSection(null);
      setCurrentPassword('');
      setNewEmail('');
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update email.");
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword) return setError("Please enter your current password.");
    if (newPassword !== confirmPassword) return setError("New passwords do not match.");
    if (!validatePassword(newPassword)) {
      return setError("Password must be at least 8 characters long, include an uppercase letter, lowercase letter, number, and special character.");
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await reauthenticate(currentPassword);
      await updatePassword(newPassword);
      setSuccess("Password updated successfully.");
      setActiveSection(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update password.");
    }
    setLoading(false);
  };

  return (
    <div className="profile-section">
      <h2 className="profile-section-title">Account Security</h2>

      {error && <div className="form-message error" style={{ marginBottom: '20px' }}>{error}</div>}
      {success && <div className="form-message success" style={{ marginBottom: '20px' }}>{success}</div>}

      <div className="security-cards" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Email Card */}
        <div className="security-card" style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ backgroundColor: 'var(--color-background)', padding: '10px', borderRadius: '50%' }}>
                <Mail size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>Email Address</h4>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{userProfile?.email}</p>
              </div>
            </div>
            <button className="text-btn" onClick={() => setActiveSection(activeSection === 'email' ? null : 'email')}>
              {activeSection === 'email' ? 'Cancel' : 'Change'}
            </button>
          </div>
          
          {activeSection === 'email' && (
            <form onSubmit={handleUpdateEmail} style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
              <div className="profile-form-group">
                <label>New Email Address</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
              </div>
              <div className="profile-form-group">
                <label>Current Password (to verify)</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary btn-sm" disabled={loading}>
                {loading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          )}
        </div>

        {/* Password Card */}
        <div className="security-card" style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ backgroundColor: 'var(--color-background)', padding: '10px', borderRadius: '50%' }}>
                <Lock size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>Password</h4>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Last changed recently</p>
              </div>
            </div>
            <button className="text-btn" onClick={() => setActiveSection(activeSection === 'password' ? null : 'password')}>
              {activeSection === 'password' ? 'Cancel' : 'Change'}
            </button>
          </div>
          
          {activeSection === 'password' && (
            <form onSubmit={handleUpdatePassword} style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
              <div className="profile-form-group">
                <label>Current Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="profile-form-group">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.</span>
              </div>
              <div className="profile-form-group">
                <label>Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary btn-sm" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* Mobile Number Card (Mock for now, complex flow typically) */}
        <div className="security-card" style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ backgroundColor: 'var(--color-background)', padding: '10px', borderRadius: '50%' }}>
                <Smartphone size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>Mobile Number</h4>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{userProfile?.mobile || 'Not set'}</p>
              </div>
            </div>
            <button className="text-btn" onClick={() => alert("Please update your phone number in the Personal Info tab.")}>
              Manage
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
