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
        <Link to="/" style={styles.brand}>
          <span style={styles.brandIcon}>⚡</span>ProShop
        </Link>
        <nav style={styles.nav}>
          <Link to="/cart" style={styles.navLink}>
            <span style={styles.navIcon}>🛒</span>
            Cart
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile" style={styles.navLink}>
                <span style={styles.navIcon}>👤</span>
                {userInfo.name || userInfo.username}
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={styles.navLink}>
              <span style={styles.navIcon}>👤</span>Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
    padding: '0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
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
    height: '68px',
  },
  brand: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.6rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandIcon: {
    fontSize: '1.4rem',
  },
  nav: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: '1rem',
  },
  navLink: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontSize: '0.92rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '8px',
    transition: 'background 0.2s, color 0.2s',
    background: 'transparent',
  },
  badge: {
    backgroundColor: '#e94560',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: '700',
    marginLeft: '2px',
  },
  logoutBtn: {
    background: 'rgba(233,69,96,0.15)',
    border: '1px solid rgba(233,69,96,0.5)',
    color: '#e94560',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
};

export default Header;
