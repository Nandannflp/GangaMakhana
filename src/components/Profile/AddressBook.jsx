import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Edit2, Trash2, Plus, Star } from 'lucide-react';

export default function AddressBook() {
  const { currentUser, userProfile, updateProfileData } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    country: 'India',
    pincode: ''
  });

  useEffect(() => {
    fetchAddresses();
  }, [currentUser]);

  const fetchAddresses = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'addresses'));
      const addrList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAddresses(addrList);
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    try {
      if (editingId) {
        await updateDoc(doc(db, 'users', currentUser.uid, 'addresses', editingId), formData);
      } else {
        const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'addresses'), formData);
        
        // If it's the first address, make it default automatically
        if (addresses.length === 0) {
          await updateProfileData({ defaultAddressId: docRef.id, defaultPincode: formData.pincode });
        }
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        fullName: '', mobile: '', addressLine1: '', addressLine2: '', landmark: '', city: '', state: '', country: 'India', pincode: ''
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address", error);
    }
  };

  const handleEdit = (addr) => {
    setFormData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'addresses', id));
      if (userProfile?.defaultAddressId === id) {
        await updateProfileData({ defaultAddressId: null, defaultPincode: null });
      }
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  const handleSetDefault = async (id, pincode) => {
    try {
      await updateProfileData({ defaultAddressId: id, defaultPincode: pincode });
    } catch (error) {
      console.error("Error setting default address", error);
    }
  };

  return (
    <div className="profile-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="profile-section-title" style={{ marginBottom: 0, border: 'none', padding: 0 }}>Address Book</h2>
        {!showForm && (
          <button className="btn-primary btn-sm" onClick={() => {
            setFormData({ fullName: '', mobile: '', addressLine1: '', addressLine2: '', landmark: '', city: '', state: '', country: 'India', pincode: '' });
            setEditingId(null);
            setShowForm(true);
          }}>
            <Plus size={16} style={{ marginRight: '5px' }} /> Add Address
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSaveAddress} className="address-form" style={{ backgroundColor: 'var(--color-background)', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>{editingId ? 'Edit Address' : 'New Address'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="profile-form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="profile-form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
            </div>
            <div className="profile-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Address Line 1</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} required />
            </div>
            <div className="profile-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Address Line 2</label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} />
            </div>
            <div className="profile-form-group">
              <label>Landmark</label>
              <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} />
            </div>
            <div className="profile-form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
            </div>
            <div className="profile-form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="profile-form-group">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button type="submit" className="btn-primary">Save Address</button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length === 0 && !showForm ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
          <p>No addresses saved yet.</p>
        </div>
      ) : (
        <div className="address-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {addresses.map(addr => (
            <div key={addr.id} className="address-card" style={{ 
              padding: '20px', 
              border: `2px solid ${userProfile?.defaultAddressId === addr.id ? 'var(--color-primary)' : 'var(--color-border)'}`, 
              borderRadius: '8px',
              position: 'relative'
            }}>
              {userProfile?.defaultAddressId === addr.id && (
                <div style={{ position: 'absolute', top: '-10px', right: '20px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={12} fill="white" /> Default
                </div>
              )}
              <h4 style={{ marginBottom: '5px' }}>{addr.fullName} <span style={{ fontWeight: 'normal', color: 'var(--color-text-light)', marginLeft: '10px' }}>{addr.mobile}</span></h4>
              <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem' }}>{addr.city}, {addr.state} {addr.pincode}</p>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => handleEdit(addr)} className="text-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 0 }}>
                  <Edit2 size={16} /> Edit
                </button>
                <span style={{ color: 'var(--color-border)' }}>|</span>
                <button onClick={() => handleDelete(addr.id)} className="text-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 0, color: '#ef4444' }}>
                  <Trash2 size={16} /> Delete
                </button>
                {userProfile?.defaultAddressId !== addr.id && (
                  <>
                    <span style={{ color: 'var(--color-border)' }}>|</span>
                    <button onClick={() => handleSetDefault(addr.id, addr.pincode)} className="text-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 0 }}>
                       Set as Default
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
