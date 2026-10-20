import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmId, ExecutionResult, DataElement } from '../../types/algorithm';
import { ALGORITHM_DEFINITIONS } from '../../data/algorithmDefinitions';
import { runSortingAlgorithm } from '../../engine/sortingEngine';
import { runSearchingAlgorithm } from '../../engine/searchingEngine';
import { soundEffects } from '../../utils/audio';

import { InputPanel } from '../panels/InputPanel';
import { VisualizationPanel } from '../panels/VisualizationPanel';
import { StepAnalysisPanel } from '../panels/StepAnalysisPanel';
import { ResultPanel } from '../panels/ResultPanel';
import { SourceCodePanel } from '../panels/SourceCodePanel';
import { BarChart3, Code2 } from 'lucide-react';

interface AlgorithmWorkspaceProps {
  algorithmId: AlgorithmId;
  onRecordUsage?: (id: AlgorithmId) => void;
}

type WorkspaceTab = 'result' | 'code';

export const AlgorithmWorkspace: React.FC<AlgorithmWorkspaceProps> = ({
  algorithmId,
  onRecordUsage
}) => {
  const metadata = ALGORITHM_DEFINITIONS[algorithmId];

  // Active Bottom Tab: Keeps the page uncluttered and simple
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('result');

  // Input States
  const [currentInput, setCurrentInput] = useState<DataElement[]>(metadata.defaultInput);
  const [targetValue, setTargetValue] = useState<DataElement>(
    algorithmId === 'binary-search' ? 23 : 70
  );

  // Execution result & step playback state
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Execute algorithm when algorithmId or input changes
  const executeCurrentAlgorithm = (newArr?: DataElement[]) => {
    const inputArr = newArr || currentInput;
    try {
      let res: ExecutionResult;

      if (metadata.category === 'sorting') {
        res = runSortingAlgorithm(algorithmId, inputArr);
      } else {
        res = runSearchingAlgorithm(algorithmId, inputArr, targetValue);
      }

      setResult(res);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      if (onRecordUsage) onRecordUsage(algorithmId);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    setCurrentInput(metadata.defaultInput);
    if (algorithmId === 'binary-search') {
      setTargetValue(23);
    } else if (algorithmId === 'linear-search') {
      setTargetValue(70);
    }
    executeCurrentAlgorithm(metadata.defaultInput);
  }, [algorithmId]);

  // Step Playback Loop
  useEffect(() => {
    if (isPlaying) {
      if (!result || currentStepIndex >= result.steps.length - 1) {
        setIsPlaying(false);
        soundEffects.playSuccess();
        return;
      }

      timerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          const next = prev + 1;
          const nextStep = result.steps[next];
          if (nextStep && 'swapIndices' in nextStep && nextStep.swapIndices) {
            soundEffects.playSwap();
          } else {
            soundEffects.playCompare();
          }

          if (next >= result.steps.length - 1) {
            setIsPlaying(false);
            soundEffects.playSuccess();
          }
          return next;
        });
      }, speedMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, result, speedMs]);

  const handlePlay = () => {
    if (result && currentStepIndex < result.steps.length - 1) {
      setIsPlaying(true);
      soundEffects.playClick();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    soundEffects.playClick();
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      soundEffects.playStep();
    }
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (result && currentStepIndex < result.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      soundEffects.playStep();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    soundEffects.playReset();
  };

  const handlePlayAll = () => {
    setIsPlaying(false);
    if (result) {
      setCurrentStepIndex(result.steps.length - 1);
      soundEffects.playSuccess();
    }
  };

  const handleJumpToStep = (idx: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(idx);
    soundEffects.playStep();
  };

  const handleInputAnalyze = (newArr: DataElement[]) => {
    setCurrentInput(newArr);
    executeCurrentAlgorithm(newArr);
    setActiveTab('result');
    soundEffects.playSwap();
  };

  const currentStepData = result ? result.steps[currentStepIndex] : null;

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-8">
      {/* 1. INPUT PANEL */}
      <InputPanel
        metadata={metadata}
        currentInput={currentInput}
        onAnalyze={handleInputAnalyze}
        targetValue={targetValue}
        onTargetChange={(val) => {
          setTargetValue(val);
          if (result) {
            const res = runSearchingAlgorithm(algorithmId, currentInput, val);
            setResult(res);
            setCurrentStepIndex(0);
            setIsPlaying(false);
          }
        }}
      />

      {/* 2. VISUALIZATION CANVAS (Main Stage) */}
      <VisualizationPanel
        metadata={metadata}
        currentStepData={currentStepData}
      />

      {/* 3. STEP ANALYSIS & CONTROLS */}
      <StepAnalysisPanel
        steps={result ? result.steps : []}
        currentStepIndex={currentStepIndex}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
        onReset={handleReset}
        onPlayAll={handlePlayAll}
        onJumpToStep={handleJumpToStep}
        speedMs={speedMs}
        onSpeedChange={setSpeedMs}
      />

      {/* 4. UNIFIED TABBED VIEW */}
      <div className="pt-2">
        {/* Clean Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EBEBE6] dark:bg-[#1A1A1A] rounded-xl w-fit mb-3 border border-[#E5E5E0] dark:border-[#282828]">
          <button
            onClick={() => setActiveTab('result')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'result'
                ? 'bg-white dark:bg-[#282828] text-[#111111] dark:text-[#FAFAFA] shadow-xs'
                : 'text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-[#FAFAFA]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Analysis Result</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white dark:bg-[#282828] text-[#111111] dark:text-[#FAFAFA] shadow-xs'
                : 'text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-[#FAFAFA]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Source Code (5 Languages)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'result' && result && (
          <ResultPanel result={result} metadata={metadata} />
        )}

        {activeTab === 'code' && (
          <SourceCodePanel algorithmId={algorithmId} />
        )}
      </div>
    </div>
  );
};
