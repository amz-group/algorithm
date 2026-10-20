import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { AlgorithmId, AlgorithmCategory } from '../../types/algorithm';
import { ALGORITHM_DEFINITIONS } from '../../data/algorithmDefinitions';
import { KrdLogo } from '../common/KrdLogo';

interface DashboardViewProps {
  onSelectAlgorithm: (id: AlgorithmId) => void;
  recentAlgorithms: AlgorithmId[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectAlgorithm,
  recentAlgorithms
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AlgorithmCategory>('all');

  // Mini simulation
  const [demoArray, setDemoArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 21]);
  const [demoComparing, setDemoComparing] = useState<[number, number] | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);

  const resetDemo = () => {
    setDemoArray([45, 12, 85, 32, 89, 39, 69, 21]);
    setDemoComparing(null);
    setIsDemoRunning(false);
  };

  const runDemoBubbleSort = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    const arr = [...demoArray];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        setDemoComparing([j, j + 1]);
        await new Promise((r) => setTimeout(r, 180));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setDemoArray([...arr]);
          await new Promise((r) => setTimeout(r, 180));
        }
      }
    }
    setDemoComparing(null);
    setIsDemoRunning(false);
  };

  const allAlgorithms: AlgorithmId[] = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
    'linear-search',
    'binary-search'
  ];

  const filtered = selectedCategory === 'all'
    ? allAlgorithms
    : allAlgorithms.filter((id) => ALGORITHM_DEFINITIONS[id].category === selectedCategory);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Clean, Simple Header with Official Emblem */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E5E0] dark:border-[#282828]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-[#D4A72C]/40 p-1 flex items-center justify-center shrink-0 shadow-xs">
            <KrdLogo variant="emblem" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171717] dark:text-[#FAFAFA]">
              Algorithm Directory
            </h1>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
              Select an algorithm to visualize steps, inspect performance, and view source code.
            </p>
          </div>
        </div>

        {/* Clean Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#EBEBE6] dark:bg-[#1E1E1E] rounded-lg text-xs font-medium">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-[#2A2A2A] text-[#111111] dark:text-[#FAFAFA] shadow-xs font-semibold'
                : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            All (8)
          </button>
          <button
            onClick={() => setSelectedCategory('sorting')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedCategory === 'sorting'
                ? 'bg-white dark:bg-[#2A2A2A] text-[#111111] dark:text-[#FAFAFA] shadow-xs font-semibold'
                : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            Sorting (6)
          </button>
          <button
            onClick={() => setSelectedCategory('searching')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedCategory === 'searching'
                ? 'bg-white dark:bg-[#2A2A2A] text-[#111111] dark:text-[#FAFAFA] shadow-xs font-semibold'
                : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            Searching (2)
          </button>
        </div>
      </div>

      {/* Algorithms Grid (Clean, Simple, Minimal Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((id) => {
          const meta = ALGORITHM_DEFINITIONS[id];
          return (
            <div
              key={id}
              onClick={() => onSelectAlgorithm(id)}
              className="p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-[#E5E5E0] dark:border-[#2E2E2E] hover:border-[#D4A72C] transition-all cursor-pointer shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[11px] font-semibold text-[#B88714] dark:text-[#F5C542]">
                    {meta.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[#737373] dark:text-[#888888]">
                    {meta.complexity.averageTime}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#171717] dark:text-[#FAFAFA] group-hover:text-[#D4A72C] transition-colors">
                  {meta.name}
                </h3>
                <p className="text-xs text-[#737373] dark:text-[#AAAAAA] mt-1 line-clamp-2 leading-relaxed">
                  {meta.shortDescription}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F0F0EC] dark:border-[#282828] flex items-center justify-between text-xs text-[#737373] dark:text-[#888888]">
                <span>Space: <strong className="font-mono text-[#171717] dark:text-[#FAFAFA]">{meta.complexity.space}</strong></span>
                <span className="text-[#D4A72C] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimal Live Visual Simulation Strip */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-[#E5E5E0] dark:border-[#2E2E2E] shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F0F0EC] dark:border-[#282828]">
          <span className="text-xs font-bold text-[#171717] dark:text-[#FAFAFA]">
            Live Visualization Preview
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={resetDemo}
              disabled={isDemoRunning}
              className="p-1 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-white"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={runDemoBubbleSort}
              disabled={isDemoRunning}
              className="px-3 py-1 text-xs font-bold rounded-md bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <Play className="w-3 h-3 fill-current" />
              {isDemoRunning ? 'Sorting...' : 'Play'}
            </button>
          </div>
        </div>

        {/* Compact bars */}
        <div className="h-28 flex items-end justify-center gap-2 p-2 bg-[#F7F7F4] dark:bg-[#141414] rounded-lg">
          {demoArray.map((val, idx) => {
            const isComparing = demoComparing?.includes(idx);
            const height = Math.round((val / 100) * 85) + 12;
            return (
              <div key={idx} className="flex-1 max-w-10 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] font-mono mb-1 text-[#737373]">{val}</span>
                <div
                  style={{ height: `${height}px` }}
                  className={`w-full rounded-t-sm transition-all duration-150 ${
                    isComparing ? 'bg-[#F5C542]' : 'bg-[#171717] dark:bg-[#3E3E3E]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
