import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BookDetailCard = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const searchTitle = id.replace(/-/g, ' ');
    const fetchData = async () => {
      const response = await fetch(`https://openlibrary.org/search.json?title=${searchTitle}`);
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        setBook(data.docs[0]);
      }
    };
    fetchData();
  }, [id]);

  if (!book) return <p style={{ padding: '2rem' }}>Loading book details...</p>;

  const {
    title,
    author_name,
    first_publish_year,
    subject,
    cover_i,
    number_of_pages_median,
  } = book;

  return (
    <div style={{ 
      padding: '2rem', 
      color: '#000', // 👈 make all text black
      maxWidth: '1000px',
      margin: '0 auto'
      }}>
      <h2>{title}</h2>
      <p><strong>Author:</strong> {author_name?.[0] || 'Unknown'}</p>
      <p><strong>First Published:</strong> {first_publish_year || 'N/A'}</p>
      <p><strong>Pages:</strong> {number_of_pages_median || 'N/A'}</p>
      <p><strong>Subjects:</strong> {subject?.slice(0, 5).join(', ') || 'N/A'}</p>
      {cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
          alt={title}
          style={{ marginTop: '1rem', maxWidth: '200px' }}
        />
      )}
    </div>
  );
};

export default BookDetailCard;
