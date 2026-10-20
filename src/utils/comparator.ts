import { DataElement } from '../types/algorithm';

/**
 * Universal element comparator supporting both numbers and text strings (words, characters).
 * - Numbers are compared numerically: a - b
 * - Strings are compared lexicographically / alphabetically using natural sort order
 * - Mixed types: numbers come before strings, or compare consistently
 */
export function compareElements(a: DataElement, b: DataElement): number {
  const isANum = typeof a === 'number';
  const isBNum = typeof b === 'number';

  if (isANum && isBNum) {
    return a - b;
  }

  if (isANum && !isBNum) {
    // Numbers appear before strings in mixed lists
    return -1;
  }

  if (!isANum && isBNum) {
    return 1;
  }

  // Both are strings
  const strA = String(a).trim();
  const strB = String(b).trim();

  // Case-insensitive natural comparison
  const cmp = strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
  if (cmp !== 0) return cmp;
  // Fallback to case-sensitive if identical in base
  return strA.localeCompare(strB);
}

/**
 * Formats a single data element for clean UI display in step descriptions and labels.
 * E.g., number -> 42, string -> "Apple" or "E"
 */
export function formatElement(val: DataElement): string {
  if (typeof val === 'string') {
    return `"${val}"`;
  }
  return String(val);
}

/**
 * Formats an array of elements for step logs: e.g. ["Apple", "Banana", "Cherry"]
 */
export function formatArray(arr: DataElement[]): string {
  return `[${arr.map(formatElement).join(', ')}]`;
}

/**
 * Checks whether an array of elements is in non-decreasing sorted order.
 */
export function isElementSorted(arr: DataElement[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (compareElements(arr[i - 1], arr[i]) > 0) {
      return false;
    }
  }
  return true;
}

/**
 * Calculates a normalized visual height percentage (from 15px to 180px)
 * for any array element (number or text).
 * For numbers: uses numerical min-max range.
 * For strings/text: uses sorted unique rank order.
 */
export function calculateNormalizedHeight(
  val: DataElement,
  allElements: DataElement[],
  maxHeight: number = 160,
  minHeight: number = 24
): number {
  if (allElements.length === 0) return minHeight;

  const allNumbers = allElements.every((x) => typeof x === 'number');

  if (allNumbers) {
    const numArr = allElements as number[];
    const maxVal = Math.max(...numArr, 1);
    const minVal = Math.min(...numArr, 0);
    const range = maxVal - minVal || 1;
    const num = Number(val);
    return Math.max(minHeight, Math.round(((num - minVal) / range) * maxHeight) + minHeight);
  }

  // Contains text strings or mixed: use relative rank
  // Create unique sorted array to determine ranks
  const uniqueSorted = Array.from(new Set(allElements)).sort(compareElements);
  const totalRanks = uniqueSorted.length;
  if (totalRanks <= 1) return Math.round(maxHeight * 0.6);

  const rankIndex = uniqueSorted.findIndex((x) => compareElements(x, val) === 0);
  const validRank = rankIndex >= 0 ? rankIndex : 0;

  // Linear distribution from minHeight to maxHeight
  const ratio = validRank / (totalRanks - 1);
  return Math.max(minHeight, Math.round(minHeight + ratio * (maxHeight - minHeight)));
}
