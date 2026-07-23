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
    backgroundColor: '#343a40',
    padding: '12px 0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: '50%',
    padding: '1px 6px',
    fontSize: '0.75rem',
    marginLeft: '4px',
    fontWeight: 'bold',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #ccc',
    color: '#ccc',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default Header;
