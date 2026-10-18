import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { ExecutionResult, AlgorithmMetadata } from '../../types/algorithm';
import {
  downloadResultAsTxt,
  downloadResultAsCsv,
  downloadDetailedAnalysisTxt,
  downloadStepHistoryAsCsv,
  downloadJsonResults
} from '../../utils/exporter';

interface ResultPanelProps {
  result: ExecutionResult;
  metadata: AlgorithmMetadata;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result, metadata }) => {
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const handleDownload = (type: string, fn: () => void) => {
    fn();
    setDownloadSuccessMessage(`Downloaded ${type}`);
    setTimeout(() => setDownloadSuccessMessage(null), 2500);
  };

  const isSorting = metadata.category === 'sorting';
  const isSearching = metadata.category === 'searching';
  const isGraph = metadata.category === 'graph';

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-4 transition-colors space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#F0F0EC] dark:border-[#282828]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-[#F5C542] rounded-xs" />
          <h3 className="font-bold text-sm text-[#171717] dark:text-[#FAFAFA]">
            Execution Result
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-[#737373] dark:text-[#A3A3A3]">
            Time: <strong className="text-[#171717] dark:text-[#FAFAFA]">{result.executionTimeMs} ms</strong>
          </span>
          <span className="text-[#737373] dark:text-[#A3A3A3]">
            Comparisons: <strong className="text-[#171717] dark:text-[#FAFAFA]">{result.comparisonsCount}</strong>
          </span>
          <span className="text-[#737373] dark:text-[#A3A3A3]">
            Steps: <strong className="text-[#171717] dark:text-[#FAFAFA]">{result.totalSteps}</strong>
          </span>
        </div>
      </div>

      {/* Main Result Display */}
      {isSorting && (
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3] block mb-1">Sorted Array:</span>
            <p className="font-mono bg-[#F7F7F4] dark:bg-[#141414] p-2.5 rounded-lg border border-[#E5E5E0] dark:border-[#282828] text-[#171717] dark:text-[#F5C542] font-semibold break-all">
              [{result.outputArray?.join(', ')}]
            </p>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="p-3 rounded-lg bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#282828] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#737373] dark:text-[#A3A3A3]">Search Target: </span>
            <strong className="font-mono text-sm text-[#171717] dark:text-[#FAFAFA]">{result.targetValue}</strong>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-bold px-2 py-0.5 rounded text-xs ${
                result.found
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
              }`}
            >
              {result.found ? `Found at index ${result.foundIndex}` : 'Not Found (-1)'}
            </span>
          </div>
        </div>
      )}

      {isGraph && (
        <div className="space-y-2 text-xs">
          {result.shortestPath && result.shortestPath.length > 0 && (
            <div className="p-3 rounded-lg bg-[#F7F7F4] dark:bg-[#141414] border border-[#D4A72C]/40 flex items-center justify-between">
              <div>
                <span className="text-[#737373] dark:text-[#A3A3A3] block text-[11px]">Shortest Path:</span>
                <span className="font-mono font-bold text-sm text-[#111111] dark:text-[#F5C542]">
                  {result.shortestPath.join(' → ')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#737373] dark:text-[#A3A3A3] block text-[11px]">Total Distance:</span>
                <span className="font-mono font-bold text-sm text-[#D4A72C]">
                  {result.shortestDistance}
                </span>
              </div>
            </div>
          )}

          {result.traversalOrder && (
            <div>
              <span className="text-[11px] text-[#737373] block mb-1">BFS Traversal Order:</span>
              <p className="font-mono bg-[#F7F7F4] dark:bg-[#141414] p-2 rounded border border-[#E5E5E0] dark:border-[#282828] text-[#171717] dark:text-[#FAFAFA]">
                {result.traversalOrder.join(' → ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Downloads (Clean & Simple Buttons) */}
      <div className="pt-2 border-t border-[#F0F0EC] dark:border-[#282828] flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">
          {downloadSuccessMessage ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{downloadSuccessMessage}</span>
          ) : (
            'Export Results:'
          )}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleDownload('Result (.txt)', () => downloadResultAsTxt(result))}
            className="px-2.5 py-1 text-xs rounded-md bg-[#F7F7F4] dark:bg-[#282828] hover:bg-[#E5E5E0] dark:hover:bg-[#333333] text-[#171717] dark:text-[#FAFAFA] transition-colors"
          >
            TXT
          </button>
          <button
            onClick={() => handleDownload('Result (.csv)', () => downloadResultAsCsv(result))}
            className="px-2.5 py-1 text-xs rounded-md bg-[#F7F7F4] dark:bg-[#282828] hover:bg-[#E5E5E0] dark:hover:bg-[#333333] text-[#171717] dark:text-[#FAFAFA] transition-colors"
          >
            CSV
          </button>
          <button
            onClick={() => handleDownload('Detailed Trace (.txt)', () => downloadDetailedAnalysisTxt(result))}
            className="px-2.5 py-1 text-xs rounded-md bg-[#F7F7F4] dark:bg-[#282828] hover:bg-[#E5E5E0] dark:hover:bg-[#333333] text-[#171717] dark:text-[#FAFAFA] transition-colors"
          >
            Audit Trace
          </button>
          <button
            onClick={() => handleDownload('Step History (.csv)', () => downloadStepHistoryAsCsv(result))}
            className="px-2.5 py-1 text-xs rounded-md bg-[#F7F7F4] dark:bg-[#282828] hover:bg-[#E5E5E0] dark:hover:bg-[#333333] text-[#171717] dark:text-[#FAFAFA] transition-colors"
          >
            Steps CSV
          </button>
          <button
            onClick={() => handleDownload('JSON Results', () => downloadJsonResults(result))}
            className="px-2.5 py-1 text-xs rounded-md bg-[#F7F7F4] dark:bg-[#282828] hover:bg-[#E5E5E0] dark:hover:bg-[#333333] text-[#171717] dark:text-[#FAFAFA] transition-colors"
          >
            JSON
          </button>
        </div>
      </div>
    </div>
  );
};
