import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Settings, ShieldCheck, LogOut } from 'lucide-react';
import PersonalInfo from '../components/Profile/PersonalInfo';
import AddressBook from '../components/Profile/AddressBook';
import SettingsPanel from '../components/Profile/SettingsPanel';
import SecuritySettings from '../components/Profile/SecuritySettings';
import './ProfilePage.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { currentUser, logout, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfo />;
      case 'address': return <AddressBook />;
      case 'settings': return <SettingsPanel onLogout={handleLogoutClick} />;
      case 'security': return <SecuritySettings />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <div className="profile-page page-container">
      <div className="container profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-summary">
            <div className="profile-avatar">
              {userProfile?.photoURL ? (
                <img src={userProfile.photoURL} alt="Profile" />
              ) : (
                <User size={40} color="#fff" />
              )}
            </div>
            <h3>{userProfile?.name || 'User'}</h3>
            <p>{userProfile?.email}</p>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={activeTab === 'personal' ? 'active' : ''} 
              onClick={() => setActiveTab('personal')}
            >
              <User size={18} /> Personal Info
            </button>
            <button 
              className={activeTab === 'address' ? 'active' : ''} 
              onClick={() => setActiveTab('address')}
            >
              <MapPin size={18} /> Address Book
            </button>
            <button 
              className={activeTab === 'security' ? 'active' : ''} 
              onClick={() => setActiveTab('security')}
            >
              <ShieldCheck size={18} /> Security
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} /> Settings
            </button>
            
            <div className="nav-divider"></div>
            
            <button className="logout-btn" onClick={handleLogoutClick}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>
        
        <main className="profile-content">
          {renderContent()}
        </main>
      </div>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-content">
            <h3 style={{ marginBottom: '20px', color: 'var(--color-text)' }}>Are you sure want to log out?</h3>
            <div className="logout-modal-actions">
              <button className="btn-secondary" onClick={confirmLogout} style={{ flex: 1 }}>
                Yes
              </button>
              <button className="btn-primary" onClick={cancelLogout} style={{ flex: 2 }}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
