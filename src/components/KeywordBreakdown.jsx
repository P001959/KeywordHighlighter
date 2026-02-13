import { escapeHtml } from '../utils/highlighter';
import { useState } from 'react';

function KeywordBreakdown({ keywordCounts }) {
  const sortedEntries = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (sortedEntries.length === 0) return;

    // TSV for Google Sheets (2 columns: Keyword | Count)
    const header = 'Keyword\tCount';
    const rows = sortedEntries.map(([keyword, count]) => `${keyword}\t${count}`);
    const tsvText = [header, ...rows].join('\n');

    // HTML table for Google Docs rich paste
    const htmlRows = sortedEntries
      .map(
        ([keyword, count]) =>
          `<tr>
            <td style="padding:8px 16px 8px 8px;border:1px solid #ddd;">${escapeHtml(keyword)}</td>
            <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:600;">${count}</td>
          </tr>`
      )
      .join('');
    const htmlTable = `<table style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
      <thead>
        <tr>
          <th style="padding:8px 16px 8px 8px;border:1px solid #ddd;background:#808F87;color:white;text-align:left;">Keyword</th>
          <th style="padding:8px;border:1px solid #ddd;background:#808F87;color:white;text-align:center;">Count</th>
        </tr>
      </thead>
      <tbody>${htmlRows}</tbody>
    </table>`;

    // Write both formats to clipboard simultaneously
    if (navigator.clipboard && navigator.clipboard.write) {
      const plainBlob = new Blob([tsvText], { type: 'text/plain' });
      const htmlBlob = new Blob([htmlTable], { type: 'text/html' });
      const item = new ClipboardItem({
        'text/plain': plainBlob,
        'text/html': htmlBlob,
      });
      navigator.clipboard.write([item]).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback: plain TSV only
      navigator.clipboard.writeText(tsvText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="breakdown-table">
      <div className="breakdown-header">
        <span>Keywords</span>
        <button
          className={`breakdown-copy-btn${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          title="Copy as table — paste into Google Sheets or Google Docs"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="breakdown-content">
        {sortedEntries.map(([keyword, count], index) => (
          <div
            key={keyword}
            className={`breakdown-row ${count === 0 ? 'no-match' : ''}`}
          >
            <div className="breakdown-number">{index + 1}.</div>
            <div className="breakdown-keyword">{escapeHtml(keyword)}</div>
            <div className="breakdown-count">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeywordBreakdown;