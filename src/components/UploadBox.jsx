import { useState, useRef, useCallback } from 'react';

function UploadBox({
  id,
  title,
  description,
  accept,
  fileName,
  onFileSelect,
  icon,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const isValidFile = useCallback(
    (file) => {
      if (!accept) return true;
      const acceptedExtensions = accept
        .split(',')
        .map(ext => ext.trim().toLowerCase());

      return acceptedExtensions.some(ext =>
        file.name.toLowerCase().endsWith(ext)
      );
    },
    [accept]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  return (
    <div
      id={id}
      className={`upload-box ${isDragging ? 'dragover' : ''}`}
      role="button"
      tabIndex={0}
      onClick={openFileDialog}
      onKeyDown={(e) => e.key === 'Enter' && openFileDialog()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-icon">
        {icon ? (
          <img src={icon} alt="" width={48} height={48} />
        ) : (
          '📄'
        )}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {fileName && <div className="file-name">✓ {fileName}</div>}
    </div>
  );
}

export default UploadBox;
