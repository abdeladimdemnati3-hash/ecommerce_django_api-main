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
             Cart{cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile" style={{ ...styles.navLink, color: '#fff' }}> {userInfo.name || userInfo.username}</Link>
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
    backgroundColor: '#161b22',
    borderBottom: '1px solid #30363d',
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
    color: '#e6edf3',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: '700',
    letterSpacing: '-0.3px',
  },
  nav: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  navLink: {
    color: '#8b949e',
    textDecoration: 'none',
    fontSize: '0.88rem',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badge: {
    backgroundColor: '#1f6feb',
    color: '#fff',
    borderRadius: '10px',
    padding: '0 6px',
    fontSize: '0.7rem',
    fontWeight: '600',
    minWidth: '18px',
    textAlign: 'center',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #30363d',
    color: '#8b949e',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
};

export default Header;
