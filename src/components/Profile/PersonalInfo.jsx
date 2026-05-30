import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { compressImageAsBase64 } from '../../lib/imageUtils';

export default function PersonalInfo() {
  const { userProfile, updateProfileData, updateLocalProfile, currentUser } = useAuth();
  
  const [name, setName] = useState(userProfile?.name || '');
  const [mobile, setMobile] = useState(userProfile?.mobile || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateProfileData({ name, mobile });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    }
    
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check format
    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.type)) {
      alert("Unsupported file format. Please upload JPG, PNG, or WEBP.");
      return;
    }

    setUploadingImage(true);
    
    // Optimistic UI update for immediate feedback across the app
    const localPreview = URL.createObjectURL(file);
    updateLocalProfile({ photoURL: localPreview });

    try {
      const base64Image = await compressImageAsBase64(file, 150); // Convert to compact base64
      await updateProfileData({ photoURL: base64Image });
      setMessage('Profile picture updated!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload image. Using local preview temporarily.');
    }
    setUploadingImage(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-section">
      <h2 className="profile-section-title">Personal Information</h2>
      
      <div className="profile-photo-upload">
        <label htmlFor="photo-upload" className="photo-upload-label">
          <div className="photo-preview">
            {userProfile?.photoURL ? (
              <img src={userProfile.photoURL} alt="Profile" />
            ) : (
              <div className="photo-placeholder">Upload Photo</div>
            )}
            {uploadingImage && <div className="upload-overlay">Uploading...</div>}
          </div>
          <span className="btn-secondary btn-sm">Change Photo</span>
          <span className="photo-hint">Max size: 300KB. JPG, PNG, WEBP.</span>
        </label>
        <input 
          type="file" 
          id="photo-upload" 
          accept="image/jpeg, image/png, image/webp"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      <form onSubmit={handleSave} className="profile-form">
        <div className="profile-form-group">
          <label>Email Address</label>
          <input type="email" value={userProfile?.email || ''} disabled title="Email cannot be changed here. Go to Security settings." />
        </div>
        
        <div className="profile-form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="profile-form-group">
          <label>Mobile Number</label>
          <input 
            type="tel" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            placeholder="+1 234 567 8900"
          />
        </div>
        
        {message && <p className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
