export function SummaryPanel({ totalSubmissions, averageRating, recentComments }) {
  if (totalSubmissions === 0) return null;

  return (
    <section className="summary-panel" aria-label="Submission summary">
      <h2 className="summary-panel__title">Summary</h2>
      <p>Total submissions: <strong>{totalSubmissions}</strong></p>
      <p>Average rating: <strong>{averageRating}</strong></p>

      {recentComments.length > 0 && (
        <>
          <h3 className="summary-panel__subtitle">Recent Comments</h3>
          <ul className="summary-panel__comments">
            {recentComments.map((entry) => (
              <li key={entry.timestamp}>"{entry.comment}"</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
