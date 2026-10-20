import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FileText,
  RotateCcw,
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  X,
  FileCode,
  SortAsc,
  Binary,
  Type
} from 'lucide-react';
import { AlgorithmMetadata, DataElement } from '../../types/algorithm';
import { parseFileContent, ParsedFileResult, parseManualInput } from '../../utils/fileParser';
import { compareElements, isElementSorted } from '../../utils/comparator';
import { GRAPH_PRESETS } from '../../data/graphPresets';

interface InputPanelProps {
  metadata: AlgorithmMetadata;
  currentInput: DataElement[];
  onAnalyze: (input: DataElement[]) => void;
  // Searching specific
  targetValue?: DataElement;
  onTargetChange?: (val: DataElement) => void;
  // Graph specific
  selectedPresetId?: string;
  onSelectGraphPreset?: (presetId: string) => void;
  startNode?: string;
  targetNode?: string;
  onStartNodeChange?: (node: string) => void;
  onTargetNodeChange?: (node: string) => void;
  graphNodesList?: string[];
  isAnalyzing?: boolean;
}

const SAMPLE_TEXT_WORDS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'];
const SAMPLE_TEXT_LETTERS = ['E', 'B', 'A', 'D', 'C', 'F'];
const SAMPLE_KRD_WORDS = ['KRD', 'Dev', 'Software', 'Code', 'Web', 'Fast'];
const RANDOM_WORD_POOL = [
  'Kurd', 'Tech', 'Code', 'Byte', 'Data', 'Algo', 'Fast', 'Smart', 'Design',
  'Cloud', 'Server', 'Client', 'Mobile', 'Stack', 'React', 'Script', 'Nexus', 'Pixel'
];

export const InputPanel: React.FC<InputPanelProps> = ({
  metadata,
  currentInput,
  onAnalyze,
  targetValue = 23,
  onTargetChange,
  selectedPresetId = 'transit-network',
  onSelectGraphPreset,
  startNode = 'A',
  targetNode = 'F',
  onStartNodeChange,
  onTargetNodeChange,
  graphNodesList = ['A', 'B', 'C', 'D', 'E', 'F'],
  isAnalyzing = false
}) => {
  const [activeTab, setActiveTab] = useState<'numbers' | 'text' | 'file'>('numbers');
  const [manualText, setManualText] = useState<string>(() => (currentInput ? currentInput.join(', ') : ''));
  const [parsedFile, setParsedFile] = useState<ParsedFileResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isGraph = metadata.category === 'graph';
  const isSearch = metadata.category === 'searching';
  const isBinarySearch = metadata.id === 'binary-search';

  // Synchronize when currentInput changes externally
  useEffect(() => {
    if (currentInput && currentInput.length > 0) {
      setManualText(currentInput.join(', '));
      const hasString = currentInput.some((x) => typeof x === 'string');
      if (hasString && activeTab === 'numbers') {
        setActiveTab('text');
      }
    }
  }, [currentInput]);

  const parsedManual = parseManualInput(manualText, activeTab === 'text' ? 'text' : activeTab === 'numbers' ? 'number' : 'auto');
  const isCurrentlySorted = isElementSorted(parsedManual.valid);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualText(e.target.value);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setManualText('');
    setErrorMessage(null);
  };

  const handleExampleNumbers = () => {
    setManualText(metadata.defaultInput.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange(isBinarySearch ? 23 : 70);
    }
  };

  const handleRandomNumbers = () => {
    const randoms: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 95) + 5);
    if (isBinarySearch) randoms.sort((a, b) => a - b);
    setManualText(randoms.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange(randoms[Math.floor(randoms.length / 2)]);
    }
  };

  const handleSampleWords = () => {
    setManualText(SAMPLE_TEXT_WORDS.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange('Cherry');
    }
  };

  const handleSampleLetters = () => {
    setManualText(SAMPLE_TEXT_LETTERS.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange('C');
    }
  };

  const handleSampleKRD = () => {
    setManualText(SAMPLE_KRD_WORDS.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange('Code');
    }
  };

  const handleRandomWords = () => {
    // Pick 6 unique random words
    const shuffled = [...RANDOM_WORD_POOL].sort(() => 0.5 - Math.random()).slice(0, 6);
    if (isBinarySearch) shuffled.sort(compareElements);
    setManualText(shuffled.join(', '));
    setErrorMessage(null);
    if (isSearch && onTargetChange) {
      onTargetChange(shuffled[Math.floor(shuffled.length / 2)]);
    }
  };

  const handleSortManualInput = () => {
    const mode = activeTab === 'text' ? 'text' : 'auto';
    const { valid } = parseManualInput(manualText, mode);
    const sorted = [...valid].sort(compareElements);
    setManualText(sorted.join(', '));
    setErrorMessage(null);
  };

  const handleManualAnalyze = () => {
    if (isGraph) {
      onAnalyze([]);
      return;
    }

    const preferred = activeTab === 'text' ? 'text' : activeTab === 'numbers' ? 'number' : 'auto';
    const { valid } = parseManualInput(manualText, preferred);

    if (valid.length === 0) {
      setErrorMessage(
        activeTab === 'text'
          ? 'تکایە لانیکەم وشەیەک یان پیتێک بنووسە بۆ شیکارکردن.'
          : 'Please enter at least one valid element.'
      );
      return;
    }

    if (isBinarySearch && !isElementSorted(valid)) {
      setErrorMessage(
        activeTab === 'text'
          ? 'ئەلگۆریتمی Binary Search پێویستی بە داتای ڕیزکراوە (A-Z). کرتە لە دوگمەی "Sort (ڕیزکردن)" بکە.'
          : 'Binary Search requires a sorted array. Click "Sort" to order the items.'
      );
      return;
    }

    setErrorMessage(null);
    onAnalyze(valid);
  };

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsed = parseFileContent(file.name, content);
      setParsedFile(parsed);
      if (!parsed.success || parsed.validElements.length === 0) {
        setErrorMessage(parsed.errorMessage || 'No valid elements found in file.');
      } else {
        setErrorMessage(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmFile = () => {
    if (parsedFile && parsedFile.validElements.length > 0) {
      if (isBinarySearch) {
        const isSorted = isElementSorted(parsedFile.validElements);
        if (!isSorted) {
          setErrorMessage('Uploaded file is not sorted. Binary Search requires sorted input.');
          return;
        }
      }
      onAnalyze(parsedFile.validElements);
      setManualText(parsedFile.validElements.join(', '));
      setActiveTab(parsedFile.dataType === 'text' ? 'text' : 'numbers');
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-3.5 sm:p-4 transition-colors">
      {/* Top clean bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-3 border-b border-[#F0F0EC] dark:border-[#282828] gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-[#F5C542] rounded-xs" />
          <h2 className="font-bold text-[#171717] dark:text-[#FAFAFA]">
            Input Elements / داخڵکردنی داتا
          </h2>
        </div>

        {!isGraph && (
          <div className="flex items-center gap-1 text-[11px] font-medium bg-[#F7F7F4] dark:bg-[#151515] p-0.5 rounded-lg border border-[#E5E5E0] dark:border-[#282828]">
            <button
              onClick={() => {
                setActiveTab('numbers');
                setErrorMessage(null);
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'numbers'
                  ? 'bg-[#171717] text-[#F5C542] dark:bg-white dark:text-[#111111] font-semibold shadow-xs'
                  : 'text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA]'
              }`}
            >
              <Binary className="w-3 h-3 text-[#D4A72C]" />
              <span>Numbers (ژمارە)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('text');
                setErrorMessage(null);
                // If current text is all numbers, switch to default sample words for convenience
                const { detectedType } = parseManualInput(manualText);
                if (detectedType === 'number') {
                  setManualText(SAMPLE_TEXT_WORDS.join(', '));
                  if (isSearch && onTargetChange) onTargetChange('Cherry');
                }
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'text'
                  ? 'bg-[#171717] text-[#F5C542] dark:bg-white dark:text-[#111111] font-semibold shadow-xs'
                  : 'text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA]'
              }`}
            >
              <Type className="w-3 h-3 text-[#D4A72C]" />
              <span>Text / Words (تێکست)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('file');
                setErrorMessage(null);
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'file'
                  ? 'bg-[#171717] text-[#F5C542] dark:bg-white dark:text-[#111111] font-semibold shadow-xs'
                  : 'text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA]'
              }`}
            >
              <Upload className="w-3 h-3 text-[#D4A72C]" />
              <span>File (فایل)</span>
            </button>
          </div>
        )}
      </div>

      {/* GRAPH INPUT */}
      {isGraph ? (
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div>
              <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mr-1.5">Preset:</span>
              <select
                value={selectedPresetId}
                onChange={(e) => onSelectGraphPreset && onSelectGraphPreset(e.target.value)}
                className="bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-md px-2.5 py-1.5 text-xs text-[#171717] dark:text-[#FAFAFA]"
              >
                {GRAPH_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mr-1.5">Start:</span>
              <select
                value={startNode}
                onChange={(e) => onStartNodeChange && onStartNodeChange(e.target.value)}
                className="bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-md px-2 py-1.5 text-xs font-mono font-bold text-[#171717] dark:text-[#FAFAFA]"
              >
                {graphNodesList.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mr-1.5">Target:</span>
              <select
                value={targetNode}
                onChange={(e) => onTargetNodeChange && onTargetNodeChange(e.target.value)}
                className="bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded-md px-2 py-1.5 text-xs font-mono font-bold text-[#171717] dark:text-[#FAFAFA]"
              >
                {graphNodesList.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => onAnalyze([])}
            disabled={isAnalyzing}
            className="px-4 py-1.5 rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Analyze Graph
          </button>
        </div>
      ) : activeTab === 'numbers' ? (
        /* NUMBERS INPUT ROW */
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={manualText || ''}
              onChange={handleManualChange}
              placeholder="e.g. 38, 27, 43, 3, 9, 82, 10"
              className="flex-1 px-3 py-1.5 font-mono text-xs sm:text-sm bg-[#F7F7F4] dark:bg-[#141414] text-[#171717] dark:text-[#FAFAFA] border border-[#E5E5E0] dark:border-[#333333] rounded-lg focus:outline-hidden focus:border-[#D4A72C]"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleRandomNumbers}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors flex items-center gap-1"
                title="Random numbers"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span className="hidden sm:inline">Random</span>
              </button>

              <button
                onClick={handleExampleNumbers}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors"
                title="Default sample numbers"
              >
                Sample
              </button>

              <button
                onClick={handleClear}
                className="px-2 py-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA] rounded-lg transition-colors"
                title="Clear input"
              >
                Clear
              </button>

              <button
                onClick={handleManualAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-1.5 rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Analyze
              </button>
            </div>
          </div>

          {/* Searching Target & Sort helper if needed */}
          {isSearch && (
            <div className="flex items-center gap-2.5 text-xs pt-1">
              <span className="text-[#737373] dark:text-[#A3A3A3]">Search Target:</span>
              <input
                type="text"
                value={targetValue !== undefined ? String(targetValue) : ''}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  const num = Number(val);
                  if (onTargetChange) {
                    onTargetChange(!isNaN(num) && val !== '' ? num : val);
                  }
                }}
                placeholder="e.g. 23"
                className="w-24 px-2 py-1 text-xs font-mono font-bold bg-[#F7F7F4] dark:bg-[#141414] text-[#171717] dark:text-[#FAFAFA] border border-[#E5E5E0] dark:border-[#333333] rounded-md focus:border-[#D4A72C]"
              />

              {isBinarySearch && (
                <div className="flex items-center gap-2 ml-auto">
                  <span
                    className={`text-[11px] ${
                      isCurrentlySorted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400 font-medium'
                    }`}
                  >
                    {isCurrentlySorted ? '✓ Array is sorted' : '⚠ Array is unsorted'}
                  </span>
                  {!isCurrentlySorted && (
                    <button
                      onClick={handleSortManualInput}
                      className="px-2 py-0.5 text-xs rounded bg-[#F2F2ED] dark:bg-[#282828] text-[#171717] dark:text-[#FAFAFA] hover:bg-[#E5E5E0] flex items-center gap-1"
                    >
                      <SortAsc className="w-3 h-3 text-[#D4A72C]" />
                      Sort
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : activeTab === 'text' ? (
        /* TEXT / WORDS INPUT ROW */
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={manualText || ''}
              onChange={handleManualChange}
              placeholder="e.g. Apple, Banana, Orange, Grape, Mango or E, B, A, D, C"
              className="flex-1 px-3 py-1.5 font-mono text-xs sm:text-sm bg-[#F7F7F4] dark:bg-[#141414] text-[#171717] dark:text-[#FAFAFA] border border-[#E5E5E0] dark:border-[#333333] rounded-lg focus:outline-hidden focus:border-[#D4A72C]"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleRandomWords}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors flex items-center gap-1"
                title="Random words"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span className="hidden sm:inline">Random Words</span>
              </button>

              <button
                onClick={handleSortManualInput}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors flex items-center gap-1"
                title="Sort Alphabetically (A-Z)"
              >
                <SortAsc className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>Sort A-Z</span>
              </button>

              <button
                onClick={handleClear}
                className="px-2 py-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA] rounded-lg transition-colors"
                title="Clear input"
              >
                Clear
              </button>

              <button
                onClick={handleManualAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-1.5 rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Analyze Text
              </button>
            </div>
          </div>

          {/* Quick preset chips for text */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-0.5">
            <span className="text-[#737373] dark:text-[#A3A3A3] mr-1">Presets:</span>
            <button
              onClick={handleSampleWords}
              className="px-2 py-0.5 rounded-md bg-[#F2F2ED] dark:bg-[#262626] hover:bg-[#E5E5E0] text-[#171717] dark:text-[#FAFAFA] transition-colors"
            >
              Words (Apple, Banana...)
            </button>
            <button
              onClick={handleSampleLetters}
              className="px-2 py-0.5 rounded-md bg-[#F2F2ED] dark:bg-[#262626] hover:bg-[#E5E5E0] text-[#171717] dark:text-[#FAFAFA] transition-colors"
            >
              Letters (E, B, A, D, C)
            </button>
            <button
              onClick={handleSampleKRD}
              className="px-2 py-0.5 rounded-md bg-[#F2F2ED] dark:bg-[#262626] hover:bg-[#E5E5E0] text-[#171717] dark:text-[#FAFAFA] transition-colors"
            >
              KRD Tech
            </button>
          </div>

          {/* Searching Target for Text */}
          {isSearch && (
            <div className="flex items-center gap-2.5 text-xs pt-1 border-t border-[#F0F0EC] dark:border-[#282828]">
              <span className="text-[#737373] dark:text-[#A3A3A3]">Search Word / Target:</span>
              <input
                type="text"
                value={targetValue !== undefined ? String(targetValue) : ''}
                onChange={(e) => onTargetChange && onTargetChange(e.target.value)}
                placeholder="e.g. Cherry or B"
                className="w-28 px-2 py-1 text-xs font-mono font-bold bg-[#F7F7F4] dark:bg-[#141414] text-[#171717] dark:text-[#FAFAFA] border border-[#E5E5E0] dark:border-[#333333] rounded-md focus:border-[#D4A72C]"
              />

              {isBinarySearch && (
                <div className="flex items-center gap-2 ml-auto">
                  <span
                    className={`text-[11px] ${
                      isCurrentlySorted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400 font-medium'
                    }`}
                  >
                    {isCurrentlySorted ? '✓ Text is sorted A-Z' : '⚠ Text is unsorted'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* FILE UPLOAD (SUPPORTING BOTH NUMBERS AND TEXT) */
        <div className="space-y-2.5">
          {!parsedFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-lg p-3.5 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#F5C542] bg-[#F5C542]/5'
                  : 'border-[#D4D4CE] dark:border-[#383838] hover:border-[#D4A72C] bg-[#F7F7F4]/50 dark:bg-[#171717]/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.csv,.json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelected(e.target.files[0]);
                  }
                }}
              />
              <div className="flex items-center justify-center gap-2 text-xs text-[#525252] dark:text-[#D4D4D4]">
                <Upload className="w-4 h-4 text-[#D4A72C]" />
                <span className="font-semibold">Drop or choose a .txt, .csv, or .json file (Numbers or Words)</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E5E0] dark:border-[#333333] bg-[#F7F7F4] dark:bg-[#141414] text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4A72C]" />
                <span className="font-semibold text-[#171717] dark:text-[#FAFAFA]">{parsedFile.fileName}</span>
                <span className="text-[10px] text-[#737373]">
                  ({parsedFile.validElements.length} {parsedFile.dataType === 'text' ? 'words/tokens' : 'numbers'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setParsedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="p-1 text-[#737373] hover:text-[#171717]"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleConfirmFile}
                  disabled={parsedFile.validElements.length === 0}
                  className="px-3 py-1 text-xs font-bold rounded bg-[#F5C542] hover:bg-[#e6b635] text-[#111111]"
                >
                  Confirm &amp; Run
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error / Alert notice */}
      {errorMessage && (
        <div className="mt-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
