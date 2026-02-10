import { escapeHtml } from '../utils/highlighter';

function KeywordBreakdown({ keywordCounts }) {
  const sortedEntries = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="breakdown-table">
      <div className="breakdown-header">Keywords</div>
      <div className="breakdown-content">
        {sortedEntries.map(([keyword, count]) => (
          <div
            key={keyword}
            className={`breakdown-row ${count === 0 ? 'no-match' : ''}`}
          >
            <div className="breakdown-keyword">{escapeHtml(keyword)}</div>
            <div className="breakdown-count">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeywordBreakdown;
