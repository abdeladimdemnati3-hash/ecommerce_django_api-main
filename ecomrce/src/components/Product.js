import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:8000${product.image}`}
          alt={product.name}
          style={styles.image}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
        />
      </Link>
      <div style={styles.body}>
        <Link to={`/product/${product._id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{product.name}</h3>
        </Link>
        <div style={styles.rating}>
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          <span style={styles.reviews}> ({product.numReviews} reviews)</span>
        </div>
        <p style={styles.price}>${product.price}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
  },
  body: {
    padding: '12px',
  },
  titleLink: {
    textDecoration: 'none',
    color: '#333',
  },
  title: {
    fontSize: '1rem',
    margin: '0 0 8px 0',
  },
  rating: {
    color: '#f0ad4e',
    fontSize: '1rem',
    marginBottom: '8px',
  },
  reviews: {
    color: '#888',
    fontSize: '0.85rem',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
};

export default Product;
