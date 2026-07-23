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

  if (loading) return <div style={styles.page}><p style={styles.message}>Loading...</p></div>;
  if (error) return <div style={styles.page}><p style={{ ...styles.message, color: '#e94560' }}>{error}</p></div>;

  const stars = Math.round(product.rating);

  return (
    <div style={styles.page}>
      {/* Go Back */}
      <div style={styles.backBar}>
        <Link to="/" style={styles.backLink}>← Go Back</Link>
      </div>

      {/* Product Layout */}
      <div style={styles.layout}>
        {/* Image Panel */}
        <div style={styles.imagePanel}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
            onError={(e) => { e.target.src = 'https://placehold.co/600x500?text=No+Image'; }}
          />
        </div>

        {/* Info Panel */}
        <div style={styles.infoPanel}>
          <h1 style={styles.name}>{product.name.toUpperCase()}</h1>

          <div style={styles.ratingRow}>
            <span style={styles.stars}>
              {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
            </span>
            <span style={styles.reviewCount}>{product.numReviews} reviews</span>
          </div>

          <p style={styles.priceLabel}>Price: <span style={styles.priceValue}>${product.price}</span></p>

          <div style={styles.divider}></div>

          <p style={styles.descLabel}>Description:</p>
          <p style={styles.description}>{product.description}</p>

          <div style={styles.divider}></div>

          {/* Buy Box */}
          <div style={styles.buyBox}>
            <div style={styles.buyRow}>
              <span style={styles.buyLabel}>Price</span>
              <span style={styles.buyValue}>${product.price}</span>
            </div>
            <div style={styles.buyRow}>
              <span style={styles.buyLabel}>Status</span>
              <span style={{ color: product.countInStock > 0 ? '#4ade80' : '#e94560', fontWeight: '600' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {product.countInStock > 0 && (
              <div style={styles.buyRow}>
                <span style={styles.buyLabel}>Qty</span>
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
              style={product.countInStock === 0 ? styles.btnDisabled : styles.btn}
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#0d0d0d',
    minHeight: '100vh',
    color: '#e8e8e8',
  },
  backBar: {
    padding: '28px 48px 12px',
  },
  backLink: {
    color: '#888',
    fontSize: '0.78rem',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: 'calc(100vh - 120px)',
  },
  imagePanel: {
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    minHeight: '500px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '520px',
    objectFit: 'contain',
    borderRadius: '4px',
  },
  infoPanel: {
    padding: '60px 56px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#0d0d0d',
  },
  name: {
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '2px',
    lineHeight: 1.25,
    margin: '0 0 24px',
    textTransform: 'uppercase',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  stars: {
    color: '#f0a500',
    fontSize: '1.15rem',
    letterSpacing: '2px',
  },
  reviewCount: {
    color: '#888',
    fontSize: '0.88rem',
  },
  priceLabel: {
    color: '#aaa',
    fontSize: '1rem',
    margin: '0 0 20px',
  },
  priceValue: {
    color: '#fff',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  divider: {
    height: '1px',
    backgroundColor: '#2a2a2a',
    margin: '20px 0',
  },
  descLabel: {
    color: '#888',
    fontSize: '0.82rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 10px',
  },
  description: {
    color: '#ccc',
    lineHeight: 1.8,
    fontSize: '0.95rem',
    margin: 0,
  },
  buyBox: {
    marginTop: '8px',
    backgroundColor: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '20px 24px',
  },
  buyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #222',
    fontSize: '0.95rem',
  },
  buyLabel: {
    color: '#888',
  },
  buyValue: {
    color: '#fff',
    fontWeight: '600',
  },
  select: {
    backgroundColor: '#252525',
    color: '#e8e8e8',
    border: '1px solid #3a3a3a',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  btn: {
    width: '100%',
    marginTop: '16px',
    padding: '14px',
    background: 'linear-gradient(135deg, #e94560, #c73652)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  btnDisabled: {
    width: '100%',
    marginTop: '16px',
    padding: '14px',
    background: '#2a2a2a',
    color: '#555',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'not-allowed',
  },
  message: {
    textAlign: 'center',
    padding: '80px',
    fontSize: '1rem',
    color: '#888',
  },
};

export default ProductScreen;
