import { NextRequest } from 'next/server'
import { getSession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'
import { analyzeOffer, analyzeOfferImage } from '@/lib/claude'
import { extractText, isImageFile } from '@/lib/fileParser'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const contentType = request.headers.get('content-type') ?? ''
    let text = ''
    let fileName: string | null = null
    let sourceType = 'text'
    let isImage = false
    let imageData = ''
    let imageMimeType = ''
    let title = 'Untitled Analysis'

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null
      const pastedText = formData.get('text') as string | null
      const customTitle = formData.get('title') as string | null
      if (customTitle) title = customTitle

      if (file && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) {
          return Response.json({ error: 'File too large (max 10 MB)' }, { status: 413 })
        }
        fileName = file.name
        sourceType = 'file'
        title = customTitle ?? file.name

        if (isImageFile(file.type)) {
          isImage = true
          imageData = Buffer.from(await file.arrayBuffer()).toString('base64')
          imageMimeType = file.type
        } else {
          text = await extractText(file)
        }
      } else if (pastedText) {
        text = pastedText.trim()
        sourceType = 'text'
      }
    } else {
      const body = await request.json()
      text = body.text ?? ''
      title = body.title ?? 'Untitled Analysis'
      sourceType = 'text'
    }

    if (!text && !isImage) {
      return Response.json({ error: 'No content provided' }, { status: 400 })
    }

    const result = isImage
      ? await analyzeOfferImage(imageData, imageMimeType)
      : await analyzeOffer(text)

    const analysis = await prisma.analysis.create({
      data: {
        userId: session.userId,
        title,
        sourceType,
        originalText: isImage ? '[Image file — text extracted by AI]' : text,
        fileName,
        recommendation: result.recommendation,
        reasoning: result.reasoning,
        flags: {
          create: [
            ...result.redFlags.map((f) => ({
              type: 'RED',
              title: f.title,
              description: f.description,
              severity: f.severity,
            })),
            ...result.greenFlags.map((f) => ({
              type: 'GREEN',
              title: f.title,
              description: f.description,
              severity: null,
            })),
          ],
        },
      },
      include: { flags: true },
    })

    return Response.json({ analysis })
  } catch (error) {
    console.error('Analyze error:', error)
    return Response.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}
