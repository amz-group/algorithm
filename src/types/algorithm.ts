export type AlgorithmId =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort'
  | 'linear-search'
  | 'binary-search'
  | 'bfs'
  | 'dijkstra';

export type AlgorithmCategory = 'sorting' | 'searching' | 'graph';

export type LanguageId = 'java' | 'cpp' | 'python' | 'csharp' | 'javascript';

export type DataElement = number | string;

export interface ComplexityInfo {
  bestTime: string;
  averageTime: string;
  worstTime: string;
  space: string;
  stability?: 'Stable' | 'Unstable' | 'N/A';
}

export interface AlgorithmMetadata {
  id: AlgorithmId;
  name: string;
  shortName: string;
  codeNumber: string; // e.g. "A.1", "A.2"
  category: AlgorithmCategory;
  categoryLabel: string;
  shortDescription: string;
  definition: string;
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  bestUseCases: string[];
  complexity: ComplexityInfo;
  defaultInput: DataElement[];
  sampleExample: string;
}

export interface SortingStep {
  stepIndex: number;
  arrayState: DataElement[];
  highlightIndices: number[]; // e.g., elements currently compared or visited
  swapIndices?: [number, number]; // elements being swapped
  sortedIndices: number[]; // elements confirmed in their final sorted position
  pivotIndex?: number; // for quick sort
  heapSize?: number; // for heap sort
  auxiliaryState?: { [key: string]: any }; // for merge sort or custom states
  operation: string;
  description: string;
  decision: string;
  valuesExamined: string;
  beforeState: string;
  afterState: string;
}

export interface SearchingStep {
  stepIndex: number;
  arrayState: DataElement[];
  currentIndex: number;
  lowIndex?: number;
  highIndex?: number;
  midIndex?: number;
  target: DataElement;
  found: boolean;
  operation: string;
  description: string;
  decision: string;
  valuesExamined: string;
  beforeState: string;
  afterState: string;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface GraphStep {
  stepIndex: number;
  activeNode: string;
  visitedNodes: string[];
  queueState?: string[]; // For BFS
  distances?: { [nodeId: string]: number }; // For Dijkstra
  predecessors?: { [nodeId: string]: string | null }; // For Dijkstra
  activeEdge?: { from: string; to: string };
  shortestPath?: string[];
  operation: string;
  description: string;
  decision: string;
  valuesExamined: string;
  beforeState: string;
  afterState: string;
}

export type ExecutionStep = SortingStep | SearchingStep | GraphStep;

export interface ExecutionResult {
  algorithmId: AlgorithmId;
  algorithmName: string;
  executionTimeMs: number;
  totalSteps: number;
  comparisonsCount: number;
  swapsCount: number;
  // Sorting specific
  inputArray?: DataElement[];
  outputArray?: DataElement[];
  isSorted?: boolean;
  // Searching specific
  targetValue?: DataElement;
  found?: boolean;
  foundIndex?: number;
  // Graph specific
  startNode?: string;
  targetNode?: string;
  traversalOrder?: string[];
  shortestPath?: string[];
  shortestDistance?: number;
  visitedCount?: number;
  steps: ExecutionStep[];
}
