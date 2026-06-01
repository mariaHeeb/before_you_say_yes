import OpenAI from 'openai'
import type { AnalysisResult } from '@/lib/types'

if (!process.env.GROQ_API_KEY) {
  console.error('[Groq] GROQ_API_KEY is not set. Add it to your .env.local file before running the app.')
}

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

const MODEL = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'
// Vision-capable model for image analysis; override with GROQ_VISION_MODEL in .env.local
const VISION_MODEL = process.env.GROQ_VISION_MODEL ?? 'meta-llama/llama-4-scout-17b-16e-instruct'

const SYSTEM_PROMPT = `You are an expert offer analyst specializing in employment contracts, business agreements, and commercial offers. Your job is to analyze documents objectively and identify risks and opportunities for the recipient.

You must respond with valid JSON only — no markdown, no prose outside the JSON structure.

The JSON must follow this exact schema:
{
  "recommendation": "ACCEPT" | "DECLINE",
  "reasoning": "<2-4 paragraph plain English explanation of the overall recommendation>",
  "redFlags": [
    {
      "title": "<short name of the issue>",
      "description": "<clear explanation of why this is risky or bad>",
      "severity": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "greenFlags": [
    {
      "title": "<short name of the positive aspect>",
      "description": "<clear explanation of why this is good>"
    }
  ]
}

Rules:
- Be specific and cite actual text from the offer where relevant.
- Severity HIGH = deal-breaker or serious legal/financial risk.
- Severity MEDIUM = notable concern worth negotiating.
- Severity LOW = minor issue, awareness only.
- If the document does not appear to be an offer of any kind, set recommendation to "DECLINE" and explain in reasoning that the document could not be analyzed as an offer.
- Always find at least one item per category if any offer content exists.
- Do not hallucinate clauses. Only flag what is actually present or conspicuously absent.
- Return ONLY the JSON object. No other text.`

function parseResult(raw: string): AnalysisResult {
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
  return JSON.parse(cleaned) as AnalysisResult
}

export async function analyzeOffer(text: string): Promise<AnalysisResult> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured. Add it to your .env.local file.')
  }

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Please analyze the following offer document:\n\n---\n${text.slice(0, 100_000)}\n---\n\nIdentify all red flags and green flags, then provide your recommendation.`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  const raw = response.choices[0].message.content ?? ''
  return parseResult(raw)
}

export async function analyzeOfferImage(imageData: string, mediaType: string): Promise<AnalysisResult> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured. Add it to your .env.local file.')
  }

  const response = await client.chat.completions.create({
    model: VISION_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:${mediaType};base64,${imageData}` },
          },
          {
            type: 'text',
            text: 'Please analyze the offer document shown in this image. Identify all red flags and green flags, then provide your recommendation.',
          },
        ],
      },
    ],
  })

  const raw = response.choices[0].message.content ?? ''
  return parseResult(raw)
}
