import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { cartCount } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>ProShop</Link>
        <nav style={styles.nav}>
          <Link to="/cart" style={styles.navLink}>
            🛒 Cart{cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile" style={{ ...styles.navLink, color: '#fff' }}>👤 {userInfo.name || userInfo.username}</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={styles.navLink}>👤 Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1c3557',
    padding: '0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  brand: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.35rem',
    fontWeight: '700',
    letterSpacing: '-0.3px',
  },
  nav: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  navLink: {
    color: 'rgba(255,255,255,0.82)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '7px 14px',
    borderRadius: '6px',
  },
  badge: {
    backgroundColor: '#3a86ff',
    color: '#fff',
    borderRadius: '10px',
    padding: '1px 7px',
    fontSize: '0.72rem',
    marginLeft: '4px',
    fontWeight: '600',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.82)',
    borderRadius: '6px',
    padding: '7px 14px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

export default Header;
