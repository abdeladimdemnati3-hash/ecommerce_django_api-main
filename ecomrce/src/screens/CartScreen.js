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
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  heading: { fontSize: '1.8rem', marginBottom: '20px', color: '#333' },
  empty: { textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#666' },
  link: { color: '#007bff' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: '30px', alignItems: 'start' },
  item: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '16px 0', borderBottom: '1px solid #eee',
  },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' },
  itemInfo: { flex: 1 },
  itemName: { color: '#333', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' },
  itemPrice: { color: '#888', marginTop: '4px', fontSize: '0.9rem' },
  itemQty: { color: '#555', fontSize: '0.95rem', minWidth: '60px' },
  itemTotal: { fontWeight: 'bold', minWidth: '70px', textAlign: 'right' },
  removeBtn: {
    background: 'none', border: 'none', color: '#dc3545',
    fontSize: '1.1rem', cursor: 'pointer', padding: '4px 8px',
  },
  summary: {
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '20px', backgroundColor: '#fff',
  },
  summaryTitle: { fontSize: '1.1rem', marginBottom: '12px', color: '#333' },
  summaryTotal: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#333' },
  checkoutBtn: {
    width: '100%', padding: '12px', backgroundColor: '#343a40',
    color: '#fff', border: 'none', borderRadius: '6px',
    fontSize: '1rem', cursor: 'pointer', marginBottom: '8px',
  },
  clearBtn: {
    width: '100%', padding: '10px', backgroundColor: '#fff',
    color: '#dc3545', border: '1px solid #dc3545', borderRadius: '6px',
    fontSize: '0.95rem', cursor: 'pointer',
  },
};

export default CartScreen;
