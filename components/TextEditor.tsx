
import React from 'react';

interface TextEditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const charLimit = 50000;
  const charCount = value.length;

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg flex flex-col flex-grow p-1">
      <div className="relative flex-grow">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter text to synthesize..."
          className="w-full h-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 text-base leading-relaxed"
          style={{ minHeight: '250px' }}
        />
      </div>
      <div className="text-right text-sm text-slate-400 px-4 py-2 border-t border-slate-700">
        <span>{charCount.toLocaleString()} / {charLimit.toLocaleString()} characters</span>
      </div>
    </div>
  );
};

export default TextEditor;
