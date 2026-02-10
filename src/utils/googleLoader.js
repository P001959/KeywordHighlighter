// utils/googleLoader.js

export async function loadGoogleDocAsText(url) {
  const docId = url.split('/d/')[1]?.split('/')[0];
  if (!docId) {
    throw new Error('Invalid Google Docs link');
  }

  // Changed from format=txt to format=html to preserve formatting
  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
  const res = await fetch(exportUrl);

  if (!res.ok) {
    throw new Error(
      'Cannot access Google Doc. Make sure it is shared as "Anyone with the link → Viewer".'
    );
  }

  const html = await res.text();
  
  // Extract content from the body tag to get clean HTML
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1];
  }
  
  return html;
}

export async function loadGoogleSheetAsKeywords(url) {
  const sheetId = url.split('/d/')[1]?.split('/')[0];
  if (!sheetId) {
    throw new Error('Invalid Google Sheets link');
  }

  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  const res = await fetch(exportUrl);

  if (!res.ok) {
    throw new Error(
      'Cannot access Google Sheet. Make sure it is shared as "Anyone with the link → Viewer".'
    );
  }

  const csv = await res.text();

  return csv
    .split('\n')
    .map(row => row.split(',')[0])
    .map(cell => cell?.trim())
    .filter(Boolean);
}