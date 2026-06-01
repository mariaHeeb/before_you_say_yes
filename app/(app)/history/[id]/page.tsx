import { notFound } from 'next/navigation'
import { verifySession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'
import { AnalysisResult } from '@/components/analyze/AnalysisResult'
import { Calendar, FileText, MessageSquare } from 'lucide-react'

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  const { id } = await params

  const analysis = await prisma.analysis.findUnique({
    where: { id },
    include: { flags: true },
  })

  if (!analysis || analysis.userId !== session.userId) notFound()

  const date = new Date(analysis.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="hero-bg -mx-6 mb-10 px-6 pb-10 pt-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
            {analysis.sourceType === 'file'
              ? <FileText className="h-3.5 w-3.5" />
              : <MessageSquare className="h-3.5 w-3.5" />}
            {analysis.sourceType === 'file' ? 'File analysis' : 'Text analysis'}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {analysis.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-4 w-4" />
            {date}
            {analysis.fileName && <span className="ml-1 text-slate-300">· {analysis.fileName}</span>}
          </p>
        </div>
      </div>

      {/* ── Result ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl">
        <AnalysisResult
          recommendation={analysis.recommendation}
          reasoning={analysis.reasoning}
          flags={analysis.flags}
        />
      </div>
    </div>
  )
}
