const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])

export function isImageFile(mimeType: string): boolean {
  return IMAGE_TYPES.has(mimeType)
}

export async function extractText(file: File): Promise<string> {
  const mimeType = file.type
  const buffer = Buffer.from(await file.arrayBuffer())

  if (mimeType === 'application/pdf') {
    const pdfModule = await import('pdf-parse')
    type PdfFn = (buf: Buffer) => Promise<{ text: string }>
    const pdfParse = ((pdfModule as unknown as { default?: PdfFn }).default ?? pdfModule) as PdfFn
    const result = await pdfParse(buffer)
    return result.text.trim()
  }

  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.endsWith('.docx')
  ) {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ buffer })
    return result.value.trim()
  }

  if (mimeType === 'text/plain' || file.name.endsWith('.txt')) {
    return buffer.toString('utf-8').trim()
  }

  return buffer.toString('utf-8').trim()
}
