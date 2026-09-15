export interface TextChunk {
  pageNumber: number;
  chunkIndex: number;
  content: string;
}

export function chunkAcademicText(
  rawText: string, 
  pageNumber: number, 
  chunkSize = 600, 
  overlap = 80
): TextChunk[] {
  const cleaned = rawText.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];

  const chunks: TextChunk[] = [];
  let startIndex = 0;
  let chunkIdx = 0;

  while (startIndex < cleaned.length) {
    let endIndex = startIndex + chunkSize;
    
    if (endIndex < cleaned.length) {
      const boundaryIndex = cleaned.lastIndexOf('.', endIndex);
      if (boundaryIndex > startIndex + 150) {
        endIndex = boundaryIndex + 1;
      }
    }

    const chunkSnippet = cleaned.substring(startIndex, endIndex).trim();
    if (chunkSnippet.length > 30) {
      chunks.push({
        pageNumber,
        chunkIndex: chunkIdx++,
        content: chunkSnippet,
      });
    }

    startIndex = endIndex - overlap;
    if (startIndex >= cleaned.length - overlap) break;
  }

  return chunks;
}
