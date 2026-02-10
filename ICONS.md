# Adding Custom Icons

The project includes default SVG icons for the upload boxes. To replace them with your own PNG icons:

## Steps:

1. **Add your icon files** to `src/assets/`:
   - `google-docs.png` (for Word document upload)
   - `google-sheets.png` (for Excel upload)

2. **Update the imports** in `src/App.jsx`:

```javascript
// Change from:
import docIcon from './assets/google-docs.svg';
import sheetIcon from './assets/google-sheets.svg';

// To:
import docIcon from './assets/google-docs.png';
import sheetIcon from './assets/google-sheets.png';
```

3. **Delete the SVG files** (optional):
   - `src/assets/google-docs.svg`
   - `src/assets/google-sheets.svg`

## Icon Requirements:

- **Format**: PNG, SVG, or any web-compatible image format
- **Recommended size**: 48x48 pixels or larger
- **File names**: Can be anything, just update the imports accordingly

## Current Setup:

The project currently uses SVG icons with:
- Blue icon for Word documents
- Green icon for Excel spreadsheets

These are automatically scaled to 48x48 pixels in the upload boxes.
