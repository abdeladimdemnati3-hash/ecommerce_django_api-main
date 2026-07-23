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
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={styles.message}>Loading products...</p>;
  if (error) return <p style={{ ...styles.message, color: '#dc2626' }}>{error}</p>;

  return (
    <div>
      <div style={styles.banner}>
        <p style={styles.bannerEyebrow}>New Arrivals 2024</p>
        <h1 style={styles.bannerTitle}>Welcome to ProShop</h1>
        <p style={styles.bannerSub}>Top-rated products, delivered to your door</p>
      </div>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Latest Products</h2>
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
  banner: {
    background: 'linear-gradient(135deg, #1c3557 0%, #2d4a6e 100%)',
    padding: '72px 24px',
    textAlign: 'center',
  },
  bannerEyebrow: {
    color: '#93c5fd',
    fontWeight: '600',
    fontSize: '0.78rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 14px',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: '700',
    margin: '0 0 12px',
    letterSpacing: '-0.5px',
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '1rem',
    margin: 0,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '44px 24px 64px',
  },
  sectionHeader: {
    marginBottom: '24px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '14px',
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '20px',
  },
  message: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '1rem',
    color: '#6b7280',
  },
};

export default HomeScreen;

