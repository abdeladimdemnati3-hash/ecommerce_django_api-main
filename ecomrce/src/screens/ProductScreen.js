import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
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
  if (error) return <p style={{ ...styles.message, color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>← Back</Link>
      <div style={styles.grid}>
        <img
          src={`http://localhost:8000${product.image}`}
          alt={product.name}
          style={styles.image}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
        />
        <div style={styles.info}>
          <h2 style={styles.name}>{product.name}</h2>
          <div style={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span style={styles.reviews}> {product.numReviews} reviews</span>
          </div>
          <p style={styles.price}>Price: <strong>${product.price}</strong></p>
          <p style={styles.description}>{product.description}</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardRow}>
            <span>Price:</span><span>${product.price}</span>
          </div>
          <div style={styles.cardRow}>
            <span>Status:</span>
            <span style={{ color: product.countInStock > 0 ? 'green' : 'red' }}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          {product.countInStock > 0 && (
            <div style={styles.cardRow}>
              <span>Qty:</span>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={styles.select}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}
          <button
            style={{
              ...styles.button,
              ...(product.countInStock === 0 ? styles.buttonDisabled : {}),
            }}
            disabled={product.countInStock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  back: { display: 'inline-block', marginBottom: '20px', color: '#007bff', textDecoration: 'none', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: '30px', alignItems: 'start' },
  image: { width: '100%', borderRadius: '8px', objectFit: 'cover' },
  info: {},
  name: { fontSize: '1.6rem', marginBottom: '12px', color: '#333' },
  rating: { color: '#f0ad4e', fontSize: '1.1rem', marginBottom: '12px' },
  reviews: { color: '#888', fontSize: '0.9rem' },
  price: { fontSize: '1.2rem', color: '#555', marginBottom: '12px' },
  description: { color: '#666', lineHeight: 1.6 },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' },
  cardRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '1rem' },
  select: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '12px', marginTop: '16px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
  buttonDisabled: { backgroundColor: '#aaa', cursor: 'not-allowed' },
  message: { textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#666' },
};

export default ProductScreen;
