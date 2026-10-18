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
  SortAsc
} from 'lucide-react';
import { AlgorithmMetadata } from '../../types/algorithm';
import { parseFileContent, ParsedFileResult, parseManualInput } from '../../utils/fileParser';
import { GRAPH_PRESETS } from '../../data/graphPresets';

interface InputPanelProps {
  metadata: AlgorithmMetadata;
  currentInput: number[];
  onAnalyze: (input: number[]) => void;
  // Searching specific
  targetValue?: number;
  onTargetChange?: (val: number) => void;
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
  const [activeTab, setActiveTab] = useState<'manual' | 'file'>('manual');
  const [manualText, setManualText] = useState<string>(() => (currentInput ? currentInput.join(', ') : ''));
  const [parsedFile, setParsedFile] = useState<ParsedFileResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentInput) {
      setManualText(currentInput.join(', '));
    }
  }, [currentInput]);

  const isGraph = metadata.category === 'graph';
  const isSearch = metadata.category === 'searching';
  const isBinarySearch = metadata.id === 'binary-search';

  const parsedManual = parseManualInput(manualText);
  const isCurrentlySorted = parsedManual.valid.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualText(e.target.value);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setManualText('');
    setErrorMessage(null);
  };

  const handleExampleData = () => {
    setManualText(metadata.defaultInput.join(', '));
    setErrorMessage(null);
  };

  const handleRandomData = () => {
    const randoms: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 95) + 5);
    if (isBinarySearch) randoms.sort((a, b) => a - b);
    setManualText(randoms.join(', '));
    setErrorMessage(null);
  };

  const handleSortManualInput = () => {
    const { valid } = parseManualInput(manualText);
    const sorted = [...valid].sort((a, b) => a - b);
    setManualText(sorted.join(', '));
    setErrorMessage(null);
  };

  const handleManualAnalyze = () => {
    if (isGraph) {
      onAnalyze([]);
      return;
    }

    const { valid, invalid } = parseManualInput(manualText);
    if (valid.length === 0) {
      setErrorMessage('Please enter at least one valid number.');
      return;
    }

    if (isBinarySearch && !isCurrentlySorted) {
      setErrorMessage('Binary Search requires a sorted array. Click "Sort" or enter sorted numbers.');
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
      if (!parsed.success || parsed.validNumbers.length === 0) {
        setErrorMessage(parsed.errorMessage || 'No valid numbers found in file.');
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
    if (parsedFile && parsedFile.validNumbers.length > 0) {
      if (isBinarySearch) {
        const isSorted = parsedFile.validNumbers.every((v, i, a) => i === 0 || a[i - 1] <= v);
        if (!isSorted) {
          setErrorMessage('Uploaded file is not sorted. Binary Search requires sorted input.');
          return;
        }
      }
      onAnalyze(parsedFile.validNumbers);
      setManualText(parsedFile.validNumbers.join(', '));
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-3.5 sm:p-4 transition-colors">
      {/* Top clean bar */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#F0F0EC] dark:border-[#282828] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-[#F5C542] rounded-xs" />
          <h2 className="font-bold text-[#171717] dark:text-[#FAFAFA]">
            Input Elements
          </h2>
        </div>

        {!isGraph && (
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'manual'
                  ? 'bg-[#171717] text-[#F5C542] dark:bg-white dark:text-[#111111] font-semibold'
                  : 'text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA]'
              }`}
            >
              Manual Numbers
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'file'
                  ? 'bg-[#171717] text-[#F5C542] dark:bg-white dark:text-[#111111] font-semibold'
                  : 'text-[#737373] hover:text-[#171717] dark:hover:text-[#FAFAFA]'
              }`}
            >
              Upload File
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
      ) : activeTab === 'manual' ? (
        /* MANUAL INPUT (CLEAN INLINE ROW) */
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
                onClick={handleRandomData}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors flex items-center gap-1"
                title="Random numbers"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span className="hidden sm:inline">Random</span>
              </button>

              <button
                onClick={handleExampleData}
                className="px-2.5 py-1.5 text-xs text-[#525252] dark:text-[#D4D4D4] hover:bg-[#F2F2ED] dark:hover:bg-[#282828] border border-[#E5E5E0] dark:border-[#333333] rounded-lg transition-colors"
                title="Default sample"
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
              <span className="text-[#737373] dark:text-[#A3A3A3]">Target:</span>
              <input
                type="number"
                value={targetValue !== undefined && !isNaN(targetValue) ? targetValue : ''}
                onChange={(e) => onTargetChange && onTargetChange(e.target.value === '' ? 0 : Number(e.target.value))}
                className="w-20 px-2 py-1 text-xs font-mono font-bold bg-[#F7F7F4] dark:bg-[#141414] text-[#171717] dark:text-[#FAFAFA] border border-[#E5E5E0] dark:border-[#333333] rounded-md focus:border-[#D4A72C]"
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
      ) : (
        /* FILE UPLOAD (COMPACT) */
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
                <span className="font-semibold">Drop or choose a .txt, .csv, or .json dataset</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E5E0] dark:border-[#333333] bg-[#F7F7F4] dark:bg-[#141414] text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4A72C]" />
                <span className="font-semibold text-[#171717] dark:text-[#FAFAFA]">{parsedFile.fileName}</span>
                <span className="text-[10px] text-[#737373]">({parsedFile.validNumbers.length} numbers)</span>
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
                  disabled={parsedFile.validNumbers.length === 0}
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
