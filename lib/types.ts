export type RedFlag = {
  title: string
  description: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
}

export type GreenFlag = {
  title: string
  description: string
}

export type AnalysisResult = {
  recommendation: 'ACCEPT' | 'DECLINE'
  reasoning: string
  redFlags: RedFlag[]
  greenFlags: GreenFlag[]
}

export type AnalysisSummary = {
  id: string
  title: string
  sourceType: string
  fileName: string | null
  recommendation: string
  createdAt: string
}

export type AnalysisDetail = AnalysisSummary & {
  originalText: string
  reasoning: string
  flags: {
    id: string
    type: string
    title: string
    description: string
    severity: string | null
  }[]
}
