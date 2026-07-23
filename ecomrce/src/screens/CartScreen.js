import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/shipping');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * parseFloat(item.price), 0);

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Shopping Cart</h1>
        <p style={styles.empty}>Your cart is empty. <Link to="/" style={styles.link}>Go Shopping</Link></p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>
      <div style={styles.grid}>
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.item}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=No+Image'; }}
              />
              <div style={styles.itemInfo}>
                <Link to={`/product/${item._id}`} style={styles.itemName}>{item.name}</Link>
                <p style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</p>
              </div>
              <div style={styles.itemQty}>Qty: {item.qty}</div>
              <div style={styles.itemTotal}>${(item.qty * parseFloat(item.price)).toFixed(2)}</div>
              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>
            Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)} items)
          </h2>
          <p style={styles.summaryTotal}>${subtotal.toFixed(2)}</p>
          <button style={styles.checkoutBtn} onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
          <button style={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 64px', background: '#0d1117', minHeight: 'calc(100vh - 64px)' },
  heading: { fontSize: '1.2rem', marginBottom: '24px', color: '#e6edf3', fontWeight: '700' },
  empty: { textAlign: 'center', padding: '60px', fontSize: '1rem', color: '#8b949e' },
  link: { color: '#58a6ff' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '28px', alignItems: 'start' },
  item: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '16px 0', borderBottom: '1px solid #21262d',
  },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#21262d', opacity: 0.9 },
  itemInfo: { flex: 1 },
  itemName: { color: '#e6edf3', textDecoration: 'none', fontWeight: '500', fontSize: '0.92rem' },
  itemPrice: { color: '#8b949e', marginTop: '4px', fontSize: '0.82rem' },
  itemQty: { color: '#8b949e', fontSize: '0.88rem', minWidth: '60px' },
  itemTotal: { fontWeight: '700', minWidth: '70px', textAlign: 'right', color: '#58a6ff' },
  removeBtn: {
    background: 'none', border: 'none', color: '#f85149',
    fontSize: '1rem', cursor: 'pointer', padding: '4px 8px',
  },
  summary: {
    border: '1px solid #30363d', borderRadius: '12px',
    padding: '24px', backgroundColor: '#161b22',
  },
  summaryTitle: { fontSize: '0.82rem', marginBottom: '16px', color: '#8b949e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' },
  summaryTotal: { fontSize: '1.6rem', fontWeight: '700', marginBottom: '20px', color: '#e6edf3' },
  checkoutBtn: {
    width: '100%', padding: '13px', backgroundColor: '#238636',
    color: '#fff', border: '1px solid rgba(240,246,252,0.1)', borderRadius: '8px',
    fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', marginBottom: '10px',
  },
  clearBtn: {
    width: '100%', padding: '11px', backgroundColor: 'transparent',
    color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px',
    fontSize: '0.88rem', cursor: 'pointer',
  },
};

export default CartScreen;
