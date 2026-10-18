import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmId, ExecutionResult } from '../../types/algorithm';
import { ALGORITHM_DEFINITIONS } from '../../data/algorithmDefinitions';
import { GRAPH_PRESETS } from '../../data/graphPresets';
import { runSortingAlgorithm } from '../../engine/sortingEngine';
import { runSearchingAlgorithm } from '../../engine/searchingEngine';
import { runGraphAlgorithm } from '../../engine/graphEngine';
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
  const [currentInput, setCurrentInput] = useState<number[]>(metadata.defaultInput);
  const [targetValue, setTargetValue] = useState<number>(
    algorithmId === 'binary-search' ? 23 : 70
  );

  // Graph specifics
  const [selectedPresetId, setSelectedPresetId] = useState<string>('transit-network');
  const [startNode, setStartNode] = useState<string>('A');
  const [targetNode, setTargetNode] = useState<string>('F');

  // Execution result & step playback state
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Execute algorithm when algorithmId or input changes
  const executeCurrentAlgorithm = (newArr?: number[]) => {
    const inputArr = newArr || currentInput;
    try {
      let res: ExecutionResult;

      if (metadata.category === 'sorting') {
        res = runSortingAlgorithm(algorithmId, inputArr);
      } else if (metadata.category === 'searching') {
        res = runSearchingAlgorithm(algorithmId, inputArr, targetValue);
      } else {
        const preset = GRAPH_PRESETS.find((p) => p.id === selectedPresetId) || GRAPH_PRESETS[0];
        res = runGraphAlgorithm(algorithmId, preset.nodes, preset.edges, startNode, targetNode);
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
    if (metadata.category === 'graph') {
      const preset = GRAPH_PRESETS.find((p) => p.id === selectedPresetId) || GRAPH_PRESETS[0];
      setStartNode(preset.defaultStartNode);
      setTargetNode(preset.defaultTargetNode);
    }
    executeCurrentAlgorithm(metadata.defaultInput);
  }, [algorithmId]);

  const handleSelectGraphPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = GRAPH_PRESETS.find((p) => p.id === presetId) || GRAPH_PRESETS[0];
    setStartNode(preset.defaultStartNode);
    setTargetNode(preset.defaultTargetNode);

    const res = runGraphAlgorithm(
      algorithmId,
      preset.nodes,
      preset.edges,
      preset.defaultStartNode,
      preset.defaultTargetNode
    );
    setResult(res);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

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
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, result, speedMs]);

  // Playback Handlers
  const handlePlay = () => {
    if (!result || currentStepIndex >= result.steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
    soundEffects.playStep();
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
    soundEffects.playStep();
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

  const handleInputAnalyze = (newArr: number[]) => {
    if (metadata.category !== 'graph') {
      setCurrentInput(newArr);
      executeCurrentAlgorithm(newArr);
    } else {
      executeCurrentAlgorithm();
    }
    setActiveTab('result');
    soundEffects.playSwap();
  };

  const currentPreset =
    GRAPH_PRESETS.find((p) => p.id === selectedPresetId) || GRAPH_PRESETS[0];
  const graphNodesList = currentPreset.nodes.map((n) => n.id);
  const currentStepData = result ? result.steps[currentStepIndex] : null;

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-8">
      {/* 1. INPUT PANEL (Compact, Minimal) */}
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
        selectedPresetId={selectedPresetId}
        onSelectGraphPreset={handleSelectGraphPreset}
        startNode={startNode}
        targetNode={targetNode}
        onStartNodeChange={(n) => {
          setStartNode(n);
          const res = runGraphAlgorithm(
            algorithmId,
            currentPreset.nodes,
            currentPreset.edges,
            n,
            targetNode
          );
          setResult(res);
          setCurrentStepIndex(0);
        }}
        onTargetNodeChange={(n) => {
          setTargetNode(n);
          const res = runGraphAlgorithm(
            algorithmId,
            currentPreset.nodes,
            currentPreset.edges,
            startNode,
            n
          );
          setResult(res);
          setCurrentStepIndex(0);
        }}
        graphNodesList={graphNodesList}
      />

      {/* 2. VISUALIZATION CANVAS (Main Stage) */}
      <VisualizationPanel
        metadata={metadata}
        currentStepData={currentStepData}
        nodes={currentPreset.nodes}
        edges={currentPreset.edges}
        startNode={startNode}
        targetNode={targetNode}
      />

      {/* 3. STEP ANALYSIS & CONTROLS (Compact Streamlined Player) */}
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

      {/* 4. UNIFIED TABBED VIEW (Eliminates Crowded Vertical Stacking) */}
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
