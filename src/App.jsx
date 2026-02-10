import { useState, useRef } from 'react';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import UploadBox from './components/UploadBox';
import KeywordBreakdown from './components/KeywordBreakdown';
import DocumentViewer from './components/DocumentViewer';
import { highlightKeywords } from './utils/highlighter';
import docIcon from './assets/google-docs.png';
import sheetIcon from './assets/google-sheets.png';

function App() {
  const [docContent, setDocContent] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [highlightedContent, setHighlightedContent] = useState('');
  const [keywordCounts, setKeywordCounts] = useState({});
  const [docFileName, setDocFileName] = useState('');
  const [excelFileName, setExcelFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const processDocFile = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocContent(result.value);
      setDocFileName(file.name);
      setError('');
    } catch (err) {
      setError('Error reading document file: ' + err.message);
    }
  };

  const processExcelFile = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const extractedKeywords = data
        .map((row) => row[0])
        .filter((keyword) => {
          if (!keyword || keyword.toString().trim() === '') {
            return false;
          }

          const keywordText = keyword.toString().trim();
          const lowerKeyword = keywordText.toLowerCase();

          if (lowerKeyword === 'keyword' || lowerKeyword === 'keywords') {
            return false;
          }

          return true;
        })
        .map((keyword) => keyword.toString().trim());

      if (extractedKeywords.length === 0) {
        setError('No keywords found in Column A of the Excel file');
      } else {
        setKeywords(extractedKeywords);
        setExcelFileName(file.name);
        setError('');
      }
    } catch (err) {
      setError('Error reading Excel file: ' + err.message);
    }
  };

  const handleDocUpload = (file) => {
    processDocFile(file);
  };

  const handleExcelUpload = (file) => {
    processExcelFile(file);
  };

  const handleProcess = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const { highlightedContent: content, keywordCounts: counts } = highlightKeywords(
        docContent,
        keywords
      );
      setHighlightedContent(content);
      setKeywordCounts(counts);
      setLoading(false);
    }, 500);
  };

  const canProcess = docContent && keywords.length > 0;

  return (
    <div className="container">
      <div className="header">
        <h1>KEYWORD HIGHLIGHTER</h1>
      </div>

      <div className="main-layout">
        <div className="left-panel">
          <div className="upload-section">
            <UploadBox
              id="docUpload"
              title="Upload Word Document"
              description="Click or drag .docx file"
              accept=".docx"
              fileName={docFileName}
              onFileSelect={handleDocUpload}
              icon={docIcon}
            />

            <UploadBox
              id="excelUpload"
              title="Upload Keywords Excel"
              description="Click or drag .xlsx/.xls file"
              accept=".xlsx,.xls"
              fileName={excelFileName}
              onFileSelect={handleExcelUpload}
              icon={sheetIcon}
            />

            <button className="button" onClick={handleProcess} disabled={!canProcess}>
              Highlight Keywords
            </button>

            {error && (
              <div className="error active">
                {error}
              </div>
            )}

            {loading && (
              <div className="loading active">
                <div className="spinner"></div>
                <p>Processing...</p>
              </div>
            )}
          </div>

          {Object.keys(keywordCounts).length > 0 && (
            <KeywordBreakdown keywordCounts={keywordCounts} />
          )}
        </div>

        <div className="right-panel">
          <DocumentViewer content={highlightedContent} />
        </div>
      </div>
    </div>
  );
}

export default App;
