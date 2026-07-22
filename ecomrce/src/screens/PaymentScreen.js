import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const METHODS = ['PayPal', 'Credit Card', 'Cash on Delivery'];

function PaymentScreen() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState(localStorage.getItem('paymentMethod') || 'PayPal');

  if (!userInfo) { navigate('/login'); return null; }
  if (!localStorage.getItem('shippingAddress')) { navigate('/shipping'); return null; }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', method);
    navigate('/placeorder');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Payment Method</h2>
        <form onSubmit={handleSubmit}>
          {METHODS.map((m) => (
            <label key={m} style={styles.option}>
              <input
                type="radio"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                style={{ marginRight: '10px' }}
              />
              {m}
            </label>
          ))}
          <button type="submit" style={styles.button}>Continue</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', padding: '40px 20px' },
  card: { width: '100%', maxWidth: '480px', border: '1px solid #ddd', borderRadius: '8px', padding: '32px', backgroundColor: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  title: { fontSize: '1.6rem', marginBottom: '24px', color: '#333' },
  option: { display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '10px', cursor: 'pointer', fontSize: '1rem' },
  button: { width: '100%', padding: '12px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '16px' },
};

export default PaymentScreen;
