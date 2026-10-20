import React from 'react';
import {
  SortingStep,
  SearchingStep,
  AlgorithmMetadata
} from '../../types/algorithm';
import { calculateNormalizedHeight, compareElements } from '../../utils/comparator';

interface VisualizationPanelProps {
  metadata: AlgorithmMetadata;
  currentStepData: SortingStep | SearchingStep | null;
}

export const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  metadata,
  currentStepData
}) => {
  const isSorting = metadata.category === 'sorting';
  const isSearching = metadata.category === 'searching';

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-3.5 sm:p-4 transition-colors flex flex-col min-h-[320px]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#F0F0EC] dark:border-[#282828]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-[#F5C542] rounded-xs" />
          <h2 className="text-sm font-bold text-[#171717] dark:text-[#FAFAFA]">
            Visualization
          </h2>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#737373] dark:text-[#A3A3A3]">
          {isSorting && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#F5C542]" />
                <span>Comparing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
                <span>Swapping/Moving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span>Sorted</span>
              </div>
            </>
          )}
          {isSearching && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#F5C542]" />
                <span>Current / Mid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span>Target Match</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* VISUALIZATION CANVAS */}
      <div className="flex-1 flex flex-col items-center justify-center relative select-none">
        {/* Empty / Initial State */}
        {!currentStepData && (
          <div className="text-center py-12 text-[#888888]">
            <p className="text-sm">Click <span className="font-semibold text-[#111111] dark:text-[#FAFAFA]">Play</span> or step controls below to visualize.</p>
          </div>
        )}

        {/* SORTING VISUALIZATION (Vertical Bars) */}
        {isSorting && currentStepData && (
          <div className="w-full flex-1 flex flex-col justify-end">
            {/* Visual Bars Container */}
            <div className="flex-1 min-h-[220px] flex items-end justify-center gap-1.5 sm:gap-2 px-2 py-4">
              {(() => {
                const arr = currentStepData.arrayState;
                const highlights = (currentStepData as SortingStep).highlightIndices || [];
                const swaps = (currentStepData as SortingStep).swapIndices;
                const sorted = (currentStepData as SortingStep).sortedIndices || [];
                const pivot = (currentStepData as SortingStep).pivotIndex;

                return arr.map((val, idx) => {
                  const isHighlight = highlights.includes(idx);
                  const isSwap = !!swaps && (swaps[0] === idx || swaps[1] === idx);
                  const isSorted = sorted.includes(idx);
                  const isPivot = pivot === idx;

                  // Dynamic normalized height supporting both numeric values and lexicographical strings
                  const heightPercent = calculateNormalizedHeight(val, arr, 18, 92);

                  let barBg = 'bg-[#E5E5DF] dark:bg-[#2B2B2B] text-[#171717] dark:text-[#E0E0E0]';
                  let borderStyle = 'border-t-2 border-transparent';

                  if (isSwap) {
                    barBg = 'bg-rose-500 text-white shadow-sm';
                    borderStyle = 'border-t-2 border-rose-300';
                  } else if (isHighlight) {
                    barBg = 'bg-[#F5C542] text-[#111111] font-bold shadow-sm';
                    borderStyle = 'border-t-2 border-[#D4A72C]';
                  } else if (isPivot) {
                    barBg = 'bg-purple-500 text-white font-bold';
                    borderStyle = 'border-t-2 border-purple-300';
                  } else if (isSorted) {
                    barBg = 'bg-emerald-500 text-white font-semibold';
                    borderStyle = 'border-t-2 border-emerald-300';
                  }

                  const isText = typeof val === 'string';

                  return (
                    <div
                      key={idx}
                      className="flex-1 max-w-[54px] flex flex-col items-center justify-end h-full group"
                    >
                      {/* Bar Pillar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-150 flex flex-col items-center justify-between py-1 px-0.5 text-[10px] sm:text-xs font-mono font-medium ${barBg} ${borderStyle}`}
                      >
                        <span className="truncate max-w-full px-0.5 leading-none">
                          {isText ? `"${val}"` : val}
                        </span>
                        {isPivot && (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-90">
                            P
                          </span>
                        )}
                      </div>

                      {/* Index Label */}
                      <span className="text-[10px] font-mono text-[#737373] mt-1.5 leading-none">
                        {idx}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* SEARCHING VISUALIZATION (Linear Cells & Binary Pointers) */}
        {isSearching && currentStepData && (
          <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
            {(() => {
              const step = currentStepData as SearchingStep;
              const arr = step.arrayState;
              const curr = step.currentIndex;
              const low = step.lowIndex;
              const mid = step.midIndex;
              const high = step.highIndex;
              const target = step.target;

              return (
                <div className="w-full max-w-3xl flex flex-col items-center space-y-6">
                  {/* Target Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#282828] text-xs">
                    <span className="text-[#737373] dark:text-[#A3A3A3]">Target Search Value:</span>
                    <span className="font-mono font-bold text-sm text-[#111111] dark:text-[#F5C542]">
                      {typeof target === 'string' ? `"${target}"` : target}
                    </span>
                  </div>

                  {/* Array Cells */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {arr.map((val, idx) => {
                      const isTargetMatch = step.found && compareElements(val, target) === 0 && (curr === idx || mid === idx);
                      const isCurrentInspect = curr === idx || mid === idx;
                      const isInSearchWindow =
                        low !== undefined && high !== undefined
                          ? idx >= low && idx <= high
                          : true;

                      let cellBg = 'bg-white dark:bg-[#202020] border-[#E5E5E0] dark:border-[#333333] text-[#171717] dark:text-[#FAFAFA]';

                      if (isTargetMatch) {
                        cellBg = 'bg-emerald-500 border-emerald-600 text-white font-bold ring-2 ring-emerald-400';
                      } else if (isCurrentInspect) {
                        cellBg = 'bg-[#F5C542] border-[#D4A72C] text-[#111111] font-bold ring-2 ring-[#F5C542]';
                      } else if (!isInSearchWindow) {
                        cellBg = 'bg-[#F2F2ED]/60 dark:bg-[#171717]/60 border-transparent text-[#A3A3A3] opacity-40';
                      }

                      const isTextVal = typeof val === 'string';

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          {/* Pointer Indicator */}
                          <div className="h-5 flex items-center justify-center text-[10px] font-bold font-mono">
                            {idx === low && <span className="text-blue-500">L</span>}
                            {idx === mid && <span className="text-amber-500 font-extrabold">MID</span>}
                            {idx === high && <span className="text-purple-500">H</span>}
                            {curr === idx && metadata.id === 'linear-search' && (
                              <span className="text-[#D4A72C]">▼</span>
                            )}
                          </div>

                          {/* Cell Body */}
                          <div
                            className={`min-w-[44px] px-2.5 h-11 rounded-lg border flex items-center justify-center font-mono text-xs sm:text-sm shadow-2xs transition-all ${cellBg}`}
                          >
                            {isTextVal ? `"${val}"` : val}
                          </div>

                          {/* Index */}
                          <span className="text-[10px] font-mono text-[#737373] mt-1">
                            [{idx}]
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
