import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <div style={styles.card}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(15,52,96,0.18)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,52,96,0.08)'; }}
    >
      <Link to={`/product/${product._id}`} style={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
          onError={(e) => { e.target.src = 'https://placehold.co/300x220?text=No+Image'; }}
        />
        <div style={styles.imageOverlay}></div>
      </Link>
      <div style={styles.body}>
        <Link to={`/product/${product._id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{product.name}</h3>
        </Link>
        <div style={styles.rating}>
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          <span style={styles.reviews}>{product.numReviews} reviews</span>
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price}</span>
          <Link to={`/product/${product._id}`} style={styles.viewBtn}>View →</Link>
        </div>
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
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    display: 'block',
    overflow: 'hidden',
    height: '200px',
    background: '#f5f5f5',
  },
  imageOverlay: { display: 'none' },
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
    fontWeight: '500',
    color: '#333',
  },
  rating: {
    color: '#f0ad4e',
    fontSize: '1rem',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  reviews: {
    color: '#888',
    fontSize: '0.85rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  viewBtn: {
    fontSize: '0.82rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Product;
