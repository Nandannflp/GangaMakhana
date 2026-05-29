import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Bell, BellOff, ExternalLink, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsPanel({ onLogout }) {
  const { userProfile, updateProfileData } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNotificationToggle = async () => {
    const newVal = !userProfile?.notificationsEnabled;
    try {
      await updateProfileData({ notificationsEnabled: newVal });
      if (newVal) {
        // Here we could also request browser push notification permissions in the future
        if (Notification.permission !== 'granted') {
          Notification.requestPermission();
        }
      }
    } catch (error) {
      console.error("Failed to update notification settings", error);
    }
  };

  return (
    <div className="profile-section">
      <h2 className="profile-section-title">Settings</h2>

      <div className="settings-group" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Appearance</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Toggle the website theme</p>
            </div>
          </div>
          <button 
            className="btn-secondary btn-sm"
            onClick={toggleTheme}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="settings-group" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Notifications</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userProfile?.notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Website Notifications</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Receive updates on orders and offers</p>
            </div>
          </div>
          
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input 
              type="checkbox" 
              checked={!!userProfile?.notificationsEnabled}
              onChange={handleNotificationToggle}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: userProfile?.notificationsEnabled ? 'var(--color-primary)' : '#ccc',
              transition: '.4s', borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute', content: '""', height: '16px', width: '16px', 
                left: userProfile?.notificationsEnabled ? '30px' : '4px', bottom: '4px',
                backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
              }}></span>
            </span>
          </label>
        </div>
      </div>

      <div className="settings-group" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Legal & Policies</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/privacy" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--color-background)', borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text)' }}>
            <span>Privacy Policy</span>
            <ExternalLink size={16} color="var(--color-text-light)" />
          </Link>
          <Link to="/terms" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--color-background)', borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text)' }}>
            <span>Terms & Conditions</span>
            <ExternalLink size={16} color="var(--color-text-light)" />
          </Link>
          <Link to="/shipping" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--color-background)', borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text)' }}>
            <span>Shipping & Refund Policy</span>
            <ExternalLink size={16} color="var(--color-text-light)" />
          </Link>
        </div>
      </div>

      <div className="settings-group" style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
        <button onClick={onLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', borderColor: '#ef4444' }}>
          <LogOut size={18} /> Logout of your account
        </button>
      </div>

    </div>
  );
}
