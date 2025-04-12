import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const ChartYearDist = ({ books }) => {
  const yearCount = {};

  books.forEach(book => {
    const year = book.first_publish_year;
    if (year) {
      yearCount[year] = (yearCount[year] || 0) + 1;
    }
  });

  const data = Object.entries(yearCount)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);

  if (data.length === 0) {
    return (
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h3 style={{ color: '#c71585' }}>📅 Books by Year</h3>
        <p style={{ color: '#4b2c46' }}>No year data available for this search.</p>
      </div>
    );
  }

  return (
    <div style={{
      width: '80%',
      maxWidth: '960px',
      margin: '2rem auto',
      backgroundColor: '#fffafc',
      border: '2px dashed #d8bfd8',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 0 8px rgba(200, 100, 150, 0.08)'
    }}>
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.5rem',
        color: '#c71585',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>📅 Books by Publication Year</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#4b2c46', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis
            type="number"
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            interval={0}
            tick={{ fill: '#4b2c46', fontSize: 14 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff0f5', borderColor: '#d8bfd8' }}
            labelStyle={{ color: '#c71585' }}
            itemStyle={{ color: '#4b2c46' }}
          />
          <Bar dataKey="count" fill="#c71585" barSize={24} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartYearDist;
