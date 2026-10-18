import { ExecutionResult } from '../types/algorithm';

function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadResultAsTxt(result: ExecutionResult) {
  const dateStr = new Date().toISOString();
  let content = `=======================================================\n`;
  content += `KRD ALGORITHM - ANALYSIS EXECUTION RESULT\n`;
  content += `=======================================================\n`;
  content += `Generated: ${dateStr}\n`;
  content += `Algorithm: ${result.algorithmName} (${result.algorithmId})\n`;
  content += `Measured Time: ${result.executionTimeMs} ms\n`;
  content += `Total Steps: ${result.totalSteps}\n`;
  content += `Comparisons: ${result.comparisonsCount}\n`;
  content += `Swaps / Operations: ${result.swapsCount}\n\n`;

  if (result.inputArray) {
    content += `Original Input Dataset (${result.inputArray.length} items):\n`;
    content += `${result.inputArray.join(', ')}\n\n`;
  }

  if (result.outputArray) {
    content += `Sorted Output Dataset (${result.outputArray.length} items):\n`;
    content += `${result.outputArray.join(', ')}\n\n`;
  }

  if (result.targetValue !== undefined) {
    content += `Search Target: ${result.targetValue}\n`;
    content += `Found: ${result.found ? 'YES' : 'NO'}\n`;
    content += `Target Index: ${result.foundIndex !== undefined && result.foundIndex >= 0 ? result.foundIndex : 'Not Found (-1)'}\n\n`;
  }

  if (result.traversalOrder) {
    content += `Graph Traversal Order: ${result.traversalOrder.join(' -> ')}\n`;
  }

  if (result.shortestPath) {
    content += `Shortest Path: ${result.shortestPath.join(' -> ')}\n`;
    content += `Total Distance / Weight: ${result.shortestDistance}\n`;
  }

  content += `\n=======================================================\n`;
  content += `KRD ALGORITHM Platform - Computer Science Education\n`;
  content += `=======================================================\n`;

  triggerDownload(content, `${result.algorithmId}-result.txt`, 'text/plain;charset=utf-8');
}

export function downloadResultAsCsv(result: ExecutionResult) {
  let csv = `Metric,Value\n`;
  csv += `"Algorithm","${result.algorithmName}"\n`;
  csv += `"Algorithm ID","${result.algorithmId}"\n`;
  csv += `"Measured Time (ms)",${result.executionTimeMs}\n`;
  csv += `"Total Recorded Steps",${result.totalSteps}\n`;
  csv += `"Total Comparisons",${result.comparisonsCount}\n`;
  csv += `"Swaps / Movements",${result.swapsCount}\n`;

  if (result.inputArray) {
    csv += `"Input Length",${result.inputArray.length}\n`;
    csv += `"Input Values","${result.inputArray.join('; ')}"\n`;
  }

  if (result.outputArray) {
    csv += `"Output Length",${result.outputArray.length}\n`;
    csv += `"Output Values","${result.outputArray.join('; ')}"\n`;
  }

  if (result.targetValue !== undefined) {
    csv += `"Target Value",${result.targetValue}\n`;
    csv += `"Found Status","${result.found ? 'Found' : 'Not Found'}"\n`;
    csv += `"Target Index",${result.foundIndex}\n`;
  }

  if (result.shortestPath) {
    csv += `"Shortest Path","${result.shortestPath.join(' -> ')}"\n`;
    csv += `"Shortest Distance",${result.shortestDistance}\n`;
  }

  triggerDownload(csv, `${result.algorithmId}-result.csv`, 'text/csv;charset=utf-8');
}

export function downloadDetailedAnalysisTxt(result: ExecutionResult) {
  let content = `========================================================================\n`;
  content += `KRD ALGORITHM - COMPREHENSIVE STEP-BY-STEP AUDIT TRACE\n`;
  content += `========================================================================\n`;
  content += `Algorithm: ${result.algorithmName}\n`;
  content += `Timestamp: ${new Date().toISOString()}\n`;
  content += `Total Operations Executed: ${result.totalSteps}\n`;
  content += `Comparisons: ${result.comparisonsCount} | Swaps/Mutations: ${result.swapsCount}\n`;
  content += `Execution Time: ${result.executionTimeMs} ms\n\n`;

  content += `------------------------------------------------------------------------\n`;
  content += `STEP-BY-STEP OPERATION LOG:\n`;
  content += `------------------------------------------------------------------------\n\n`;

  result.steps.forEach((step, idx) => {
    content += `[Step ${idx + 1} / ${result.steps.length}] - ${step.operation}\n`;
    content += `  Values Examined: ${step.valuesExamined}\n`;
    content += `  Decision / Action: ${step.decision}\n`;
    content += `  Explanation: ${step.description}\n`;
    content += `  State Before: ${step.beforeState}\n`;
    content += `  State After:  ${step.afterState}\n`;
    content += `------------------------------------------------------------------------\n`;
  });

  triggerDownload(content, `${result.algorithmId}-detailed-analysis.txt`, 'text/plain;charset=utf-8');
}

export function downloadStepHistoryAsCsv(result: ExecutionResult) {
  let csv = `StepIndex,Operation,ValuesExamined,Decision,Description,BeforeState,AfterState\n`;

  result.steps.forEach((s) => {
    const esc = (text: string) => `"${(text || '').replace(/"/g, '""')}"`;
    csv += `${s.stepIndex},${esc(s.operation)},${esc(s.valuesExamined)},${esc(s.decision)},${esc(s.description)},${esc(s.beforeState)},${esc(s.afterState)}\n`;
  });

  triggerDownload(csv, `${result.algorithmId}-step-history.csv`, 'text/csv;charset=utf-8');
}

export function downloadJsonResults(result: ExecutionResult) {
  const exportPayload = {
    platform: 'KRD ALGORITHM',
    version: '1.0.0',
    exportTimestamp: new Date().toISOString(),
    algorithm: {
      id: result.algorithmId,
      name: result.algorithmName
    },
    performance: {
      executionTimeMs: result.executionTimeMs,
      totalSteps: result.totalSteps,
      comparisons: result.comparisonsCount,
      swapsOrMovements: result.swapsCount
    },
    dataset: {
      input: result.inputArray,
      output: result.outputArray,
      target: result.targetValue,
      found: result.found,
      foundIndex: result.foundIndex,
      shortestPath: result.shortestPath,
      shortestDistance: result.shortestDistance,
      traversalOrder: result.traversalOrder
    },
    steps: result.steps
  };

  const json = JSON.stringify(exportPayload, null, 2);
  triggerDownload(json, `${result.algorithmId}-complete-analysis.json`, 'application/json;charset=utf-8');
}
