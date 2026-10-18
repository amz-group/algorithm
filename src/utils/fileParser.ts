export interface ParsedFileResult {
  fileName: string;
  fileType: 'txt' | 'csv' | 'json' | 'unknown';
  fileSize: number;
  validNumbers: number[];
  invalidEntries: string[];
  rawTextPreview: string;
  success: boolean;
  errorMessage?: string;
}

export function parseFileContent(fileName: string, content: string): ParsedFileResult {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const validNumbers: number[] = [];
  const invalidEntries: string[] = [];

  let detectedType: 'txt' | 'csv' | 'json' | 'unknown' = 'unknown';

  try {
    if (ext === 'json' || content.trim().startsWith('[') || content.trim().startsWith('{')) {
      detectedType = 'json';
      try {
        const parsed = JSON.parse(content);
        let items: any[] = [];
        if (Array.isArray(parsed)) {
          items = parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          // Check for common keys like numbers, array, data, elements
          const possibleArr = parsed.numbers || parsed.array || parsed.data || parsed.elements;
          if (Array.isArray(possibleArr)) {
            items = possibleArr;
          } else {
            // Extract numerical values from object values
            items = Object.values(parsed);
          }
        }

        for (const item of items) {
          if (typeof item === 'number' && !isNaN(item) && isFinite(item)) {
            validNumbers.push(item);
          } else if (typeof item === 'string') {
            const num = Number(item.trim());
            if (!isNaN(num) && isFinite(num) && item.trim().length > 0) {
              validNumbers.push(num);
            } else {
              invalidEntries.push(String(item));
            }
          } else {
            invalidEntries.push(JSON.stringify(item));
          }
        }
      } catch (jsonErr: any) {
        return {
          fileName,
          fileType: 'json',
          fileSize: content.length,
          validNumbers: [],
          invalidEntries: [content.substring(0, 100)],
          rawTextPreview: content.substring(0, 500),
          success: false,
          errorMessage: `Invalid JSON format: ${jsonErr.message}`
        };
      }
    } else if (ext === 'csv') {
      detectedType = 'csv';
      // Split by commas, semicolons, or newlines
      const tokens = content.split(/[\r\n,;]+/);
      for (const token of tokens) {
        const clean = token.trim();
        if (!clean) continue;
        const num = Number(clean);
        if (!isNaN(num) && isFinite(num)) {
          validNumbers.push(num);
        } else {
          invalidEntries.push(clean);
        }
      }
    } else {
      // Default to TXT / plaintext
      detectedType = 'txt';
      // Split by commas, spaces, tabs, newlines
      const tokens = content.split(/[\s,]+/);
      for (const token of tokens) {
        const clean = token.trim();
        if (!clean) continue;
        const num = Number(clean);
        if (!isNaN(num) && isFinite(num)) {
          validNumbers.push(num);
        } else {
          invalidEntries.push(clean);
        }
      }
    }

    return {
      fileName,
      fileType: detectedType,
      fileSize: content.length,
      validNumbers,
      invalidEntries,
      rawTextPreview: content.length > 500 ? content.substring(0, 500) + '...' : content,
      success: validNumbers.length > 0,
      errorMessage: validNumbers.length === 0 ? 'No valid numerical elements found in file.' : undefined
    };
  } catch (err: any) {
    return {
      fileName,
      fileType: detectedType,
      fileSize: content.length,
      validNumbers: [],
      invalidEntries: [],
      rawTextPreview: content.substring(0, 500),
      success: false,
      errorMessage: err.message || 'Failed to parse file.'
    };
  }
}

export function parseManualInput(text: string): { valid: number[]; invalid: string[] } {
  const valid: number[] = [];
  const invalid: string[] = [];

  // Split by commas, spaces, tabs, newlines
  const tokens = text.split(/[\s,]+/);
  for (const token of tokens) {
    const clean = token.trim();
    if (!clean) continue;
    const num = Number(clean);
    if (!isNaN(num) && isFinite(num)) {
      valid.push(num);
    } else {
      invalid.push(clean);
    }
  }

  return { valid, invalid };
}
