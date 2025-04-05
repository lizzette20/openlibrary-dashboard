function BookCard({ title, author, coverId }) {
    const imageUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://via.placeholder.com/100x150?text=No+Cover';
  
    return (
      <div className="book-card">
        <img src={imageUrl} alt={`Cover for ${title}`} className="cover" />
        <div className="info">
          <h3>{title}</h3>
          <p>{author}</p>
        </div>
      </div>
    );
  }
  
  export default BookCard;
  