import React from 'react';
import { useParams, Link } from 'react-router-dom';

function OrderScreen() {
  const { id } = useParams();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h2 style={styles.title}>Order Placed!</h2>
        <p style={styles.sub}>Thank you. Your order <strong>#{id}</strong> has been received.</p>
        <Link to="/" style={styles.btn}>Continue Shopping</Link>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '20px' },
  card: { textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '40px', maxWidth: '420px', width: '100%', backgroundColor: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  icon: { fontSize: '3rem', color: '#27ae60', marginBottom: '12px' },
  title: { fontSize: '1.8rem', color: '#333', marginBottom: '12px' },
  sub: { color: '#555', marginBottom: '24px', lineHeight: 1.6 },
  btn: { display: 'inline-block', padding: '12px 28px', backgroundColor: '#343a40', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '1rem' },
};

export default OrderScreen;
