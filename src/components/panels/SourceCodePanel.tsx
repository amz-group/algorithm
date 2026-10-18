import React, { useState } from 'react';
import { Copy, Check, Download, Code, FileCode2 } from 'lucide-react';
import { AlgorithmId, LanguageId } from '../../types/algorithm';
import { ALGORITHM_SOURCE_CODE, CodeImplementation } from '../../data/sourceCode';

interface SourceCodePanelProps {
  algorithmId: AlgorithmId;
}

export const SourceCodePanel: React.FC<SourceCodePanelProps> = ({ algorithmId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('java');
  const [copied, setCopied] = useState(false);

  const languages: { id: LanguageId; label: string; ext: string }[] = [
    { id: 'java', label: 'Java', ext: '.java' },
    { id: 'cpp', label: 'C++', ext: '.cpp' },
    { id: 'python', label: 'Python', ext: '.py' },
    { id: 'csharp', label: 'C#', ext: '.cs' },
    { id: 'javascript', label: 'JavaScript', ext: '.js' }
  ];

  const codeObj: CodeImplementation =
    ALGORITHM_SOURCE_CODE[algorithmId]?.[selectedLanguage] || {
      language: selectedLanguage,
      languageLabel: selectedLanguage,
      fileExtension: '.txt',
      filename: `${algorithmId}.txt`,
      code: '// Source code loading...'
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeObj.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([codeObj.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = codeObj.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lines = codeObj.code.split('\n');

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-4 transition-colors">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#F0F0EC] dark:border-[#282828] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-[#F5C542] rounded-xs" />
          <h3 className="font-bold text-sm text-[#171717] dark:text-[#FAFAFA]">
            Source Code
          </h3>
        </div>

        {/* Action Buttons: Copy & Download */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-[#262626] border border-[#E5E5E0] dark:border-[#333333] text-[#171717] dark:text-[#FAFAFA] hover:bg-[#F2F2ED] dark:hover:bg-[#2E2E2E] transition-colors flex items-center gap-1.5 shadow-xs"
            title="Copy entire code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCode}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] transition-colors flex items-center gap-1.5 shadow-xs"
            title={`Download as ${codeObj.filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ({codeObj.fileExtension})</span>
          </button>
        </div>
      </div>

      {/* Language Tabs Bar */}
      <div className="flex items-center justify-between border-b border-[#E5E5E0] dark:border-[#333333] pb-2 mb-3">
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#F7F7F4] dark:bg-[#171717] rounded-lg">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-[#F5C542] shadow-xs'
                    : 'text-[#737373] hover:text-[#171717] dark:text-[#A3A3A3] dark:hover:text-[#FAFAFA]'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:inline text-xs font-mono text-[#737373] dark:text-[#A3A3A3]">
          File: <strong className="text-[#171717] dark:text-[#FAFAFA]">{codeObj.filename}</strong>
        </span>
      </div>

      {/* Code Viewer Container */}
      <div className="relative rounded-lg bg-[#141414] text-[#E6E6E6] border border-[#2B2B2B] overflow-hidden font-mono text-xs leading-relaxed">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1C1C1C] border-b border-[#2B2B2B] text-[11px] text-[#8C8C8C]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-[#CCCCCC]">{codeObj.filename}</span>
          </div>
          <span>{lines.length} lines</span>
        </div>

        {/* Code Lines with Line Numbers */}
        <div className="p-4 overflow-x-auto max-h-[460px] flex">
          {/* Line Numbers Gutter */}
          <div className="select-none text-right pr-4 text-[#555555] font-mono shrink-0 border-r border-[#2B2B2B]">
            {lines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Actual Code */}
          <pre className="pl-4 font-mono text-xs leading-6 text-[#E0E0E0] overflow-x-visible flex-1">
            <code>
              {lines.map((line, i) => {
                // Simple highlight token cues
                let lineClass = 'text-[#DCDCDC]';
                if (line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('*') || line.trim().startsWith('/*')) {
                  lineClass = 'text-[#859900] italic'; // Comments
                } else if (line.includes('public class') || line.includes('def ') || line.includes('function ') || line.includes('void ') || line.includes('int ')) {
                  lineClass = 'text-[#F5C542] font-semibold'; // Declarations
                } else if (line.includes('import ') || line.includes('#include ') || line.includes('using ')) {
                  lineClass = 'text-[#87CEEB]'; // Imports
                }

                return (
                  <div key={i} className={lineClass}>
                    {line || ' '}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
