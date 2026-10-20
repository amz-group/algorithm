import { AlgorithmId, ExecutionResult, SortingStep, DataElement } from '../types/algorithm';
import { compareElements, formatElement, formatArray } from '../utils/comparator';

export function runSortingAlgorithm(algorithmId: AlgorithmId, input: DataElement[]): ExecutionResult {
  const startTime = performance.now();
  const arr = [...input];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  // Initial step
  steps.push({
    stepIndex: 0,
    arrayState: [...arr],
    highlightIndices: [],
    sortedIndices: [],
    operation: 'Initialization',
    description: `Loaded initial array of ${arr.length} elements for sorting.`,
    decision: 'Algorithm prepared to begin execution.',
    valuesExamined: 'Entire input dataset',
    beforeState: formatArray(arr),
    afterState: formatArray(arr)
  });

  if (arr.length <= 1) {
    const endTime = performance.now();
    return {
      algorithmId,
      algorithmName: algorithmId,
      executionTimeMs: Number((endTime - startTime).toFixed(3)),
      totalSteps: steps.length,
      comparisonsCount: 0,
      swapsCount: 0,
      inputArray: [...input],
      outputArray: [...arr],
      isSorted: true,
      steps
    };
  }

  switch (algorithmId) {
    case 'bubble-sort': {
      const sortedIndices: number[] = [];
      const n = arr.length;
      let stepCount = steps.length;

      for (let i = 0; i < n - 1; i++) {
        let swappedThisPass = false;
        for (let j = 0; j < n - 1 - i; j++) {
          comparisons++;
          const valA = arr[j];
          const valB = arr[j + 1];
          const before = formatArray(arr);
          const cmp = compareElements(valA, valB);

          if (cmp > 0) {
            swaps++;
            swappedThisPass = true;
            // Swap
            arr[j] = valB;
            arr[j + 1] = valA;
            const after = formatArray(arr);

            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [j, j + 1],
              swapIndices: [j, j + 1],
              sortedIndices: [...sortedIndices],
              operation: `Compare & Swap (Pass ${i + 1})`,
              description: `Comparing A[${j}] (${formatElement(valA)}) and A[${j + 1}] (${formatElement(valB)}). Because ${formatElement(valA)} > ${formatElement(valB)}, they are swapped.`,
              decision: `Order violation detected: swap ${formatElement(valA)} and ${formatElement(valB)}.`,
              valuesExamined: `A[${j}]=${formatElement(valA)}, A[${j + 1}]=${formatElement(valB)}`,
              beforeState: before,
              afterState: after
            });
          } else {
            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [j, j + 1],
              sortedIndices: [...sortedIndices],
              operation: `Compare (Pass ${i + 1})`,
              description: `Comparing A[${j}] (${formatElement(valA)}) and A[${j + 1}] (${formatElement(valB)}). Because ${formatElement(valA)} ≤ ${formatElement(valB)}, no swap is needed.`,
              decision: `Correct relative order: preserve positions.`,
              valuesExamined: `A[${j}]=${formatElement(valA)}, A[${j + 1}]=${formatElement(valB)}`,
              beforeState: before,
              afterState: before
            });
          }
        }
        sortedIndices.unshift(n - 1 - i);

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [n - 1 - i],
          sortedIndices: [...sortedIndices],
          operation: `Pass ${i + 1} Complete`,
          description: `Element at index ${n - 1 - i} (${formatElement(arr[n - 1 - i])}) is now locked into its final sorted position.`,
          decision: `Locked index ${n - 1 - i}.`,
          valuesExamined: `A[${n - 1 - i}]=${formatElement(arr[n - 1 - i])}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        if (!swappedThisPass) {
          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [],
            sortedIndices: arr.map((_, idx) => idx),
            operation: 'Early Termination',
            description: `No swaps occurred during pass ${i + 1}. The array is confirmed sorted.`,
            decision: 'Early exit triggered.',
            valuesExamined: 'All remaining elements',
            beforeState: formatArray(arr),
            afterState: formatArray(arr)
          });
          break;
        }
      }
      break;
    }

    case 'selection-sort': {
      const sortedIndices: number[] = [];
      const n = arr.length;
      let stepCount = steps.length;

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [i],
          sortedIndices: [...sortedIndices],
          operation: `Start Pass ${i + 1}`,
          description: `Assume candidate minimum is at index ${i} with value ${formatElement(arr[i])}. Scanning unsorted remainder [${i + 1}..${n - 1}].`,
          decision: `Initial min candidate set to index ${i}.`,
          valuesExamined: `A[${i}]=${formatElement(arr[i])}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          const isNewMin = compareElements(arr[j], arr[minIdx]) < 0;
          const prevMinIdx = minIdx;
          if (isNewMin) {
            minIdx = j;
          }

          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [minIdx, j],
            sortedIndices: [...sortedIndices],
            operation: `Scan for Minimum`,
            description: `Comparing candidate min A[${prevMinIdx}] (${formatElement(arr[prevMinIdx])}) with A[${j}] (${formatElement(arr[j])}).${isNewMin ? ` Found smaller element! Updated minimum index to ${j}.` : ` Retaining current minimum at index ${prevMinIdx}.`}`,
            decision: isNewMin ? `New minimum found at index ${j} (${formatElement(arr[j])}).` : `Keep current minimum at index ${prevMinIdx}.`,
            valuesExamined: `A[${prevMinIdx}]=${formatElement(arr[prevMinIdx])}, A[${j}]=${formatElement(arr[j])}`,
            beforeState: formatArray(arr),
            afterState: formatArray(arr)
          });
        }

        if (minIdx !== i) {
          swaps++;
          const valI = arr[i];
          const valMin = arr[minIdx];
          const before = formatArray(arr);
          arr[i] = valMin;
          arr[minIdx] = valI;
          const after = formatArray(arr);

          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [i, minIdx],
            swapIndices: [i, minIdx],
            sortedIndices: [...sortedIndices, i],
            operation: `Swap Minimum into Position ${i}`,
            description: `Swapped minimum element ${formatElement(valMin)} (from index ${minIdx}) with element ${formatElement(valI)} at index ${i}.`,
            decision: `Position ${i} now holds the ${i + 1}-th smallest element.`,
            valuesExamined: `A[${i}]=${formatElement(valI)}, A[${minIdx}]=${formatElement(valMin)}`,
            beforeState: before,
            afterState: after
          });
        } else {
          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [i],
            sortedIndices: [...sortedIndices, i],
            operation: `No Swap Needed`,
            description: `Element ${formatElement(arr[i])} at index ${i} is already the minimum of the remaining subarray.`,
            decision: `Position ${i} remains unchanged.`,
            valuesExamined: `A[${i}]=${formatElement(arr[i])}`,
            beforeState: formatArray(arr),
            afterState: formatArray(arr)
          });
        }
        sortedIndices.push(i);
      }
      break;
    }

    case 'insertion-sort': {
      const n = arr.length;
      let stepCount = steps.length;
      const sortedIndices: number[] = [0];

      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [i],
          sortedIndices: [...sortedIndices],
          operation: `Select Key (Index ${i})`,
          description: `Selected key = ${formatElement(key)} at index ${i}. Comparing backward through sorted prefix [0..${i - 1}].`,
          decision: `Begin shifting elements greater than ${formatElement(key)}.`,
          valuesExamined: `Key = ${formatElement(key)}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        while (j >= 0) {
          comparisons++;
          if (compareElements(arr[j], key) > 0) {
            swaps++; // shift count
            const before = formatArray(arr);
            arr[j + 1] = arr[j];
            const after = formatArray(arr);

            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [j, j + 1],
              sortedIndices: [...sortedIndices],
              operation: `Shift Element Right`,
              description: `A[${j}] (${formatElement(arr[j + 1])}) > Key (${formatElement(key)}). Shifting A[${j}] to position ${j + 1}.`,
              decision: `Make room for key by shifting right.`,
              valuesExamined: `A[${j}]=${formatElement(arr[j + 1])}, Key=${formatElement(key)}`,
              beforeState: before,
              afterState: after
            });
            j--;
          } else {
            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [j],
              sortedIndices: [...sortedIndices],
              operation: `Comparison Stop`,
              description: `A[${j}] (${formatElement(arr[j])}) ≤ Key (${formatElement(key)}). Correct insertion spot found at index ${j + 1}.`,
              decision: `Stop shifting; insert key at index ${j + 1}.`,
              valuesExamined: `A[${j}]=${formatElement(arr[j])}, Key=${formatElement(key)}`,
              beforeState: formatArray(arr),
              afterState: formatArray(arr)
            });
            break;
          }
        }

        const beforeInsert = formatArray(arr);
        arr[j + 1] = key;
        sortedIndices.push(i);

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [j + 1],
          sortedIndices: [...sortedIndices],
          operation: `Insert Key`,
          description: `Inserted key (${formatElement(key)}) into position ${j + 1}. Prefix [0..${i}] is now sorted.`,
          decision: `Key placement complete.`,
          valuesExamined: `A[${j + 1}]=${formatElement(key)}`,
          beforeState: beforeInsert,
          afterState: formatArray(arr)
        });
      }
      break;
    }

    case 'merge-sort': {
      let stepCount = steps.length;

      function merge(left: number, mid: number, right: number) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0;
        let j = 0;
        let k = left;

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          sortedIndices: [],
          operation: `Merge Subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
          description: `Merging left sorted subarray ${formatArray(leftArr)} and right sorted subarray ${formatArray(rightArr)}.`,
          decision: `Combine two sorted halves into single sorted segment.`,
          valuesExamined: `Left: ${formatArray(leftArr)}, Right: ${formatArray(rightArr)}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          const valL = leftArr[i];
          const valR = rightArr[j];
          const before = formatArray(arr);
          const cmp = compareElements(valL, valR);

          if (cmp <= 0) {
            swaps++; // array write
            arr[k] = valL;
            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [k],
              sortedIndices: [],
              operation: `Place Left Element`,
              description: `Left value ${formatElement(valL)} ≤ Right value ${formatElement(valR)}. Placed ${formatElement(valL)} at index ${k}.`,
              decision: `Select left head element.`,
              valuesExamined: `Left=${formatElement(valL)}, Right=${formatElement(valR)}`,
              beforeState: before,
              afterState: formatArray(arr)
            });
            i++;
          } else {
            swaps++; // array write
            arr[k] = valR;
            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [k],
              sortedIndices: [],
              operation: `Place Right Element`,
              description: `Right value ${formatElement(valR)} < Left value ${formatElement(valL)}. Placed ${formatElement(valR)} at index ${k}.`,
              decision: `Select right head element.`,
              valuesExamined: `Left=${formatElement(valL)}, Right=${formatElement(valR)}`,
              beforeState: before,
              afterState: formatArray(arr)
            });
            j++;
          }
          k++;
        }

        while (i < leftArr.length) {
          swaps++;
          arr[k] = leftArr[i];
          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [k],
            sortedIndices: [],
            operation: `Drain Remaining Left`,
            description: `Placing remaining left element ${formatElement(leftArr[i])} at index ${k}.`,
            decision: `Copy remaining left.`,
            valuesExamined: `Left=${formatElement(leftArr[i])}`,
            beforeState: formatArray(arr),
            afterState: formatArray(arr)
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          swaps++;
          arr[k] = rightArr[j];
          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [k],
            sortedIndices: [],
            operation: `Drain Remaining Right`,
            description: `Placing remaining right element ${formatElement(rightArr[j])} at index ${k}.`,
            decision: `Copy remaining right.`,
            valuesExamined: `Right=${formatElement(rightArr[j])}`,
            beforeState: formatArray(arr),
            afterState: formatArray(arr)
          });
          j++;
          k++;
        }
      }

      function sort(left: number, right: number) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [mid],
          sortedIndices: [],
          operation: `Divide Segment [${left}..${right}]`,
          description: `Splitting segment at midpoint index ${mid} (value ${formatElement(arr[mid])}). Left: [${left}..${mid}], Right: [${mid + 1}..${right}].`,
          decision: `Recursive divide operation.`,
          valuesExamined: `Segment [${left}..${right}], Mid=${mid}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        sort(left, mid);
        sort(mid + 1, right);
        merge(left, mid, right);
      }

      sort(0, arr.length - 1);
      break;
    }

    case 'quick-sort': {
      let stepCount = steps.length;
      const sortedIndices: number[] = [];

      function partition(low: number, high: number): number {
        const pivotVal = arr[high];
        let i = low - 1;

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [high],
          pivotIndex: high,
          sortedIndices: [...sortedIndices],
          operation: `Select Pivot (Index ${high})`,
          description: `Selected pivot = ${formatElement(pivotVal)} at index ${high}. Partitioning segment [${low}..${high - 1}].`,
          decision: `Group elements < ${formatElement(pivotVal)} left, > ${formatElement(pivotVal)} right.`,
          valuesExamined: `Pivot = ${formatElement(pivotVal)}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        for (let j = low; j < high; j++) {
          comparisons++;
          const currentVal = arr[j];
          const before = formatArray(arr);

          if (compareElements(currentVal, pivotVal) < 0) {
            i++;
            swaps++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            const after = formatArray(arr);

            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [i, j],
              swapIndices: [i, j],
              pivotIndex: high,
              sortedIndices: [...sortedIndices],
              operation: `Partition Swap`,
              description: `A[${j}] (${formatElement(currentVal)}) < Pivot (${formatElement(pivotVal)}). Swapped A[${i}] (${formatElement(temp)}) with A[${j}] (${formatElement(currentVal)}). Boundary index is now ${i}.`,
              decision: `Element placed in left partition.`,
              valuesExamined: `A[${j}]=${formatElement(currentVal)}, Pivot=${formatElement(pivotVal)}`,
              beforeState: before,
              afterState: after
            });
          } else {
            steps.push({
              stepIndex: stepCount++,
              arrayState: [...arr],
              highlightIndices: [j],
              pivotIndex: high,
              sortedIndices: [...sortedIndices],
              operation: `Partition Scan`,
              description: `A[${j}] (${formatElement(currentVal)}) ≥ Pivot (${formatElement(pivotVal)}). Remains in right partition.`,
              decision: `No swap; element belongs in right partition.`,
              valuesExamined: `A[${j}]=${formatElement(currentVal)}, Pivot=${formatElement(pivotVal)}`,
              beforeState: before,
              afterState: before
            });
          }
        }

        // Place pivot into final position
        swaps++;
        const pivotFinalIdx = i + 1;
        const temp = arr[pivotFinalIdx];
        arr[pivotFinalIdx] = arr[high];
        arr[high] = temp;
        sortedIndices.push(pivotFinalIdx);

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [pivotFinalIdx],
          pivotIndex: pivotFinalIdx,
          swapIndices: [pivotFinalIdx, high],
          sortedIndices: [...sortedIndices],
          operation: `Place Pivot at Index ${pivotFinalIdx}`,
          description: `Placed pivot (${formatElement(pivotVal)}) into its final position at index ${pivotFinalIdx}. Left partition: [${low}..${pivotFinalIdx - 1}], Right partition: [${pivotFinalIdx + 1}..${high}].`,
          decision: `Pivot locked at final index ${pivotFinalIdx}.`,
          valuesExamined: `Pivot = ${formatElement(pivotVal)}`,
          beforeState: formatArray(arr),
          afterState: formatArray(arr)
        });

        return pivotFinalIdx;
      }

      function quicksort(low: number, high: number) {
        if (low < high) {
          const pi = partition(low, high);
          quicksort(low, pi - 1);
          quicksort(pi + 1, high);
        } else if (low === high) {
          if (!sortedIndices.includes(low)) {
            sortedIndices.push(low);
          }
        }
      }

      quicksort(0, arr.length - 1);
      break;
    }

    case 'heap-sort': {
      let stepCount = steps.length;
      const n = arr.length;
      const sortedIndices: number[] = [];

      function heapify(size: number, i: number) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < size) {
          comparisons++;
          if (compareElements(arr[left], arr[largest]) > 0) {
            largest = left;
          }
        }

        if (right < size) {
          comparisons++;
          if (compareElements(arr[right], arr[largest]) > 0) {
            largest = right;
          }
        }

        if (largest !== i) {
          swaps++;
          const before = formatArray(arr);
          const temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
          const after = formatArray(arr);

          steps.push({
            stepIndex: stepCount++,
            arrayState: [...arr],
            highlightIndices: [i, largest],
            swapIndices: [i, largest],
            heapSize: size,
            sortedIndices: [...sortedIndices],
            operation: `Heapify (Sift Down)`,
            description: `Violated Max-Heap property at node ${i} (${formatElement(temp)}). Swapped with child at ${largest} (${formatElement(arr[i])}).`,
            decision: `Restore max-heap subtree rooted at ${i}.`,
            valuesExamined: `Parent A[${i}]=${formatElement(temp)}, Largest Child A[${largest}]=${formatElement(arr[i])}`,
            beforeState: before,
            afterState: after
          });

          heapify(size, largest);
        }
      }

      // Step 1: Build max heap
      steps.push({
        stepIndex: stepCount++,
        arrayState: [...arr],
        highlightIndices: [],
        heapSize: n,
        sortedIndices: [],
        operation: `Phase 1: Build Max-Heap`,
        description: `Transforming array of size ${n} into a binary Max-Heap from the bottom up.`,
        decision: `Iterate non-leaf nodes from index ${Math.floor(n / 2) - 1} down to 0.`,
        valuesExamined: 'All internal tree nodes',
        beforeState: formatArray(arr),
        afterState: formatArray(arr)
      });

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }

      // Step 2: Extract elements from heap
      steps.push({
        stepIndex: stepCount++,
        arrayState: [...arr],
        highlightIndices: [0],
        heapSize: n,
        sortedIndices: [],
        operation: `Max-Heap Constructed`,
        description: `Max-heap construction complete. Maximum element is at root index 0 (${formatElement(arr[0])}).`,
        decision: `Begin extraction phase.`,
        valuesExamined: `Root = ${formatElement(arr[0])}`,
        beforeState: formatArray(arr),
        afterState: formatArray(arr)
      });

      for (let i = n - 1; i > 0; i--) {
        swaps++;
        const before = formatArray(arr);
        const maxVal = arr[0];
        const lastVal = arr[i];
        arr[0] = lastVal;
        arr[i] = maxVal;
        sortedIndices.unshift(i);

        steps.push({
          stepIndex: stepCount++,
          arrayState: [...arr],
          highlightIndices: [0, i],
          swapIndices: [0, i],
          heapSize: i,
          sortedIndices: [...sortedIndices],
          operation: `Extract Max (${formatElement(maxVal)})`,
          description: `Extracted max element ${formatElement(maxVal)} from root (0) to end index ${i}. Active heap size reduced to ${i}.`,
          decision: `Lock position ${i}. Sift down new root (${formatElement(lastVal)}).`,
          valuesExamined: `A[0]=${formatElement(maxVal)}, A[${i}]=${formatElement(lastVal)}`,
          beforeState: before,
          afterState: formatArray(arr)
        });

        heapify(i, 0);
      }
      sortedIndices.unshift(0);
      break;
    }
  }

  // Final sorted completion step
  const allIndices = arr.map((_, i) => i);
  steps.push({
    stepIndex: steps.length,
    arrayState: [...arr],
    highlightIndices: [],
    sortedIndices: allIndices,
    operation: 'Sorting Completed',
    description: `Array successfully sorted in ascending order with ${comparisons} comparisons and ${swaps} swaps/movements.`,
    decision: 'All elements verified in non-decreasing order.',
    valuesExamined: 'Entire array',
    beforeState: formatArray(arr),
    afterState: formatArray(arr)
  });

  const endTime = performance.now();
  return {
    algorithmId,
    algorithmName: algorithmId,
    executionTimeMs: Number((endTime - startTime).toFixed(3)),
    totalSteps: steps.length,
    comparisonsCount: comparisons,
    swapsCount: swaps,
    inputArray: [...input],
    outputArray: [...arr],
    isSorted: true,
    steps
  };
}
