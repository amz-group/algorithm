import { AlgorithmId, ExecutionResult, SearchingStep } from '../types/algorithm';

export function runSearchingAlgorithm(
  algorithmId: AlgorithmId,
  input: number[],
  target: number
): ExecutionResult {
  const startTime = performance.now();
  const arr = [...input];
  const steps: SearchingStep[] = [];
  let comparisons = 0;
  let found = false;
  let foundIndex = -1;

  steps.push({
    stepIndex: 0,
    arrayState: [...arr],
    currentIndex: -1,
    target,
    found: false,
    operation: 'Initialization',
    description: `Target value is ${target}. Array has ${arr.length} elements.`,
    decision: 'Prepare search pointers.',
    valuesExamined: `Target = ${target}`,
    beforeState: `[${arr.join(', ')}]`,
    afterState: `[${arr.join(', ')}]`
  });

  if (algorithmId === 'linear-search') {
    let stepCount = steps.length;
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      const currentVal = arr[i];
      const isMatch = currentVal === target;

      if (isMatch) {
        found = true;
        foundIndex = i;
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          currentIndex: i,
          target,
          found: true,
          operation: `Match Found at Index ${i}`,
          description: `Examining index ${i}. Value ${currentVal} matches target ${target}! Search succeeds.`,
          decision: `Target found. Terminate search.`,
          valuesExamined: `A[${i}]=${currentVal}, Target=${target}`,
          beforeState: `Examining index ${i}`,
          afterState: `Match confirmed at index ${i}`
        });
        break;
      } else {
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          currentIndex: i,
          target,
          found: false,
          operation: `Inspect Index ${i}`,
          description: `Examining index ${i}. Value ${currentVal} does not match target ${target}. Advancing to index ${i + 1}.`,
          decision: `No match. Continue scan.`,
          valuesExamined: `A[${i}]=${currentVal}, Target=${target}`,
          beforeState: `Inspecting index ${i}`,
          afterState: `Index ${i} rejected`
        });
      }
    }

    if (!found) {
      steps.push({
        stepIndex: steps.length,
        arrayState: [...arr],
        currentIndex: -1,
        target,
        found: false,
        operation: 'Target Not Found',
        description: `Exhausted all ${arr.length} elements without finding target ${target}. Search terminates with -1.`,
        decision: 'Target does not exist in array.',
        valuesExamined: 'All array elements',
        beforeState: 'Array fully inspected',
        afterState: 'Return -1'
      });
    }
  } else if (algorithmId === 'binary-search') {
    let stepCount = steps.length;
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      comparisons++;
      const mid = low + Math.floor((high - low) / 2);
      const midVal = arr[mid];

      if (midVal === target) {
        found = true;
        foundIndex = mid;
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          currentIndex: mid,
          lowIndex: low,
          highIndex: high,
          midIndex: mid,
          target,
          found: true,
          operation: `Target Found at Mid (Index ${mid})`,
          description: `Calculated midpoint index ${mid} = ${low} + ⌊(${high} - ${low}) / 2⌋. A[${mid}] (${midVal}) matches target ${target}!`,
          decision: `Target located at index ${mid}. Terminate.`,
          valuesExamined: `A[${mid}]=${midVal}, Target=${target}`,
          beforeState: `Active search window [${low}..${high}]`,
          afterState: `Match confirmed at index ${mid}`
        });
        break;
      } else if (midVal < target) {
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          currentIndex: mid,
          lowIndex: low,
          highIndex: high,
          midIndex: mid,
          target,
          found: false,
          operation: `Bisect: Target in Right Half`,
          description: `A[${mid}] (${midVal}) < Target (${target}). Target must lie to the right of index ${mid}. Discarding left range [${low}..${mid}].`,
          decision: `Set Low = ${mid + 1}.`,
          valuesExamined: `A[${mid}]=${midVal}, Target=${target}`,
          beforeState: `Active search window [${low}..${high}]`,
          afterState: `New window [${mid + 1}..${high}]`
        });
        low = mid + 1;
      } else {
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          currentIndex: mid,
          lowIndex: low,
          highIndex: high,
          midIndex: mid,
          target,
          found: false,
          operation: `Bisect: Target in Left Half`,
          description: `A[${mid}] (${midVal}) > Target (${target}). Target must lie to the left of index ${mid}. Discarding right range [${mid}..${high}].`,
          decision: `Set High = ${mid - 1}.`,
          valuesExamined: `A[${mid}]=${midVal}, Target=${target}`,
          beforeState: `Active search window [${low}..${high}]`,
          afterState: `New window [${low}..${mid - 1}]`
        });
        high = mid - 1;
      }
    }

    if (!found) {
      steps.push({
        stepIndex: steps.length,
        arrayState: [...arr],
        currentIndex: -1,
        lowIndex: low,
        highIndex: high,
        target,
        found: false,
        operation: 'Target Not Found',
        description: `Search window collapsed (Low ${low} > High ${high}). Target ${target} is not in the array. Returning -1.`,
        decision: 'Target does not exist in sorted array.',
        valuesExamined: 'Search interval empty',
        beforeState: `Low ${low} > High ${high}`,
        afterState: 'Return -1'
      });
    }
  }

  const endTime = performance.now();
  return {
    algorithmId,
    algorithmName: algorithmId,
    executionTimeMs: Number((endTime - startTime).toFixed(3)),
    totalSteps: steps.length,
    comparisonsCount: comparisons,
    swapsCount: 0,
    inputArray: [...input],
    targetValue: target,
    found,
    foundIndex,
    steps
  };
}
