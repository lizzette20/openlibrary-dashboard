import { useState, useEffect } from 'react';
import './App.css';
import BookCard from './components/BookCard';
import ChartYearDist from './components/charts/ChartYearDist';
import ChartTopAuthors from './components/charts/ChartTopAuthors';


function App() {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [minYear, setMinYear] = useState('1950');
  const [maxYear, setMaxYear] = useState('2025');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchInput.length < 3) return;
      setLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchInput}`);
        const data = await response.json();
        const results = data.docs.slice(0, 20);

        setBooks(results);
        setFilteredBooks(results);

        console.log("📦 First book sample:", results[0]);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchInput]);

  const totalBooks = filteredBooks.length;

  const avgPublishYear = Math.round(
    filteredBooks
      .filter(book => book.first_publish_year)
      .reduce((sum, book) => sum + book.first_publish_year, 0) /
      (filteredBooks.filter(book => book.first_publish_year).length || 1)
  );

  const subjectFrequency = {};
  books.forEach(book => {
    const subjects = book.subject || [];
    subjects.forEach(sub => {
      subjectFrequency[sub] = (subjectFrequency[sub] || 0) + 1;
    });
  });

  const mostCommonSubject =
    Object.keys(subjectFrequency).length > 0
      ? Object.entries(subjectFrequency).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  const allSubjects = Array.from(
    new Set(
      books.flatMap(book => book.subject || [])
    )
  )
    .filter(subject => subject && subject.length < 40)
    .slice(0, 20);

  return (
    <div className="App">
      <div className="dashboard-container">
        <h1>The Reading Room 💌</h1>

        <div style={{ position: 'relative', display: 'inline-block', width: '80%' }}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
          />
          {loading && <div className="input-spinner">...</div>}
        </div>

        <div className="summary-stats">
          <p><strong>Total Books:</strong> {totalBooks}</p>
          <p><strong>Average Publish Year:</strong> {isNaN(avgPublishYear) ? 'N/A' : avgPublishYear}</p>
          <p><strong>Most Common Subject:</strong> {mostCommonSubject || '📚 Not enough subject data'}</p>
        </div>

        {allSubjects.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Filter by Subject: </strong></label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="All">All</option>
              {allSubjects.map((subject, i) => (
                <option key={i} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label><strong>Filter by Year Range:</strong></label>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <input
              type="number"
              placeholder="From"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            />
            <input
              type="number"
              placeholder="To"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </div>
        </div>

        <ChartYearDist books={filteredBooks} />
        <ChartTopAuthors books={filteredBooks} />



        <div className="book-list">
          {filteredBooks.length === 0 && searchInput.length >= 3 && (
            <p style={{ marginTop: '2rem', color: '#999' }}>
              🫣 No results found. Try another title or author!
            </p>
          )}

          {filteredBooks
            .filter(book => {
              const subjects = book.subject || [];
              const matchesSubject = selectedSubject === 'All' || subjects.includes(selectedSubject);
              const year = book.first_publish_year || 0;
              const matchesYear = year >= parseInt(minYear) && year <= parseInt(maxYear);
              return matchesSubject && matchesYear;
            })
            .map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                author={book.author_name?.[0] || 'Unknown'}
                coverId={book.cover_i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;




