import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <div style={styles.card}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12), 0 14px 36px rgba(0,0,0,0.09)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.06)'; }}
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
    border: 'none',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    display: 'block',
    overflow: 'hidden',
    height: '210px',
    background: '#f5f7fa',
    position: 'relative',
  },
  imageOverlay: { display: 'none' },
  image: {
    width: '100%',
    height: '210px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  body: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  titleLink: {
    textDecoration: 'none',
    color: '#1a1a2e',
  },
  title: {
    fontSize: '0.92rem',
    margin: 0,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 1.4,
  },
  rating: {
    color: '#f59e0b',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  reviews: {
    color: '#9ca3af',
    fontSize: '0.76rem',
    fontWeight: '400',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6px',
    paddingTop: '10px',
    borderTop: '1px solid #f3f4f6',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1c3557',
  },
  viewBtn: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#3a86ff',
    textDecoration: 'none',
  },
};

export default Product;
