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
    minHeight: '80vh',
    padding: '20px',
    background: '#0d1117',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #30363d',
    borderRadius: '12px',
    padding: '40px',
    backgroundColor: '#161b22',
  },
  title: { fontSize: '1.5rem', marginBottom: '28px', color: '#e6edf3', fontWeight: '700' },
  error: {
    backgroundColor: 'rgba(248,81,73,0.1)',
    color: '#f85149',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '0.88rem',
    border: '1px solid rgba(248,81,73,0.3)',
  },
  field: { marginBottom: '18px' },
  label: { display: 'block', marginBottom: '6px', color: '#8b949e', fontSize: '0.85rem', fontWeight: '500', letterSpacing: 'normal', textTransform: 'none' },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #30363d',
    borderRadius: '8px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    backgroundColor: '#0d1117',
    color: '#e6edf3',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#238636',
    color: '#fff',
    border: '1px solid rgba(240,246,252,0.1)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  footer: { marginTop: '22px', textAlign: 'center', color: '#8b949e', fontSize: '0.88rem' },
  link: { color: '#58a6ff', textDecoration: 'none', fontWeight: '500', fontWeight: 'normal' },
};

export default LoginScreen;
