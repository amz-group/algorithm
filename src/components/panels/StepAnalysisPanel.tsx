import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  FastForward,
  Gauge
} from 'lucide-react';
import { ExecutionStep } from '../../types/algorithm';

interface StepAnalysisPanelProps {
  steps: ExecutionStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onReset: () => void;
  onPlayAll: () => void;
  onJumpToStep: (idx: number) => void;
  speedMs: number;
  onSpeedChange: (speed: number) => void;
}

export const StepAnalysisPanel: React.FC<StepAnalysisPanelProps> = ({
  steps,
  currentStepIndex,
  isPlaying,
  onPlay,
  onPause,
  onPrevStep,
  onNextStep,
  onReset,
  onPlayAll,
  onJumpToStep,
  speedMs,
  onSpeedChange
}) => {
  const currentStep = steps[currentStepIndex] || null;
  const totalSteps = steps.length;
  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E5E0] dark:border-[#2E2E2E] p-3.5 sm:p-4 transition-colors space-y-3">
      {/* Playback Controls & Scrubber in One Clean Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            title="Reset"
            className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex <= 0}
            title="Previous"
            className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] disabled:opacity-30 transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {isPlaying ? (
            <button
              onClick={onPause}
              className="px-3 py-1.5 rounded-lg bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              disabled={currentStepIndex >= totalSteps - 1}
              className="px-3 py-1.5 rounded-lg bg-[#F5C542] hover:bg-[#e6b635] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-40"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{currentStepIndex > 0 && currentStepIndex < totalSteps - 1 ? 'Resume' : 'Play'}</span>
            </button>
          )}

          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Next"
            className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] disabled:opacity-30 transition-colors"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onPlayAll}
            title="Jump to Final Step"
            className="p-1.5 rounded-md text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F2ED] dark:hover:bg-[#282828] transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Slider & Step counter */}
        <div className="flex-1 max-w-md flex items-center gap-2.5">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex !== undefined && !isNaN(currentStepIndex) ? currentStepIndex : 0}
            onChange={(e) => onJumpToStep(Number(e.target.value))}
            disabled={totalSteps <= 1}
            className="w-full h-1.5 bg-[#E5E5E0] dark:bg-[#333333] rounded-lg appearance-none cursor-pointer accent-[#D4A72C]"
          />
          <span className="font-mono text-xs font-semibold text-[#171717] dark:text-[#FAFAFA] whitespace-nowrap">
            {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
          </span>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#A3A3A3]">
          <Gauge className="w-3.5 h-3.5 text-[#D4A72C]" />
          <select
            value={speedMs}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#333333] rounded px-2 py-1 text-xs text-[#171717] dark:text-[#FAFAFA]"
          >
            <option value={1000}>0.5x</option>
            <option value={600}>1.0x</option>
            <option value={300}>1.5x</option>
            <option value={150}>2.5x</option>
          </select>
        </div>
      </div>

      {/* Step Explanation Callout (Clean & Single Card) */}
      {currentStep && (
        <div className="p-3 rounded-lg bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5E0] dark:border-[#282828] text-xs space-y-1.5">
          <div className="flex items-center justify-between gap-2 font-mono font-bold text-[#171717] dark:text-[#FAFAFA]">
            <span>{currentStep.operation}</span>
            <span className="text-[11px] font-normal text-[#737373] dark:text-[#A3A3A3]">
              {currentStep.valuesExamined}
            </span>
          </div>

          <p className="text-[#404040] dark:text-[#CCCCCC] leading-relaxed">
            {currentStep.description}
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[#737373] dark:text-[#888888] pt-1 border-t border-[#E5E5E0]/60 dark:border-[#282828]">
            <span>Before: <code className="font-mono text-[#525252] dark:text-[#AAAAAA]">{currentStep.beforeState}</code></span>
            <span>After: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{currentStep.afterState}</code></span>
          </div>
        </div>
      )}
    </div>
  );
};
