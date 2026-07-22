import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function ProfileScreen() {
  const { userInfo, login, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userInfo) { navigate('/login'); return; }
    setUsername(userInfo.username || '');
    setEmail(userInfo.email || '');

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/orders/myorders/', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      const { data } = await axios.put(
        'http://localhost:8000/api/users/profile/',
        { username, email, password },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      login(data);
      setPassword('');
      setConfirmPassword('');
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  if (!userInfo) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Account</h1>
      <div style={styles.grid}>

        {/* Profile Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Profile Information</h2>
          {success && <p style={styles.success}>{success}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Username</label>
              <input style={styles.input} value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input type="email" style={styles.input} value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>New Password <span style={styles.optional}>(leave blank to keep current)</span></label>
              <input type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Confirm New Password</label>
              <input type="password" style={styles.input} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
            </div>
            <button type="submit" style={styles.btn} disabled={saving}>
              {saving ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
          <button style={styles.logoutBtn} onClick={() => { logout(); navigate('/'); }}>
            Logout
          </button>
        </div>

        {/* Order History */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Order History</h2>
          {loadingOrders ? (
            <p style={styles.muted}>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p style={styles.muted}>No orders yet. <Link to="/" style={styles.link}>Start shopping</Link></p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {['ID', 'Date', 'Total', 'Paid', 'Delivered'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td style={styles.td}>#{order._id}</td>
                    <td style={styles.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={styles.td}>${parseFloat(order.totalPrice).toFixed(2)}</td>
                    <td style={styles.td}>
                      <span style={{ color: order.isPaid ? '#27ae60' : '#e74c3c' }}>
                        {order.isPaid ? '✓' : '✗'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: order.isDelivered ? '#27ae60' : '#e74c3c' }}>
                        {order.isDelivered ? '✓' : '✗'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '20px' },
  heading: { fontSize: '1.8rem', marginBottom: '24px', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: '340px 1fr', gap: '30px', alignItems: 'start' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: '1.2rem', marginBottom: '20px', color: '#333' },
  field: { marginBottom: '14px' },
  label: { display: 'block', marginBottom: '5px', color: '#555', fontSize: '0.9rem' },
  optional: { color: '#aaa', fontSize: '0.8rem' },
  input: { width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.95rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '11px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '4px' },
  logoutBtn: { width: '100%', padding: '10px', backgroundColor: '#fff', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '6px', fontSize: '0.95rem', cursor: 'pointer', marginTop: '10px' },
  success: { backgroundColor: '#eafaf1', color: '#27ae60', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.9rem' },
  error: { backgroundColor: '#fdecea', color: '#c0392b', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.9rem' },
  muted: { color: '#888', fontSize: '0.95rem' },
  link: { color: '#007bff' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid #eee', color: '#555', fontWeight: '600' },
  td: { padding: '10px 8px', borderBottom: '1px solid #f0f0f0', color: '#444' },
};

export default ProfileScreen;
