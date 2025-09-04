import React, { useState, useMemo } from 'react';

// TypeScript declarations for global libraries from CDN
declare const marked: {
  parse: (markdown: string) => string;
};
declare const DOMPurify: {
  sanitize: (html: string) => string;
};


interface TextEditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const charLimit = 50000;
  const charCount = value.length;
  const [view, setView] = useState<'write' | 'preview'>('write');

  const sanitizedHtml = useMemo(() => {
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
      const dirtyHtml = marked.parse(value);
      return DOMPurify.sanitize(dirtyHtml);
    }
    return '<p>Loading preview...</p>';
  }, [value]);

  const getTabClassName = (tabName: 'write' | 'preview') => {
    const baseClasses = 'px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-colors';
    if (view === tabName) {
      return `${baseClasses} bg-slate-800 text-cyan-400`;
    }
    return `${baseClasses} text-slate-400 hover:bg-slate-700/50 hover:text-slate-200`;
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg flex flex-col flex-grow">
      <div className="flex border-b border-slate-700 px-2 pt-2">
        <button onClick={() => setView('write')} className={getTabClassName('write')}>
          Write
        </button>
        <button onClick={() => setView('preview')} className={getTabClassName('preview')}>
          Preview
        </button>
      </div>

      <div className="relative flex-grow" style={{ minHeight: '250px' }}>
        {view === 'write' ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Enter text with Markdown..."
            className="w-full h-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-b-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition duration-200 text-base leading-relaxed"
          />
        ) : (
          <div
            className="prose-dark w-full h-full p-4 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        )}
      </div>
      <div className="text-right text-sm text-slate-400 px-4 py-2 border-t border-slate-700">
        <span>{charCount.toLocaleString()} / {charLimit.toLocaleString()} characters</span>
      </div>
    </div>
  );
};

export default TextEditor;