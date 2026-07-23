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
    <div style={styles.container}>
      <h1 style={styles.heading}>Latest Products</h1>
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
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '24px',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px',
  },
  message: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '1.1rem',
    color: '#666',
  },
};

export default HomeScreen;

