import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function PlaceOrderScreen() {
  const { cartItems, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shipping = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
  const paymentMethod = localStorage.getItem('paymentMethod') || 'PayPal';

  if (!userInfo) { navigate('/login'); return null; }
  if (!shipping.address) { navigate('/shipping'); return null; }

  const itemsPrice = cartItems.reduce((a, i) => a + i.qty * parseFloat(i.price), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = parseFloat((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const placeOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/orders/',
        {
          orderItems: cartItems,
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice: itemsPrice.toFixed(2),
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      clearCart();
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Place Order</h1>
      <div style={styles.grid}>
        <div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Shipping</h3>
            <p>{shipping.address}, {shipping.city} {shipping.postalCode}</p>
            <Link to="/shipping" style={styles.editLink}>Edit</Link>
          </div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>
            <p>{paymentMethod}</p>
            <Link to="/payment" style={styles.editLink}>Edit</Link>
          </div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Order Items</h3>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.item}>
                <img src={item.image} alt={item.name} style={styles.itemImg}
                  onError={e => { e.target.src = 'https://placehold.co/50x50?text=N/A'; }} />
                <Link to={`/product/${item._id}`} style={styles.itemName}>{item.name}</Link>
                <span style={styles.itemCalc}>{item.qty} × ${parseFloat(item.price).toFixed(2)} = ${(item.qty * parseFloat(item.price)).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.summary}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          {[
            ['Items', `$${itemsPrice.toFixed(2)}`],
            ['Shipping', shippingPrice === 0 ? 'Free' : `$${shippingPrice}`],
            ['Tax (15%)', `$${taxPrice}`],
            ['Total', `$${totalPrice}`],
          ].map(([label, val]) => (
            <div key={label} style={styles.row}>
              <span>{label}</span><strong>{val}</strong>
            </div>
          ))}
          {error && <p style={styles.error}>{error}</p>}
          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={placeOrder}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '20px' },
  heading: { fontSize: '1.8rem', marginBottom: '24px', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px', alignItems: 'start' },
  section: { border: '1px solid #eee', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
  sectionTitle: { fontSize: '1.1rem', marginBottom: '10px', color: '#333' },
  editLink: { color: '#007bff', fontSize: '0.85rem', textDecoration: 'none' },
  item: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  itemImg: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' },
  itemName: { flex: 1, color: '#333', textDecoration: 'none', fontSize: '0.95rem' },
  itemCalc: { color: '#555', fontSize: '0.9rem', whiteSpace: 'nowrap' },
  summary: { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '1rem' },
  error: { color: '#c0392b', backgroundColor: '#fdecea', padding: '10px', borderRadius: '6px', marginTop: '12px', fontSize: '0.9rem' },
  btn: { width: '100%', padding: '12px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '16px' },
};

export default PlaceOrderScreen;
