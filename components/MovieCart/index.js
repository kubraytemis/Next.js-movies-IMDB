import styles from './MovieCart.module.css';

const MovieCart = ({ imgSrc, title, description, id, onClick }) => {
  return (
    <div className={styles['movie-cart']}>
      <img src={imgSrc} onClick={onClick} />
      <h3>{title}</h3>
      <span>
        {description}-{id}
      </span>
    </div>
  );
};

export default MovieCart;
