import { AlgorithmMetadata, AlgorithmId } from '../types/algorithm';

export const ALGORITHM_DEFINITIONS: Record<AlgorithmId, AlgorithmMetadata> = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    shortName: 'Bubble',
    codeNumber: 'A.1',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    definition: 'Bubble Sort is a straightforward comparison-based sorting algorithm where adjacent elements in an array are sequentially compared and swapped if they violate monotonic order, causing larger elements to "bubble up" to the end of the array.',
    howItWorks: [
      'Iterate through the array from the beginning to the end.',
      'Compare adjacent pairs of elements (A[j] and A[j + 1]).',
      'If A[j] > A[j + 1], swap them.',
      'After pass i, the i-th largest element is locked into its correct final position at the end.',
      'Repeat the passes until no swaps occur during an entire pass.'
    ],
    advantages: [
      'Extremely simple concept and minimal implementation overhead.',
      'In-place algorithm requiring only O(1) auxiliary space.',
      'Stable sort: preserves relative ordering of duplicate keys.',
      'Adaptive: reaches O(N) best-case time if array is already sorted.'
    ],
    disadvantages: [
      'Quadratic O(N²) worst and average case time complexity.',
      'Excessive swaps compared to selection or insertion sort.',
      'Inefficient for large real-world production datasets.'
    ],
    bestUseCases: [
      'Introductory computer science pedagogy.',
      'Very small arrays (N < 20) where code simplicity is prioritized.',
      'Nearly sorted arrays with an early-exit optimization flag.'
    ],
    complexity: {
      bestTime: 'O(N)',
      averageTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stability: 'Stable'
    },
    defaultInput: [38, 27, 43, 3, 9, 82, 10],
    sampleExample: 'Given [5, 1, 4, 2, 8]: Compare 5 & 1 -> Swap to [1, 5, 4, 2, 8]; Compare 5 & 4 -> Swap to [1, 4, 5, 2, 8]; Compare 5 & 2 -> Swap to [1, 4, 2, 5, 8]; Compare 5 & 8 -> Keep order.'
  },

  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    shortName: 'Selection',
    codeNumber: 'A.2',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'Divides the array into sorted and unsorted subarrays, repeatedly finding the minimum element to place into the sorted partition.',
    definition: 'Selection Sort works by maintaining two partitions in an array: a sorted prefix and an unsorted suffix. In each iteration, it scans the unsorted segment to locate the minimum element and swaps it with the first unsorted item.',
    howItWorks: [
      'Divide the array logically into a sorted prefix and an unsorted suffix.',
      'Set the current index i as the candidate minimum index.',
      'Scan the rest of the unsorted segment (from i + 1 to N - 1) to identify the true minimum value.',
      'Swap the true minimum element with the element at position i.',
      'Advance the boundary between the sorted and unsorted segments by 1.'
    ],
    advantages: [
      'Performs at most O(N) swaps, which is optimal for systems where memory write operations are extremely costly (e.g., flash EEPROM).',
      'In-place algorithm requiring O(1) extra memory.',
      'Predictable performance: number of comparisons is identical regardless of input distribution.'
    ],
    disadvantages: [
      'O(N²) time complexity in all cases (best, average, and worst).',
      'Non-adaptive: does not benefit from pre-sorted data.',
      'Default implementation is unstable (swapping can change the order of equal keys).'
    ],
    bestUseCases: [
      'Embedded devices where memory write cycles are expensive or flash wear-leveling is critical.',
      'Small datasets where implementation footprint matters.'
    ],
    complexity: {
      bestTime: 'O(N²)',
      averageTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stability: 'Unstable'
    },
    defaultInput: [64, 25, 12, 22, 11],
    sampleExample: 'Given [64, 25, 12, 22, 11]: Minimum in whole array is 11 -> swap with 64 -> [11, 25, 12, 22, 64]; Minimum in rest is 12 -> swap with 25 -> [11, 12, 25, 22, 64].'
  },

  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    shortName: 'Insertion',
    codeNumber: 'A.3',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'Builds the final sorted array one item at a time by shifting greater elements and inserting the key into its proper position.',
    definition: 'Insertion Sort is an intuitive, comparison-based sorting algorithm analogous to sorting playing cards in one hand. It traverses the array, shifting larger elements to the right to make room for the current key in the sorted prefix.',
    howItWorks: [
      'Start with the second element (index 1), considering the first element as already sorted.',
      'Store the current element as the "key" to be inserted.',
      'Compare the key with elements in the sorted prefix from right to left.',
      'Shift elements that are greater than key one position to the right.',
      'Insert the key into the vacated position.',
      'Repeat for all elements until the array is fully sorted.'
    ],
    advantages: [
      'Simple and intuitive implementation with very low constant factors.',
      'Highly efficient for small arrays (N <= 20) and nearly sorted datasets (O(N) best case).',
      'Stable sort: preserves relative ordering of equal keys.',
      'Online algorithm: can sort an incoming stream of numbers in real time.'
    ],
    disadvantages: [
      'Quadratic O(N²) worst and average case time complexity.',
      'Requires substantial element shifting for reverse-ordered inputs.'
    ],
    bestUseCases: [
      'Hybrid sorting algorithms like Timsort (used in Python and Java) and Introsort for small partitions.',
      'Streaming data where items arrive continuously and need incremental insertion.',
      'Arrays with only a few displaced elements.'
    ],
    complexity: {
      bestTime: 'O(N)',
      averageTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stability: 'Stable'
    },
    defaultInput: [12, 11, 13, 5, 6],
    sampleExample: 'Given [12, 11, 13, 5, 6]: Key = 11. 12 > 11, shift 12 -> [11, 12, 13, 5, 6]; Key = 13. 13 > 12, stay -> [11, 12, 13, 5, 6]; Key = 5. Shift 13, 12, 11 -> [5, 11, 12, 13, 6].'
  },

  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    shortName: 'Merge',
    codeNumber: 'A.4',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'A classic divide-and-conquer algorithm that recursively divides the array in halves, sorts them, and merges the sorted halves.',
    definition: 'Merge Sort is an efficient, comparison-based, divide-and-conquer algorithm designed by John von Neumann in 1945. It splits an array into two halves, recursively sorts each half, and merges the two sorted subarrays into a single ordered sequence.',
    howItWorks: [
      'Divide: Calculate mid index and split the array into left and right halves.',
      'Conquer: Recursively invoke Merge Sort on the left half and right half until single-element base cases are reached.',
      'Combine (Merge): Compare the heads of both sorted halves and sequentially place the smaller element into an auxiliary buffer.',
      'Copy the merged elements back into the original array segment.'
    ],
    advantages: [
      'Guaranteed O(N log N) time complexity across all cases (best, average, worst).',
      'Stable sort: retains the relative position of duplicate keys.',
      'Excellent for external sorting and linked lists (where random access is unavailable).'
    ],
    disadvantages: [
      'Requires O(N) additional memory for the merge buffer in standard array implementations.',
      'Higher constant factor overhead compared to Quick Sort for in-memory primitive sorting.'
    ],
    bestUseCases: [
      'Sorting linked lists where pointer manipulation eliminates auxiliary memory overhead.',
      'External sorting of massive datasets too large to fit in RAM.',
      'Applications where guaranteed O(N log N) worst-case time is strictly required.'
    ],
    complexity: {
      bestTime: 'O(N log N)',
      averageTime: 'O(N log N)',
      worstTime: 'O(N log N)',
      space: 'O(N)',
      stability: 'Stable'
    },
    defaultInput: [38, 27, 43, 3, 9, 82, 10],
    sampleExample: 'Divide [38, 27, 43, 3] and [9, 82, 10]; Recursively split to individual elements [38], [27], etc.; Merge [27, 38] and [3, 43] -> [3, 27, 38, 43]; Merge with right half [9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82].'
  },

  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    shortName: 'Quick',
    codeNumber: 'A.5',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'Picks a pivot element and partitions the array into values smaller than and greater than the pivot, then recurses.',
    definition: 'Quick Sort is a highly efficient divide-and-conquer sorting algorithm developed by Tony Hoare in 1959. It selects a "pivot" element and rearranges the array so that all values smaller than the pivot precede it and all values greater follow it.',
    howItWorks: [
      'Select a pivot element from the subarray (e.g., last element, first, or median-of-three).',
      'Partitioning: Rearrange the array such that all items less than the pivot are placed to its left, and all greater items to its right.',
      'Place the pivot into its final resting position between the two partitions.',
      'Recursively apply Quick Sort to the left partition and right partition.'
    ],
    advantages: [
      'Superb cache locality and low constant factors make it one of the fastest general-purpose sorting algorithms in practice.',
      'In-place sort requiring only O(log N) stack memory for recursive calls.',
      'Average time complexity of O(N log N).'
    ],
    disadvantages: [
      'Worst-case performance degrades to O(N²) when partitions are severely unbalanced (e.g., already sorted array with naïve pivot selection).',
      'Unstable: may reorder identical items during swapping.',
      'Recursive stack depth can trigger overflow without tail-call optimization.'
    ],
    bestUseCases: [
      'Standard language library sort primitives (C++ std::sort, Java dual-pivot quicksort for primitives).',
      'Large random in-memory datasets where cache efficiency dominates runtime.'
    ],
    complexity: {
      bestTime: 'O(N log N)',
      averageTime: 'O(N log N)',
      worstTime: 'O(N²)',
      space: 'O(log N)',
      stability: 'Unstable'
    },
    defaultInput: [10, 80, 30, 90, 40, 50, 70],
    sampleExample: 'Given [10, 80, 30, 90, 40, 50, 70] with Pivot = 70. Rearrange elements: items < 70 on left [10, 30, 40, 50], items > 70 on right [80, 90]. Pivot 70 placed at index 4. Recurse left and right.'
  },

  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    shortName: 'Heap',
    codeNumber: 'A.6',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithm',
    shortDescription: 'Converts the array into a max-heap binary tree structure, then repeatedly extracts the root maximum to build the sorted array.',
    definition: 'Heap Sort is a comparison-based sorting algorithm based on the Binary Heap data structure. It constructs a Max-Heap from the input array, then repeatedly extracts the maximum root element and swaps it to the end, re-heapifying the remaining elements.',
    howItWorks: [
      'Build a Max-Heap from the unsorted array in O(N) time.',
      'The largest element is now at the root (index 0).',
      'Swap the root with the last item in the active heap, reducing heap size by 1.',
      'Sift-down (heapify) the new root to restore the Max-Heap property.',
      'Repeat until heap size is 1. The array is sorted in ascending order.'
    ],
    advantages: [
      'Guaranteed O(N log N) worst-case time complexity, with no bad input patterns that cause quadratic degradation.',
      'In-place sorting requiring strictly O(1) auxiliary space.',
      'Does not rely on recursive call stacks, eliminating stack overflow vulnerabilities.'
    ],
    disadvantages: [
      'Poorer cache locality compared to Quick Sort because heap jumps access non-contiguous memory indexes (2*i + 1, 2*i + 2).',
      'Unstable sort.',
      'Higher constant overhead compared to optimized Quick Sort.'
    ],
    bestUseCases: [
      'Safety-critical real-time systems (avionics, automotive) where predictable O(N log N) runtime and O(1) memory guarantees are required.',
      'Systems with tight memory constraints prohibiting O(N) merge buffers or O(log N) stack frames.'
    ],
    complexity: {
      bestTime: 'O(N log N)',
      averageTime: 'O(N log N)',
      worstTime: 'O(N log N)',
      space: 'O(1)',
      stability: 'Unstable'
    },
    defaultInput: [12, 11, 13, 5, 6, 7],
    sampleExample: 'Build Max-Heap -> Root is 13. Swap 13 with last element (7), heapify remaining [12, 11, 7, 5, 6]. Next root is 12, swap with 6, heapify. Repeat until fully sorted.'
  },

  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    shortName: 'Linear',
    codeNumber: 'A.7',
    category: 'searching',
    categoryLabel: 'Searching Algorithm',
    shortDescription: 'Sequentially checks every element in the dataset from start to end until a match is found or the list concludes.',
    definition: 'Linear Search (or Sequential Search) is the most fundamental searching algorithm. It examines each item in a collection sequentially from index 0 to N-1, checking for equality with the specified target value.',
    howItWorks: [
      'Start at the first element (index 0).',
      'Compare the target value with the current element.',
      'If current element equals target, return the current index.',
      'If not equal, advance to the next index.',
      'If the end of the collection is reached without finding target, return -1 (Not Found).'
    ],
    advantages: [
      'Does not require the dataset to be sorted or pre-processed.',
      'Simple to understand, debug, and implement.',
      'Works with singly linked lists and non-random-access data streams.',
      'O(1) best-case time if the target is located at the very first position.'
    ],
    disadvantages: [
      'O(N) time complexity: linear slowdown as dataset size grows.',
      'Very slow for large datasets compared to binary search or hash map lookups.'
    ],
    bestUseCases: [
      'Unsorted datasets where sorting beforehand would cost O(N log N).',
      'Small lists (N < 50) where search overhead is negligible.',
      'Streaming data where items are processed on the fly.'
    ],
    complexity: {
      bestTime: 'O(1)',
      averageTime: 'O(N)',
      worstTime: 'O(N)',
      space: 'O(1)'
    },
    defaultInput: [10, 50, 30, 70, 80, 60, 20, 90, 40],
    sampleExample: 'Searching for Target = 70 in [10, 50, 30, 70, 80]: Index 0 is 10 (no match); Index 1 is 50 (no match); Index 2 is 30 (no match); Index 3 is 70 (Match found! Return index 3).'
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    shortName: 'Binary',
    codeNumber: 'A.8',
    category: 'searching',
    categoryLabel: 'Searching Algorithm',
    shortDescription: 'Searches a sorted array by repeatedly halving the search interval until the target is found or interval is empty.',
    definition: 'Binary Search is an optimal logarithmic searching algorithm that operates on sorted collections. By inspecting the median element, it eliminates half of the remaining candidate elements in each step, achieving O(log N) runtime.',
    howItWorks: [
      'Verify that the array is sorted in ascending order.',
      'Initialize pointers: Low = 0, High = N - 1.',
      'Compute the middle index: Mid = Low + Math.floor((High - Low) / 2).',
      'If A[Mid] == Target, return Mid.',
      'If A[Mid] < Target, set Low = Mid + 1 (target lies in right half).',
      'If A[Mid] > Target, set High = Mid - 1 (target lies in left half).',
      'Repeat until Low > High. If interval becomes empty, return -1.'
    ],
    advantages: [
      'Extremely fast logarithmic O(log N) time complexity. Can search 1 billion items in at most 30 comparisons.',
      'O(1) auxiliary space in iterative implementations.',
      'Widely used as a primitive in database indexes and range queries.'
    ],
    disadvantages: [
      'Mandatory prerequisite: the array must be pre-sorted.',
      'Requires random access (O(1) indexing), making it inefficient on standard linked lists.',
      'Overhead of sorting an unsorted list first (O(N log N)) exceeds linear search for single queries.'
    ],
    bestUseCases: [
      'Static or rarely changing sorted lookup tables.',
      'Database B-Tree index page searches.',
      'Discrete optimization and binary search on answer spaces.'
    ],
    complexity: {
      bestTime: 'O(1)',
      averageTime: 'O(log N)',
      worstTime: 'O(log N)',
      space: 'O(1)'
    },
    defaultInput: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    sampleExample: 'Searching for 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]: Low=0, High=9 -> Mid=4 (Val 16). 16 < 23, so Low=5. Next Mid=7 (Val 56). 56 > 23, so High=6. Next Mid=5 (Val 23). Match! Return index 5.'
  },

  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    shortName: 'BFS',
    codeNumber: 'A.9',
    category: 'graph',
    categoryLabel: 'Graph Algorithm',
    shortDescription: 'Explores a graph level by level using a queue, discovering all immediate neighbors before moving to the next depth tier.',
    definition: 'Breadth-First Search (BFS) is a graph traversal and search algorithm that systematically visits vertices in order of their topological distance from a designated root node. It uses a First-In-First-Out (FIFO) queue to guarantee level-order traversal.',
    howItWorks: [
      'Choose a starting vertex S and mark it as visited.',
      'Enqueue S into a FIFO queue.',
      'While the queue is not empty: dequeue front vertex U.',
      'Process vertex U.',
      'For each unvisited neighbor V adjacent to U: mark V as visited, record predecessor, and enqueue V.',
      'Continue until all reachable vertices are visited.'
    ],
    advantages: [
      'Guarantees finding the shortest path in unweighted graphs (fewest edges).',
      'Explores vertices uniformly in radial concentric rings from the origin.',
      'Will not get trapped in infinite depth loops unlike DFS on infinite trees.'
    ],
    disadvantages: [
      'Consumes O(V) memory to maintain the queue and visited state, which can be massive on wide graphs.',
      'Does not compute shortest paths when edges possess unequal weights.'
    ],
    bestUseCases: [
      'Shortest path in unweighted networks (social degrees of separation, peer-to-peer hops).',
      'Finding connected components and bipartite graph verification.',
      'Web crawlers indexing pages level by level.'
    ],
    complexity: {
      bestTime: 'O(V + E)',
      averageTime: 'O(V + E)',
      worstTime: 'O(V + E)',
      space: 'O(V)'
    },
    defaultInput: [0, 1, 2, 3, 4, 5],
    sampleExample: 'Graph: A connected to B, C; B connected to D; C connected to E. Start BFS at A: Queue = [A]. Dequeue A -> Visit B, C (Queue=[B, C]). Dequeue B -> Visit D (Queue=[C, D]). Dequeue C -> Visit E. Traversal: A -> B -> C -> D -> E.'
  },

  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Shortest Path",
    shortName: 'Dijkstra',
    codeNumber: 'A.10',
    category: 'graph',
    categoryLabel: 'Graph Algorithm',
    shortDescription: 'Calculates the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge costs.',
    definition: "Dijkstra's Algorithm, conceived by computer scientist Edsger W. Dijkstra in 1956, finds the shortest path between nodes in a graph with non-negative edge weights. It greedily expands the frontier by selecting the unvisited vertex with the minimum tentative distance.",
    howItWorks: [
      'Assign every vertex a tentative distance: 0 for the start node, and infinity (∞) for all other nodes.',
      'Maintain a set of unvisited nodes.',
      'From the unvisited set, select the vertex U with the smallest tentative distance.',
      'For each unvisited neighbor V of U: calculate candidate distance Dist[U] + Weight(U, V).',
      'If candidate distance < Dist[V], update Dist[V] and record U as predecessor of V (edge relaxation).',
      'Mark U as visited. Visited nodes are finalized and never revisited.',
      'Repeat until all reachable vertices are visited or target node is finalized.'
    ],
    advantages: [
      'Optimal and mathematically proven shortest path algorithm for non-negative weighted graphs.',
      'Highly efficient when implemented with a min-priority queue (O((V + E) log V)).',
      'Calculates shortest paths from the source to ALL reachable vertices in a single run.'
    ],
    disadvantages: [
      'Cannot handle negative edge weights: greedy assumption fails because a future negative edge could reduce an already finalized distance. (Requires Bellman-Ford for negative weights).',
      'High memory and queue management overhead compared to simple BFS.'
    ],
    bestUseCases: [
      'GPS navigation systems and digital mapping routing (Google Maps, OpenStreetMap).',
      'IP network routing protocols (OSPF - Open Shortest Path First, IS-IS).',
      'Flight and public transit route planning with transfer costs.'
    ],
    complexity: {
      bestTime: 'O((V + E) log V)',
      averageTime: 'O((V + E) log V)',
      worstTime: 'O((V + E) log V)',
      space: 'O(V)'
    },
    defaultInput: [0, 1, 2, 3, 4],
    sampleExample: 'Start at A. Tentative distances: A:0, B:∞, C:∞. Edges A->B (wt 4), A->C (wt 2). Relax neighbors: Dist[B]=4, Dist[C]=2. Pick C (min distance 2). From C, edge C->B (wt 1). Candidate Dist to B = 2 + 1 = 3 < 4! Update Dist[B]=3. Shortest path to B is A->C->B with cost 3.'
  }
};
