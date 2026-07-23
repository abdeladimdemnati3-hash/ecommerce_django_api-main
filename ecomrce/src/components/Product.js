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
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    backgroundColor: '#161616',
    border: '1px solid #222',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    height: '220px',
    background: '#1a1a1a',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))',
    pointerEvents: 'none',
  },
  image: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  body: {
    padding: '16px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  titleLink: {
    textDecoration: 'none',
    color: '#e8e8e8',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    margin: 0,
    lineHeight: 1.4,
    color: '#e8e8e8',
    letterSpacing: '0.3px',
  },
  rating: {
    color: '#f0a500',
    fontSize: '0.92rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  reviews: {
    color: '#555',
    fontSize: '0.76rem',
    fontWeight: '400',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  },
  price: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  viewBtn: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#e94560',
    textDecoration: 'none',
    padding: '4px 12px',
    border: '1px solid rgba(233,69,96,0.4)',
    borderRadius: '20px',
    transition: 'background 0.2s',
  },
};

export default Product;


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
