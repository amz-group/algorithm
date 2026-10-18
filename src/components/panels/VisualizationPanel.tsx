import React from 'react';
import {
  SortingStep,
  SearchingStep,
  GraphStep,
  AlgorithmMetadata,
  GraphNode,
  GraphEdge
} from '../../types/algorithm';
import { Network, Check, ArrowRight, CornerDownRight } from 'lucide-react';

interface VisualizationPanelProps {
  metadata: AlgorithmMetadata;
  currentStepData: SortingStep | SearchingStep | GraphStep | null;
  // Graph specific data
  nodes?: GraphNode[];
  edges?: GraphEdge[];
  startNode?: string;
  targetNode?: string;
}

export const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  metadata,
  currentStepData,
  nodes = [],
  edges = [],
  startNode = 'A',
  targetNode = 'F'
}) => {
  const isSorting = metadata.category === 'sorting';
  const isSearching = metadata.category === 'searching';
  const isGraph = metadata.category === 'graph';

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
          {isGraph && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542]" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Visited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111] dark:bg-white border border-[#D4A72C]" />
                <span>Shortest Path</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* VISUALIZATION CANVAS */}
      <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden bg-[#FDFDFB] dark:bg-[#1A1A1A] rounded-lg p-4 border border-[#F2F2ED] dark:border-[#262626]">
        {/* SORTING VISUALIZATION */}
        {isSorting && currentStepData && 'arrayState' in currentStepData && (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Visual Bars Container */}
            <div className="flex-1 min-h-[220px] flex items-end justify-center gap-1.5 sm:gap-2 px-2 py-4">
              {(() => {
                const arr = currentStepData.arrayState;
                const maxVal = Math.max(...arr, 1);
                const minVal = Math.min(...arr, 0);
                const range = maxVal - minVal || 1;

                const step = currentStepData as SortingStep;
                const highlights: number[] = step.highlightIndices || [];
                const swaps: number[] = step.swapIndices ? [...step.swapIndices] : [];
                const sorted: number[] = step.sortedIndices || [];
                const pivot = step.pivotIndex;

                return arr.map((value, idx) => {
                  const normalizedHeight = Math.max(15, Math.round(((value - minVal) / range) * 160) + 20);
                  const isHighlight = highlights.includes(idx);
                  const isSwap = swaps.includes(idx);
                  const isSorted = sorted.includes(idx);
                  const isPivot = pivot === idx;

                  let barBg = 'bg-[#171717] dark:bg-[#383838]';
                  let textColor = 'text-[#171717] dark:text-[#FAFAFA]';

                  if (isSwap) {
                    barBg = 'bg-rose-500';
                    textColor = 'text-rose-600 font-bold';
                  } else if (isPivot) {
                    barBg = 'bg-indigo-500';
                    textColor = 'text-indigo-600 font-bold';
                  } else if (isHighlight) {
                    barBg = 'bg-[#F5C542]';
                    textColor = 'text-[#D4A72C] font-bold';
                  } else if (isSorted) {
                    barBg = 'bg-emerald-500';
                    textColor = 'text-emerald-600 font-bold';
                  }

                  return (
                    <div
                      key={idx}
                      className="flex-1 max-w-16 flex flex-col items-center justify-end h-full group"
                    >
                      {/* Top Value Label */}
                      <span className={`text-[11px] font-mono mb-1.5 transition-colors ${textColor}`}>
                        {value}
                      </span>

                      {/* Animated Bar */}
                      <div
                        style={{ height: `${normalizedHeight}px` }}
                        className={`w-full rounded-t-md transition-all duration-200 ${barBg} shadow-xs flex items-center justify-center`}
                      >
                        {isPivot && (
                          <span className="text-[9px] font-bold text-white uppercase tracking-wider rotate-90 sm:rotate-0">
                            P
                          </span>
                        )}
                      </div>

                      {/* Index Label */}
                      <span className="text-[10px] text-[#A3A3A3] font-mono mt-1.5">
                        {idx}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Heap Sort Tree View (if Heap Sort is selected) */}
            {metadata.id === 'heap-sort' && currentStepData && (
              <div className="mt-3 pt-3 border-t border-[#E5E5E0] dark:border-[#2B2B2B] text-center">
                <span className="text-[11px] font-semibold text-[#737373] dark:text-[#A3A3A3] block mb-2">
                  Binary Heap Representation (Max-Heap Array Projection):
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-mono">
                  {currentStepData.arrayState.map((val, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-1 rounded border text-xs ${
                        idx === 0
                          ? 'border-[#F5C542] bg-[#F5C542]/20 font-bold text-[#111111] dark:text-[#F5C542]'
                          : 'border-[#E5E5E0] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#525252] dark:text-[#D4D4D4]'
                      }`}
                    >
                      <span className="text-[9px] text-[#A3A3A3] mr-1">#{idx}:</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEARCHING VISUALIZATION */}
        {isSearching && currentStepData && 'currentIndex' in currentStepData && (
          <div className="w-full h-full flex flex-col justify-center items-center py-6">
            {(() => {
              const step = currentStepData as SearchingStep;
              const arr = step.arrayState;
              const target = step.target;
              const curr = step.currentIndex;
              const low = step.lowIndex;
              const high = step.highIndex;
              const mid = step.midIndex;

              return (
                <div className="w-full max-w-4xl space-y-6">
                  {/* Target Card */}
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">
                      Searching for Target:
                    </span>
                    <span className="px-3 py-1 bg-[#F5C542] text-[#111111] font-bold font-mono text-sm rounded-lg shadow-xs">
                      {target}
                    </span>
                  </div>

                  {/* Array Cells */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {arr.map((val, idx) => {
                      const isTargetMatch = step.found && (curr === idx || mid === idx);
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

                          {/* Cell Box */}
                          <div
                            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg border flex items-center justify-center font-mono text-sm sm:text-base transition-all duration-200 shadow-xs ${cellBg}`}
                          >
                            {val}
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

        {/* GRAPH VISUALIZATION (BFS / DIJKSTRA) */}
        {isGraph && currentStepData && (
          <div className="w-full h-full flex flex-col justify-between">
            {(() => {
              const step = currentStepData as GraphStep;
              const activeNodeId = step.activeNode;
              const visitedList = step.visitedNodes || [];
              const shortestPath = step.shortestPath || [];
              const distances = step.distances || {};
              const queue = step.queueState || [];

              return (
                <div className="w-full flex flex-col h-full">
                  {/* SVG Canvas for Nodes & Edges */}
                  <div className="relative w-full h-[240px] sm:h-[270px]">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 700 320">
                      {/* Render Edges */}
                      {edges.map((edge, i) => {
                        const fromNode = nodes.find((n) => n.id === edge.from);
                        const toNode = nodes.find((n) => n.id === edge.to);
                        if (!fromNode || !toNode) return null;

                        // Check if edge is on shortest path
                        const isShortestEdge =
                          shortestPath.length > 1 &&
                          shortestPath.some(
                            (pNode, pIdx) =>
                              (pNode === edge.from && shortestPath[pIdx + 1] === edge.to) ||
                              (pNode === edge.to && shortestPath[pIdx + 1] === edge.from)
                          );

                        const isActiveRelaxationEdge =
                          step.activeEdge &&
                          ((step.activeEdge.from === edge.from && step.activeEdge.to === edge.to) ||
                            (step.activeEdge.from === edge.to && step.activeEdge.to === edge.from));

                        const strokeColor = isShortestEdge
                          ? '#F5C542'
                          : isActiveRelaxationEdge
                          ? '#D4A72C'
                          : '#D4D4CE';

                        const strokeWidth = isShortestEdge ? 4 : isActiveRelaxationEdge ? 3 : 1.5;

                        // Midpoint for weight label
                        const midX = (fromNode.x + toNode.x) / 2;
                        const midY = (fromNode.y + toNode.y) / 2;

                        return (
                          <g key={i}>
                            <line
                              x1={fromNode.x}
                              y1={fromNode.y}
                              x2={toNode.x}
                              y2={toNode.y}
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={isActiveRelaxationEdge ? '4 4' : undefined}
                              className="transition-all duration-200"
                            />
                            {edge.weight !== undefined && (
                              <g transform={`translate(${midX}, ${midY})`}>
                                <circle r="10" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1" />
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  className="text-[10px] font-mono font-bold fill-[#171717]"
                                >
                                  {edge.weight}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}

                      {/* Render Nodes */}
                      {nodes.map((node) => {
                        const isActive = node.id === activeNodeId;
                        const isVisited = visitedList.includes(node.id);
                        const isPath = shortestPath.includes(node.id);
                        const isStart = node.id === startNode;
                        const isTarget = node.id === targetNode;

                        let fill = '#FFFFFF';
                        let stroke = '#171717';
                        let textColor = '#171717';

                        if (isActive) {
                          fill = '#F5C542';
                          stroke = '#111111';
                          textColor = '#111111';
                        } else if (isPath) {
                          fill = '#F5C542';
                          stroke = '#171717';
                          textColor = '#111111';
                        } else if (isVisited) {
                          fill = '#10B981';
                          stroke = '#047857';
                          textColor = '#FFFFFF';
                        }

                        return (
                          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            {/* Outer halo if active or path */}
                            {(isActive || isPath) && (
                              <circle
                                r="24"
                                fill="none"
                                stroke="#F5C542"
                                strokeWidth="2"
                                opacity="0.6"
                              />
                            )}

                            {/* Node Circle */}
                            <circle
                              r="18"
                              fill={fill}
                              stroke={stroke}
                              strokeWidth={isActive || isPath ? '2.5' : '1.5'}
                              className="transition-all duration-200 cursor-pointer"
                            />

                            {/* Node Label */}
                            <text
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="text-xs font-bold font-mono"
                              fill={textColor}
                            >
                              {node.id}
                            </text>

                            {/* Distance or Role Tag */}
                            <text
                              y="28"
                              textAnchor="middle"
                              className="text-[10px] font-sans font-semibold fill-[#737373] dark:fill-[#A3A3A3]"
                            >
                              {isStart && 'Start '}
                              {isTarget && 'Target '}
                              {distances[node.id] !== undefined &&
                                `(${distances[node.id] === Infinity ? '∞' : distances[node.id]})`}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Status Strip: BFS Queue or Dijkstra Distances */}
                  <div className="pt-3 border-t border-[#E5E5E0] dark:border-[#2B2B2B] flex flex-wrap items-center justify-between gap-3 text-xs">
                    {metadata.id === 'bfs' ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#525252] dark:text-[#A3A3A3]">
                          FIFO Queue:
                        </span>
                        <div className="flex items-center gap-1 font-mono">
                          {queue.length === 0 ? (
                            <span className="text-[#A3A3A3] italic">[Empty]</span>
                          ) : (
                            queue.map((qNode, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-white dark:bg-[#202020] border border-[#E5E5E0] dark:border-[#333333] font-bold"
                              >
                                {qNode}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#525252] dark:text-[#A3A3A3]">
                          Tentative Distances:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                          {Object.entries(distances).map(([nId, dist]) => (
                            <span
                              key={nId}
                              className={`px-1.5 py-0.5 rounded border ${
                                nId === activeNodeId
                                  ? 'bg-[#F5C542]/20 border-[#D4A72C] text-[#111111] dark:text-[#F5C542] font-bold'
                                  : 'bg-white dark:bg-[#202020] border-[#E5E5E0] dark:border-[#333333] text-[#525252] dark:text-[#D4D4D4]'
                              }`}
                            >
                              {nId}: {dist === Infinity ? '∞' : dist}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {shortestPath.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span>Path: {shortestPath.join(' → ')}</span>
                      </div>
                    )}
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
