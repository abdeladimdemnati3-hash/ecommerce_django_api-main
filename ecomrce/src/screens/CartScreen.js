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
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', backgroundColor: '#0d0d0d', minHeight: '88vh' },
  heading: { fontSize: '1.5rem', marginBottom: '24px', color: '#fff', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' },
  empty: { textAlign: 'center', padding: '60px', fontSize: '1rem', color: '#555' },
  link: { color: '#e94560' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' },
  item: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '16px 0', borderBottom: '1px solid #1e1e1e',
  },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#1a1a1a' },
  itemInfo: { flex: 1 },
  itemName: { color: '#e8e8e8', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' },
  itemPrice: { color: '#555', marginTop: '4px', fontSize: '0.88rem' },
  itemQty: { color: '#888', fontSize: '0.9rem', minWidth: '60px' },
  itemTotal: { fontWeight: '700', minWidth: '70px', textAlign: 'right', color: '#fff' },
  removeBtn: {
    background: 'none', border: 'none', color: '#e94560',
    fontSize: '1rem', cursor: 'pointer', padding: '4px 8px',
  },
  summary: {
    border: '1px solid #2a2a2a', borderRadius: '10px',
    padding: '24px', backgroundColor: '#161616',
  },
  summaryTitle: { fontSize: '1rem', marginBottom: '16px', color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase' },
  summaryTotal: { fontSize: '1.6rem', fontWeight: '700', marginBottom: '20px', color: '#fff' },
  checkoutBtn: {
    width: '100%', padding: '13px', background: 'linear-gradient(135deg, #e94560, #c73652)',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', marginBottom: '10px',
  },
  clearBtn: {
    width: '100%', padding: '11px', backgroundColor: 'transparent',
    color: '#555', border: '1px solid #2a2a2a', borderRadius: '8px',
    fontSize: '0.88rem', cursor: 'pointer',
  },
};

export default CartScreen;
