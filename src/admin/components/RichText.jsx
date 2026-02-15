import React, { useState, useEffect, useRef } from 'react';

const RichText = ({ value, onChange, placeholder = "Enter some rich text…" }) => {
  const htmlToText = (html) => {
    if (!html || typeof html !== 'string') return '';
    return html.replace(/<br\s*\/?>(\r?\n)?/gi, '\n');
  };
  const textToHtml = (text) => {
    if (text == null) return '';
    return String(text).replace(/\r?\n/g, '<br />');
  };

  const [textContent, setTextContent] = useState(htmlToText(value));
  const textareaRef = useRef(null);

  // Sync incoming HTML to textarea text (convert <br> to newlines)
  useEffect(() => {
    setTextContent(htmlToText(value));
  }, [value]);

  const handleContentChange = (newText) => {
    setTextContent(newText);
    if (onChange) {
      const html = textToHtml(newText);
      onChange(html);
    }
  };

  const applyFormat = (tag) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
      const formattedText = `<${tag}>${selectedText}</${tag}>`;
      const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
      handleContentChange(newContent);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + tag.length + 2, start + tag.length + 2 + selectedText.length);
      }, 0);
    }
  };

  const insertList = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.substring(0, start);
    const selected = textarea.value.substring(start, end);
    const after = textarea.value.substring(end);
    const lines = selected ? selected.split(/\r?\n/) : [''];
    const listHtml = `<ul>${lines.map(line => `<li>${line || ''}</li>`).join('')}</ul>`;
    const newContent = before + listHtml + after;
    handleContentChange(newContent);
    // place caret after inserted list
    const caretPos = before.length + listHtml.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(caretPos, caretPos);
    }, 0);
  };

  const insertEmailLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const linkText = selectedText.trim() || prompt('Weergavetekst voor de link:', 'Stuur een e-mail');
    if (linkText === null) return;
    const email = prompt('E-mailadres:', '');
    if (email === null || !email.trim()) return;
    const anchor = `<a href="mailto:${email.trim()}">${linkText}</a>`;
    const newContent = textarea.value.substring(0, start) + anchor + textarea.value.substring(end);
    handleContentChange(newContent);
    const caretPos = start + anchor.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(caretPos, caretPos);
    }, 0);
  };

  const insertWebsiteLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const linkText = selectedText.trim() || prompt('Weergavetekst voor de link:', 'Klik hier');
    if (linkText === null) return;
    let url = prompt('Website-URL (bijv. https://www.voorbeeld.be):', 'https://');
    if (url === null) return;
    if (!url.trim()) url = 'https://';
    else if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    const anchor = `<a href="${url.trim()}" rel="noopener noreferrer">${linkText}</a>`;
    const newContent = textarea.value.substring(0, start) + anchor + textarea.value.substring(end);
    handleContentChange(newContent);
    const caretPos = start + anchor.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(caretPos, caretPos);
    }, 0);
  };

  return (
    <div className="border rounded">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => applyFormat('strong')}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => applyFormat('em')}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => applyFormat('u')}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={insertList}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={insertWebsiteLink}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="Website link toevoegen"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={insertEmailLink}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          title="E-mail link toevoegen"
        >
          ✉
        </button>
      </div>
      
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={textContent}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border-0 resize-none focus:outline-none"
        rows={6}
        style={{ minHeight: '120px' }}
      />
      
      {/* Preview */}
      {textContent && (
        <div className="p-3 border-t bg-gray-50">
          <div className="text-xs text-gray-600 mb-1">Preview:</div>
          <style>{`.rt-html ul{list-style:disc;padding-left:1.25rem} .rt-html ol{list-style:decimal;padding-left:1.25rem}`}</style>
          <div
            className="rt-html prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: textToHtml(textContent) }}
          />
        </div>
      )}
    </div>
  );
};

export default RichText;