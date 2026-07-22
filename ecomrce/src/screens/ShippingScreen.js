import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ShippingScreen() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
  const [address, setAddress] = useState(saved.address || '');
  const [city, setCity] = useState(saved.city || '');
  const [postalCode, setPostalCode] = useState(saved.postalCode || '');

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode }));
    navigate('/payment');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Address</label>
            <input style={styles.input} value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>City</label>
            <input style={styles.input} value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Postal Code</label>
            <input style={styles.input} value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Enter postal code" required />
          </div>
          <button type="submit" style={styles.button}>Continue</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', padding: '40px 20px' },
  card: { width: '100%', maxWidth: '480px', border: '1px solid #ddd', borderRadius: '8px', padding: '32px', backgroundColor: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  title: { fontSize: '1.6rem', marginBottom: '24px', color: '#333' },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', color: '#555', fontSize: '0.95rem' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '8px' },
};

export default ShippingScreen;
