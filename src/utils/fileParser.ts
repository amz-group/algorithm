import { DataElement } from '../types/algorithm';

export interface ParsedFileResult {
  fileName: string;
  fileType: 'txt' | 'csv' | 'json' | 'unknown';
  fileSize: number;
  validElements: DataElement[];
  validNumbers: number[]; // backward-compatible alias
  dataType: 'number' | 'text';
  invalidEntries: string[];
  rawTextPreview: string;
  success: boolean;
  errorMessage?: string;
}

export interface ParsedManualResult {
  valid: DataElement[];
  invalid: string[];
  detectedType: 'number' | 'text';
}

/**
 * Universal manual input parser supporting numbers, words, and letter sequences.
 */
export function parseManualInput(
  text: string,
  preferredType: 'auto' | 'number' | 'text' = 'auto'
): ParsedManualResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { valid: [], invalid: [], detectedType: preferredType === 'text' ? 'text' : 'number' };
  }

  // Check if comma or semicolon or newline exists
  const hasSeparators = /[,\n;\t]/.test(trimmed);

  let rawTokens: string[] = [];

  if (hasSeparators) {
    // Split by comma, semicolon, tab, or newline
    rawTokens = trimmed
      .split(/[,\n;\t]+/)
      .map((t) => t.trim().replace(/^["']|["']$/g, ''))
      .filter((t) => t.length > 0);
  } else {
    // Split by spaces
    const spaceTokens = trimmed
      .split(/\s+/)
      .map((t) => t.trim().replace(/^["']|["']$/g, ''))
      .filter((t) => t.length > 0);

    // If single continuous word with > 1 letters (e.g. "ALGORITHM") in text mode
    if (spaceTokens.length === 1 && preferredType === 'text' && spaceTokens[0].length > 1) {
      rawTokens = spaceTokens[0].split('');
    } else {
      rawTokens = spaceTokens;
    }
  }

  if (rawTokens.length === 0) {
    return { valid: [], invalid: [], detectedType: preferredType === 'text' ? 'text' : 'number' };
  }

  // Check if all tokens are numeric
  const allNumeric = rawTokens.every((t) => {
    const n = Number(t);
    return !isNaN(n) && isFinite(n);
  });

  if (preferredType === 'number' || (preferredType === 'auto' && allNumeric)) {
    const valid: number[] = [];
    const invalid: string[] = [];

    for (const t of rawTokens) {
      const n = Number(t);
      if (!isNaN(n) && isFinite(n)) {
        valid.push(n);
      } else {
        invalid.push(t);
      }
    }

    return {
      valid,
      invalid,
      detectedType: 'number'
    };
  }

  // Otherwise, treat as Text / Words / Characters
  const valid: string[] = [];
  for (const t of rawTokens) {
    if (t.length > 0) {
      valid.push(t);
    }
  }

  return {
    valid,
    invalid: [],
    detectedType: 'text'
  };
}

export function parseFileContent(fileName: string, content: string): ParsedFileResult {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const rawPreview = content.length > 500 ? content.substring(0, 500) + '...' : content;
  let detectedFileType: 'txt' | 'csv' | 'json' | 'unknown' = 'unknown';

  try {
    let tokens: string[] = [];

    if (ext === 'json' || content.trim().startsWith('[') || content.trim().startsWith('{')) {
      detectedFileType = 'json';
      const parsed = JSON.parse(content);
      let items: any[] = [];
      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        const possibleArr = parsed.items || parsed.elements || parsed.numbers || parsed.words || parsed.array || parsed.data;
        if (Array.isArray(possibleArr)) {
          items = possibleArr;
        } else {
          items = Object.values(parsed);
        }
      }
      tokens = items.map((x) => String(x).trim()).filter((x) => x.length > 0);
    } else if (ext === 'csv') {
      detectedFileType = 'csv';
      tokens = content
        .split(/[\r\n,;]+/)
        .map((t) => t.trim().replace(/^["']|["']$/g, ''))
        .filter((t) => t.length > 0);
    } else {
      detectedFileType = 'txt';
      tokens = content
        .split(/[\s,;\n]+/)
        .map((t) => t.trim().replace(/^["']|["']$/g, ''))
        .filter((t) => t.length > 0);
    }

    // Determine if numbers or text
    const allNumeric = tokens.length > 0 && tokens.every((t) => !isNaN(Number(t)) && isFinite(Number(t)));

    if (allNumeric) {
      const numbers = tokens.map(Number);
      return {
        fileName,
        fileType: detectedFileType,
        fileSize: content.length,
        validElements: numbers,
        validNumbers: numbers,
        dataType: 'number',
        invalidEntries: [],
        rawTextPreview: rawPreview,
        success: numbers.length > 0
      };
    }

    // Text elements
    return {
      fileName,
      fileType: detectedFileType,
      fileSize: content.length,
      validElements: tokens,
      validNumbers: [],
      dataType: 'text',
      invalidEntries: [],
      rawTextPreview: rawPreview,
      success: tokens.length > 0,
      errorMessage: tokens.length === 0 ? 'No valid elements found in file.' : undefined
    };
  } catch (err: any) {
    return {
      fileName,
      fileType: detectedFileType,
      fileSize: content.length,
      validElements: [],
      validNumbers: [],
      dataType: 'number',
      invalidEntries: [],
      rawTextPreview: rawPreview,
      success: false,
      errorMessage: err.message || 'Failed to parse file.'
    };
  }
}
