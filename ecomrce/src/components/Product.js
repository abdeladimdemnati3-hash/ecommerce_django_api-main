import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <div style={styles.card}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#58a6ff'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#30363d'; }}
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
    border: '1px solid #30363d',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'transform 0.22s ease, border-color 0.2s ease',
    backgroundColor: '#161b22',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    display: 'block',
    overflow: 'hidden',
    height: '210px',
    background: '#21262d',
    position: 'relative',
  },
  imageOverlay: { display: 'none' },
  image: {
    width: '100%',
    height: '210px',
    objectFit: 'cover',
    display: 'block',
    opacity: '0.92',
    transition: 'opacity 0.2s, transform 0.3s ease',
  },
  body: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  titleLink: {
    textDecoration: 'none',
    color: '#e6edf3',
  },
  title: {
    fontSize: '0.92rem',
    margin: 0,
    fontWeight: '600',
    color: '#e6edf3',
    lineHeight: 1.4,
  },
  rating: {
    color: '#e3b341',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  reviews: {
    color: '#8b949e',
    fontSize: '0.76rem',
    fontWeight: '400',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6px',
    paddingTop: '10px',
    borderTop: '1px solid #21262d',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#58a6ff',
  },
  viewBtn: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#8b949e',
    textDecoration: 'none',
  },
};

export default Product;
