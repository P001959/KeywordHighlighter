function DocumentViewer({ content }) {
  return (
    <div className="result-section">
      <div
        id="documentContent"
        dangerouslySetInnerHTML={{
          __html: content || `
            <p style="color: #999; text-align: center; padding: 50px 20px;">
              Upload your document and keywords to see highlighted results here
            </p>
          `,
        }}
      />
    </div>
  );
}

export default DocumentViewer;
