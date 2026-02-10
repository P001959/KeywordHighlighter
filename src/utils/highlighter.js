export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightKeywords(docContent, keywords) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(docContent, 'text/html');

  let keywordCounts = {};

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

  sortedKeywords.forEach((keyword) => {
    keywordCounts[keyword] = 0;
  });

  function getTextNodes(node) {
    let textNodes = [];

    function traverse(n) {
      if (n.nodeType === Node.TEXT_NODE) {
        if (n.textContent.trim()) {
          textNodes.push(n);
        }
      } else {
        for (let child of n.childNodes) {
          traverse(child);
        }
      }
    }

    traverse(node);
    return textNodes;
  }

  const textNodes = getTextNodes(doc.body);

  textNodes.forEach((node) => {
    if (!node.parentNode) return;

    const text = node.textContent;
    let modifiedText = text;
    let hasMatch = false;

    for (const keyword of sortedKeywords) {
      const regex = new RegExp(escapeRegex(keyword), 'gi');

      let match;
      const originalText = node.textContent;
      let count = 0;
      while ((match = regex.exec(originalText)) !== null) {
        count++;
      }

      if (count > 0) {
        keywordCounts[keyword] += count;
        hasMatch = true;

        modifiedText = modifiedText.replace(regex, (match) => {
          return `<span class="highlight">${match}</span>`;
        });
      }
    }

    if (hasMatch && node.parentNode) {
      const temp = document.createElement('span');
      temp.innerHTML = modifiedText;

      while (temp.firstChild) {
        node.parentNode.insertBefore(temp.firstChild, node);
      }

      node.parentNode.removeChild(node);
    }
  });

  const highlightedContent = doc.body.innerHTML;

  return {
    highlightedContent,
    keywordCounts,
  };
}
