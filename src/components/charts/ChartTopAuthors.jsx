import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ChartTopAuthors = ({ books }) => {
  const authorCount = {};

  books.forEach(book => {
    const author = book.author_name?.[0];
    if (author) {
      authorCount[author] = (authorCount[author] || 0) + 1;
    }
  });

  const data = Object.entries(authorCount)
    .map(([author, count]) => ({ author, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  if (data.length === 0) {
    return (
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h3 style={{ color: '#c71585' }}>👤 Top Authors</h3>
        <p style={{ color: '#4b2c46' }}>No author data found for this search.</p>
      </div>
    );
  }

  return (
    <div style={{
      width: '80%',
      maxWidth: '960px',
      margin: '1rem auto',
      backgroundColor: '#fffafc',
      border: '2px dashed #d8bfd8',
      borderRadius: '12px',
      //padding: '1rem',
      boxShadow: '0 0 8px rgba(200, 100, 150, 0.08)'
    }}>
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.5rem',
        color: '#c71585',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>👤 Top Authors</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fill: '#4b2c46', fontSize: 14 }} />
          <YAxis
            dataKey="author"
            type="category"
            tick={{ fill: '#4b2c46', fontSize: 14 }}
            width={150}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff0f5', borderColor: '#d8bfd8' }}
            labelStyle={{ color: '#c71585' }}
            itemStyle={{ color: '#4b2c46' }}
          />
          <Bar dataKey="count" fill="#c71585" barSize={28} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTopAuthors;



