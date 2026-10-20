import { AlgorithmId, LanguageId } from '../types/algorithm';

export interface CodeImplementation {
  language: LanguageId;
  languageLabel: string;
  fileExtension: string;
  filename: string;
  code: string;
}

export const ALGORITHM_SOURCE_CODE: Record<AlgorithmId, Record<LanguageId, CodeImplementation>> = {
  'bubble-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'BubbleSort.java',
      code: `// KRD ALGORITHM - Bubble Sort Implementation in Java
import java.util.Arrays;

public class BubbleSort {
    /**
     * Sorts an array using the optimized Bubble Sort algorithm.
     * Time Complexity: O(N) Best, O(N^2) Average & Worst
     * Space Complexity: O(1) Auxiliary
     */
    public static void bubbleSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        int n = arr.length;
        boolean swapped;

        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            // Last i elements are already locked in sorted position
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // Early exit optimization if no swaps occurred in this pass
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] data = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(data));

        bubbleSort(data);

        System.out.println("Sorted array:   " + Arrays.toString(data));
        // Example Output: [11, 12, 22, 25, 34, 64, 90]
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'bubble_sort.cpp',
      code: `// KRD ALGORITHM - Bubble Sort Implementation in C++
#include <iostream>
#include <vector>
#include <utility>

/**
 * Optimized Bubble Sort in C++
 * Time Complexity: O(N) Best, O(N^2) Average & Worst
 * Space Complexity: O(1) Auxiliary
 */
void bubbleSort(std::vector<int>& arr) {
    size_t n = arr.size();
    if (n <= 1) return;

    for (size_t i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (size_t j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    std::vector<int> data = { 64, 34, 25, 12, 22, 11, 90 };

    std::cout << "Original array: ";
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";

    bubbleSort(data);

    std::cout << "Sorted array:   ";
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";
    // Example Output: 11 12 22 25 34 64 90
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'bubble_sort.py',
      code: `# KRD ALGORITHM - Bubble Sort Implementation in Python
from typing import List

def bubble_sort(arr: List[int]) -> List[int]:
    """
    Sorts an array using optimized Bubble Sort.
    Time Complexity: O(N) Best, O(N^2) Average & Worst
    Space Complexity: O(1) Auxiliary
    """
    n = len(arr)
    if n <= 1:
        return arr

    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

if __name__ == "__main__":
    sample_data = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original array: {sample_data}")
    bubble_sort(sample_data)
    print(f"Sorted array:   {sample_data}")
    # Example Output: [11, 12, 22, 25, 34, 64, 90]
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'BubbleSort.cs',
      code: `// KRD ALGORITHM - Bubble Sort Implementation in C#
using System;

namespace KrdAlgorithm
{
    public class BubbleSort
    {
        public static void Sort(int[] arr)
        {
            if (arr == null || arr.Length <= 1) return;
            int n = arr.Length;

            for (int i = 0; i < n - 1; i++)
            {
                bool swapped = false;
                for (int j = 0; j < n - 1 - i; j++)
                {
                    if (arr[j] > arr[j + 1])
                    {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        swapped = true;
                    }
                }
                if (!swapped) break;
            }
        }

        public static void Main(string[] args)
        {
            int[] data = { 64, 34, 25, 12, 22, 11, 90 };
            Console.WriteLine("Original: " + string.Join(", ", data));

            Sort(data);

            Console.WriteLine("Sorted:   " + string.Join(", ", data));
            // Example Output: 11, 12, 22, 25, 34, 64, 90
        }
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'bubbleSort.js',
      code: `// KRD ALGORITHM - Bubble Sort Implementation in JavaScript
/**
 * Sorts an array using optimized Bubble Sort.
 * @param {number[]} arr - Array of numbers to sort in place
 * @returns {number[]} The sorted array
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// Execution demonstration
const data = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", data);
bubbleSort(data);
console.log("Sorted array:  ", data);
// Example Output: [11, 12, 22, 25, 34, 64, 90]
`
    }
  },

  'selection-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'SelectionSort.java',
      code: `// KRD ALGORITHM - Selection Sort Implementation in Java
import java.util.Arrays;

public class SelectionSort {
    /**
     * Sorts an array using Selection Sort.
     * Time Complexity: O(N^2) in all cases
     * Space Complexity: O(1) Auxiliary
     */
    public static void selectionSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] data = { 64, 25, 12, 22, 11 };
        System.out.println("Original: " + Arrays.toString(data));
        selectionSort(data);
        System.out.println("Sorted:   " + Arrays.toString(data));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'selection_sort.cpp',
      code: `// KRD ALGORITHM - Selection Sort Implementation in C++
#include <iostream>
#include <vector>
#include <utility>

void selectionSort(std::vector<int>& arr) {
    size_t n = arr.size();
    for (size_t i = 0; i < n - 1; ++i) {
        size_t minIdx = i;
        for (size_t j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}

int main() {
    std::vector<int> data = { 64, 25, 12, 22, 11 };
    selectionSort(data);
    for (int v : data) std::cout << v << " ";
    std::cout << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'selection_sort.py',
      code: `# KRD ALGORITHM - Selection Sort Implementation in Python
from typing import List

def selection_sort(arr: List[int]) -> List[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

if __name__ == "__main__":
    nums = [64, 25, 12, 22, 11]
    print("Original:", nums)
    selection_sort(nums)
    print("Sorted:  ", nums)
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'SelectionSort.cs',
      code: `// KRD ALGORITHM - Selection Sort Implementation in C#
using System;

public class SelectionSort
{
    public static void Sort(int[] arr)
    {
        if (arr == null) return;
        int n = arr.Length;

        for (int i = 0; i < n - 1; i++)
        {
            int minIdx = i;
            for (int j = i + 1; j < n; j++)
            {
                if (arr[j] < arr[minIdx])
                {
                    minIdx = j;
                }
            }
            if (minIdx != i)
            {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    public static void Main(string[] args)
    {
        int[] data = { 64, 25, 12, 22, 11 };
        Sort(data);
        Console.WriteLine(string.Join(", ", data));
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'selectionSort.js',
      code: `// KRD ALGORITHM - Selection Sort Implementation in JavaScript
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

const arr = [64, 25, 12, 22, 11];
selectionSort(arr);
console.log("Sorted array:", arr);
`
    }
  },

  'insertion-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'InsertionSort.java',
      code: `// KRD ALGORITHM - Insertion Sort Implementation in Java
import java.util.Arrays;

public class InsertionSort {
    public static void insertionSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] data = { 12, 11, 13, 5, 6 };
        insertionSort(data);
        System.out.println("Sorted: " + Arrays.toString(data));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'insertion_sort.cpp',
      code: `// KRD ALGORITHM - Insertion Sort Implementation in C++
#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}

int main() {
    std::vector<int> data = { 12, 11, 13, 5, 6 };
    insertionSort(data);
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'insertion_sort.py',
      code: `# KRD ALGORITHM - Insertion Sort Implementation in Python
from typing import List

def insertion_sort(arr: List[int]) -> List[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

if __name__ == "__main__":
    nums = [12, 11, 13, 5, 6]
    insertion_sort(nums)
    print("Sorted array:", nums)
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'InsertionSort.cs',
      code: `// KRD ALGORITHM - Insertion Sort Implementation in C#
using System;

public class InsertionSort
{
    public static void Sort(int[] arr)
    {
        if (arr == null) return;
        for (int i = 1; i < arr.Length; i++)
        {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void Main(string[] args)
    {
        int[] data = { 12, 11, 13, 5, 6 };
        Sort(data);
        Console.WriteLine(string.Join(", ", data));
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'insertionSort.js',
      code: `// KRD ALGORITHM - Insertion Sort Implementation in JavaScript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const data = [12, 11, 13, 5, 6];
insertionSort(data);
console.log("Sorted:", data);
`
    }
  },

  'merge-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'MergeSort.java',
      code: `// KRD ALGORITHM - Merge Sort Implementation in Java
import java.util.Arrays;

public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];

        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        int[] data = { 38, 27, 43, 3, 9, 82, 10 };
        mergeSort(data, 0, data.length - 1);
        System.out.println("Sorted: " + Arrays.toString(data));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'merge_sort.cpp',
      code: `// KRD ALGORITHM - Merge Sort Implementation in C++
#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> leftSub(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<int> rightSub(arr.begin() + mid + 1, arr.begin() + right + 1);

    size_t i = 0, j = 0;
    int k = left;

    while (i < leftSub.size() && j < rightSub.size()) {
        if (leftSub[i] <= rightSub[j]) {
            arr[k++] = leftSub[i++];
        } else {
            arr[k++] = rightSub[j++];
        }
    }
    while (i < leftSub.size()) arr[k++] = leftSub[i++];
    while (j < rightSub.size()) arr[k++] = rightSub[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    std::vector<int> data = { 38, 27, 43, 3, 9, 82, 10 };
    mergeSort(data, 0, data.size() - 1);
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'merge_sort.py',
      code: `# KRD ALGORITHM - Merge Sort Implementation in Python
from typing import List

def merge_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left: List[int], right: List[int]) -> List[int]:
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

if __name__ == "__main__":
    nums = [38, 27, 43, 3, 9, 82, 10]
    sorted_nums = merge_sort(nums)
    print("Sorted:", sorted_nums)
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'MergeSort.cs',
      code: `// KRD ALGORITHM - Merge Sort Implementation in C#
using System;

public class MergeSort
{
    public static void Sort(int[] arr, int left, int right)
    {
        if (left < right)
        {
            int mid = left + (right - left) / 2;
            Sort(arr, left, mid);
            Sort(arr, mid + 1, right);
            Merge(arr, left, mid, right);
        }
    }

    private static void Merge(int[] arr, int left, int mid, int right)
    {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];

        Array.Copy(arr, left, L, 0, n1);
        Array.Copy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2)
        {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void Main(string[] args)
    {
        int[] data = { 38, 27, 43, 3, 9, 82, 10 };
        Sort(data, 0, data.Length - 1);
        Console.WriteLine(string.Join(", ", data));
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'mergeSort.js',
      code: `// KRD ALGORITHM - Merge Sort Implementation in JavaScript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const data = [38, 27, 43, 3, 9, 82, 10];
console.log("Sorted:", mergeSort(data));
`
    }
  },

  'quick-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'QuickSort.java',
      code: `// KRD ALGORITHM - Quick Sort Implementation in Java
import java.util.Arrays;

public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] data = { 10, 80, 30, 90, 40, 50, 70 };
        quickSort(data, 0, data.length - 1);
        System.out.println("Sorted: " + Arrays.toString(data));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'quick_sort.cpp',
      code: `// KRD ALGORITHM - Quick Sort Implementation in C++
#include <iostream>
#include <vector>
#include <utility>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> data = { 10, 80, 30, 90, 40, 50, 70 };
    quickSort(data, 0, data.size() - 1);
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'quick_sort.py',
      code: `# KRD ALGORITHM - Quick Sort Implementation in Python
from typing import List

def quick_sort(arr: List[int], low: int, high: int):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr: List[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

if __name__ == "__main__":
    nums = [10, 80, 30, 90, 40, 50, 70]
    quick_sort(nums, 0, len(nums) - 1)
    print("Sorted:", nums)
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'QuickSort.cs',
      code: `// KRD ALGORITHM - Quick Sort Implementation in C#
using System;

public class QuickSort
{
    public static void Sort(int[] arr, int low, int high)
    {
        if (low < high)
        {
            int pi = Partition(arr, low, high);
            Sort(arr, low, pi - 1);
            Sort(arr, pi + 1, high);
        }
    }

    private static int Partition(int[] arr, int low, int high)
    {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++)
        {
            if (arr[j] < pivot)
            {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int t2 = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = t2;
        return i + 1;
    }

    public static void Main(string[] args)
    {
        int[] data = { 10, 80, 30, 90, 40, 50, 70 };
        Sort(data, 0, data.Length - 1);
        Console.WriteLine(string.Join(", ", data));
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'quickSort.js',
      code: `// KRD ALGORITHM - Quick Sort Implementation in JavaScript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

const nums = [10, 80, 30, 90, 40, 50, 70];
quickSort(nums);
console.log("Sorted:", nums);
`
    }
  },

  'heap-sort': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'HeapSort.java',
      code: `// KRD ALGORITHM - Heap Sort Implementation in Java
import java.util.Arrays;

public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }

    public static void main(String[] args) {
        int[] data = { 12, 11, 13, 5, 6, 7 };
        heapSort(data);
        System.out.println("Sorted: " + Arrays.toString(data));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'heap_sort.cpp',
      code: `// KRD ALGORITHM - Heap Sort Implementation in C++
#include <iostream>
#include <vector>
#include <utility>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);
    for (int i = n - 1; i > 0; --i) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    std::vector<int> data = { 12, 11, 13, 5, 6, 7 };
    heapSort(data);
    for (int x : data) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'heap_sort.py',
      code: `# KRD ALGORITHM - Heap Sort Implementation in Python
from typing import List

def heapify(arr: List[int], n: int, i: int):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr: List[int]) -> List[int]:
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

if __name__ == "__main__":
    nums = [12, 11, 13, 5, 6, 7]
    heap_sort(nums)
    print("Sorted:", nums)
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'HeapSort.cs',
      code: `// KRD ALGORITHM - Heap Sort Implementation in C#
using System;

public class HeapSort
{
    public static void Sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--)
        {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            Heapify(arr, i, 0);
        }
    }

    private static void Heapify(int[] arr, int n, int i)
    {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i)
        {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            Heapify(arr, n, largest);
        }
    }

    public static void Main(string[] args)
    {
        int[] data = { 12, 11, 13, 5, 6, 7 };
        Sort(data);
        Console.WriteLine(string.Join(", ", data));
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'heapSort.js',
      code: `// KRD ALGORITHM - Heap Sort Implementation in JavaScript
function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

const data = [12, 11, 13, 5, 6, 7];
heapSort(data);
console.log("Sorted:", data);
`
    }
  },

  'linear-search': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'LinearSearch.java',
      code: `// KRD ALGORITHM - Linear Search Implementation in Java
public class LinearSearch {
    /**
     * Searches for a target value in an array.
     * @return index of target, or -1 if not found
     */
    public static int linearSearch(int[] arr, int target) {
        if (arr == null) return -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = { 10, 50, 30, 70, 80, 60, 20, 90, 40 };
        int target = 70;
        int result = linearSearch(data, target);
        System.out.println("Element " + target + (result != -1 ? " found at index: " + result : " not found."));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'linear_search.cpp',
      code: `// KRD ALGORITHM - Linear Search Implementation in C++
#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) return static_cast<int>(i);
    }
    return -1;
}

int main() {
    std::vector<int> data = { 10, 50, 30, 70, 80, 60, 20, 90, 40 };
    int target = 70;
    int idx = linearSearch(data, target);
    std::cout << "Target " << target << (idx != -1 ? " found at index " + std::to_string(idx) : " not found") << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'linear_search.py',
      code: `# KRD ALGORITHM - Linear Search Implementation in Python
from typing import List

def linear_search(arr: List[int], target: int) -> int:
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

if __name__ == "__main__":
    nums = [10, 50, 30, 70, 80, 60, 20, 90, 40]
    target = 70
    idx = linear_search(nums, target)
    print(f"Target {target} found at index: {idx}")
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'LinearSearch.cs',
      code: `// KRD ALGORITHM - Linear Search Implementation in C#
using System;

public class LinearSearch
{
    public static int Search(int[] arr, int target)
    {
        if (arr == null) return -1;
        for (int i = 0; i < arr.Length; i++)
        {
            if (arr[i] == target) return i;
        }
        return -1;
    }

    public static void Main(string[] args)
    {
        int[] data = { 10, 50, 30, 70, 80, 60, 20, 90, 40 };
        int idx = Search(data, 70);
        Console.WriteLine($"Found at index: {idx}");
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'linearSearch.js',
      code: `// KRD ALGORITHM - Linear Search Implementation in JavaScript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

const data = [10, 50, 30, 70, 80, 60, 20, 90, 40];
const target = 70;
const index = linearSearch(data, target);
console.log(\`Target \${target} found at index: \${index}\`);
`
    }
  },

  'binary-search': {
    java: {
      language: 'java',
      languageLabel: 'Java',
      fileExtension: '.java',
      filename: 'BinarySearch.java',
      code: `// KRD ALGORITHM - Binary Search Implementation in Java
public class BinarySearch {
    /**
     * Performs iterative binary search on a pre-sorted array.
     * @return index of target or -1 if absent
     */
    public static int binarySearch(int[] arr, int target) {
        if (arr == null) return -1;
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sortedData = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };
        int target = 23;
        int result = binarySearch(sortedData, target);
        System.out.println("Target " + target + (result != -1 ? " located at index: " + result : " not found."));
    }
}
`
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      fileExtension: '.cpp',
      filename: 'binary_search.cpp',
      code: `// KRD ALGORITHM - Binary Search Implementation in C++
#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    std::vector<int> sortedData = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };
    int target = 23;
    int idx = binarySearch(sortedData, target);
    std::cout << "Target " << target << " found at index: " << idx << "\\n";
    return 0;
}
`
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      fileExtension: '.py',
      filename: 'binary_search.py',
      code: `# KRD ALGORITHM - Binary Search Implementation in Python
from typing import List

def binary_search(arr: List[int], target: int) -> int:
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

if __name__ == "__main__":
    sorted_nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    target = 23
    idx = binary_search(sorted_nums, target)
    print(f"Target {target} located at index: {idx}")
`
    },
    csharp: {
      language: 'csharp',
      languageLabel: 'C#',
      fileExtension: '.cs',
      filename: 'BinarySearch.cs',
      code: `// KRD ALGORITHM - Binary Search Implementation in C#
using System;

public class BinarySearch
{
    public static int Search(int[] arr, int target)
    {
        if (arr == null) return -1;
        int low = 0;
        int high = arr.Length - 1;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void Main(string[] args)
    {
        int[] sortedData = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };
        int idx = Search(sortedData, 23);
        Console.WriteLine($"Located at index: {idx}");
    }
}
`
    },
    javascript: {
      language: 'javascript',
      languageLabel: 'JavaScript',
      fileExtension: '.js',
      filename: 'binarySearch.js',
      code: `// KRD ALGORITHM - Binary Search Implementation in JavaScript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

const sortedData = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;
console.log(\`Target \${target} found at index: \${binarySearch(sortedData, target)}\`);
`
    }
  }
};
