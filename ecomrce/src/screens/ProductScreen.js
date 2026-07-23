import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={{ ...styles.message, color: '#dc2626' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>← Back to Products</Link>
      <div style={styles.grid}>
        <div style={styles.imageBox}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
            onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
          />
        </div>
        <div style={styles.info}>
          <h2 style={styles.name}>{product.name}</h2>
          <div style={styles.divider}></div>
          <div style={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span style={styles.reviews}>{product.numReviews} reviews</span>
          </div>
          <div style={styles.divider}></div>
          <p style={styles.priceInfo}>Price: <strong style={styles.priceValue}>${product.price}</strong></p>
          <div style={styles.divider}></div>
          <p style={styles.descLabel}>Description</p>
          <p style={styles.description}>{product.description}</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardRow}>
            <span>Price</span><strong>${product.price}</strong>
          </div>
          <div style={styles.cardRow}>
            <span>Status</span>
            <span style={{ color: product.countInStock > 0 ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          {product.countInStock > 0 && (
            <div style={styles.cardRow}>
              <span>Qty</span>
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={styles.select}>
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}
          <button
            style={{ ...styles.button, ...(product.countInStock === 0 ? styles.buttonDisabled : {}) }}
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '28px 24px 64px', background: '#0d1117', minHeight: 'calc(100vh - 64px)' },
  back: { display: 'inline-block', marginBottom: '24px', color: '#58a6ff', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '500' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: '32px', alignItems: 'start' },
  imageBox: { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', borderRadius: '6px', objectFit: 'contain', maxHeight: '380px', opacity: 0.95 },
  info: { paddingTop: '4px' },
  name: { fontSize: '1.45rem', margin: '0 0 4px', color: '#e6edf3', fontWeight: '700', lineHeight: 1.3 },
  divider: { height: '1px', background: '#21262d', margin: '14px 0' },
  rating: { color: '#e3b341', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' },
  reviews: { color: '#8b949e', fontSize: '0.85rem', fontWeight: '400' },
  priceInfo: { margin: 0, fontSize: '1rem', color: '#8b949e' },
  priceValue: { fontSize: '1.55rem', color: '#58a6ff', fontWeight: '700' },
  descLabel: { margin: '0 0 6px', fontSize: '0.78rem', fontWeight: '600', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px' },
  description: { color: '#8b949e', lineHeight: 1.75, fontSize: '0.93rem', margin: 0 },
  card: { border: '1px solid #30363d', borderRadius: '12px', padding: '24px', backgroundColor: '#161b22' },
  cardRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #21262d', fontSize: '0.92rem', color: '#8b949e' },
  select: { padding: '5px 10px', borderRadius: '6px', border: '1px solid #30363d', fontSize: '0.9rem', color: '#e6edf3', backgroundColor: '#21262d' },
  button: { width: '100%', padding: '13px', marginTop: '18px', backgroundColor: '#238636', color: '#fff', border: '1px solid rgba(240,246,252,0.1)', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' },
  buttonDisabled: { backgroundColor: '#21262d', color: '#8b949e', border: '1px solid #30363d', cursor: 'not-allowed' },
  message: { textAlign: 'center', padding: '60px', fontSize: '1rem', color: '#8b949e' },
};

export default ProductScreen;

