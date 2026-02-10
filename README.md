# Keyword Highlighter - React + Vite

A React application for highlighting keywords in Word documents.

## Features

- 📄 Upload Word documents (.docx)
- 📊 Upload Excel files with keywords (.xlsx, .xls)
- 🎨 Automatically highlights all keyword instances
- 📈 Shows keyword counts and breakdown
- ✨ Preserves document formatting
- 🖱️ Drag-and-drop file uploads

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

## Usage

1. Upload a Word document (.docx)
2. Upload an Excel file with keywords in Column A
   - Headers like "Keyword" or "Keywords" are automatically ignored
3. Click "Highlight Keywords"
4. View highlighted document and statistics

## Project Structure

```
keyword-highlighter/
├── src/
│   ├── components/
│   │   ├── UploadBox.jsx
│   │   ├── KeywordBreakdown.jsx
│   │   └── DocumentViewer.jsx
│   ├── utils/
│   │   └── highlighter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Technologies

- React 18
- Vite
- Mammoth.js
- SheetJS/xlsx
- JSZip
- FileSaver
