import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login/', {
        username,
        password,
      });
      login(data);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Login failed. Check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={styles.footer}>
          New customer? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '88vh',
    padding: '20px',
    backgroundColor: '#0d0d0d',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '40px 36px',
    backgroundColor: '#161616',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
  },
  title: { fontSize: '1.7rem', marginBottom: '28px', color: '#fff', fontWeight: '700', letterSpacing: '1px' },
  error: {
    backgroundColor: 'rgba(233,69,96,0.12)',
    color: '#e94560',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '0.9rem',
    border: '1px solid rgba(233,69,96,0.3)',
  },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', color: '#888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    backgroundColor: '#1e1e1e',
    color: '#e8e8e8',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #e94560, #c73652)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    letterSpacing: '0.5px',
  },
  footer: { marginTop: '24px', textAlign: 'center', color: '#555', fontSize: '0.9rem' },
  link: { color: '#e94560', textDecoration: 'none', fontWeight: '500' },
};

export default LoginScreen;
