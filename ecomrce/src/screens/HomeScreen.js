import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products/');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={styles.message}>Loading products...</p>;
  if (error) return <p style={{ ...styles.message, color: '#e94560' }}>{error}</p>;

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.heroSub}>New Collection 2024</p>
          <h1 style={styles.heroTitle}>Discover Premium<br />Products</h1>
          <p style={styles.heroDesc}>Top-rated gadgets, accessories and more — curated just for you.</p>
          <a href="#products" style={styles.heroBtn}>Shop Now →</a>
        </div>
      </div>

      {/* Products Grid */}
      <div id="products" style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.heading}>Latest Products</h2>
          <div style={styles.headingLine}></div>
        </div>
        {products.length === 0 ? (
          <p style={styles.message}>No products found.</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f3460 0%, #16213e 50%, #0d0d0d 100%)',
    padding: '100px 24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid #1e1e1e',
  },
  heroInner: {
    maxWidth: '700px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  heroSub: {
    color: '#e94560',
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: '700',
    lineHeight: 1.2,
    margin: '0 0 20px',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1.05rem',
    margin: '0 0 32px',
    lineHeight: 1.6,
  },
  heroBtn: {
    display: 'inline-block',
    backgroundColor: '#e94560',
    color: '#fff',
    padding: '14px 36px',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    boxShadow: '0 8px 24px rgba(233,69,96,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '56px 24px 72px',
    backgroundColor: '#0d0d0d',
  },
  sectionHeader: {
    marginBottom: '36px',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  headingLine: {
    width: '48px',
    height: '3px',
    background: 'linear-gradient(90deg, #e94560, #0f3460)',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
  },
  message: {
    textAlign: 'center',
    padding: '80px',
    fontSize: '1rem',
    color: '#555',
  },
};

export default HomeScreen;

