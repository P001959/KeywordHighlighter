import { useState } from 'react';

function GoogleLinkBox({ onLoad }) {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    if (!link.trim()) return;

    setLoading(true);
    try {
      await onLoad(link.trim());
    } catch (err) {
      alert('Failed to load Google file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-link-box">
      <input
        type="text"
        placeholder="Paste Google Docs or Google Sheets link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleLoad} disabled={loading}>
        {loading ? 'Loading…' : 'Load Google File'}
      </button>
    </div>
  );
}

export default GoogleLinkBox;
