import { Link } from 'react-router-dom';

const BookCard = ({ title, author, coverId }) => {
  const bookId = title.replace(/\s+/g, '-'); // crude unique ID from title

  return (
    <Link to={`/details/${bookId}`} className="book-card">
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h3>{title}</h3>
        <p><em>{author}</em></p>
        {coverId ? (
          <img src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} alt={title} />
        ) : (
          <p>No cover</p>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
