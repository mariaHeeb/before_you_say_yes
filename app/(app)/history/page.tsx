import Link from 'next/link'
import { verifySession } from '@/lib/dal'
import { prisma } from '@/lib/prisma'
import { HistoryTable } from '@/components/history/HistoryTable'
import { Sparkles, BarChart3 } from 'lucide-react'

export default async function HistoryPage() {
  const session = await verifySession()

  const analyses = await prisma.analysis.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      sourceType: true,
      recommendation: true,
      createdAt: true,
      userAccepted: true,
      employerReachedOut: true,
    },
  })

  const accepts  = analyses.filter((a) => a.recommendation === 'ACCEPT').length
  const declines = analyses.filter((a) => a.recommendation === 'DECLINE').length
  const deals    = analyses.filter((a) => a.employerReachedOut === true).length

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="hero-bg -mx-6 mb-10 px-6 pb-10 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="pill-badge mb-4 inline-flex">
                <BarChart3 className="h-3 w-3 text-indigo-500" />
                Your Analyses
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                History
              </h1>
              <p className="mt-3 text-[15px] text-slate-500">
                Every offer you&apos;ve analyzed — track your decisions and follow-ups.
              </p>
            </div>
            <Link href="/analyze" className="btn-cta inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm">
              <Sparkles className="h-4 w-4" />
              New Analysis
            </Link>
          </div>

          {/* Stats */}
          {analyses.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="surface-card p-4 text-center">
                <p className="text-2xl font-black text-slate-900">{analyses.length}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">Total Analyzed</p>
              </div>
              <div className="surface-card p-4 text-center">
                <p className="text-2xl font-black text-emerald-600">{accepts}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">AI Said Accept</p>
              </div>
              <div className="surface-card p-4 text-center">
                <p className="text-2xl font-black text-rose-600">{declines}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">AI Said Decline</p>
              </div>
              <div className="surface-card p-4 text-center">
                <p className="text-2xl font-black text-violet-600">{deals}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">Deals Closed 🎉</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl">
        {/* Column guide — always visible */}
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-500">Columns 4 & 5:</span>
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
            Yes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-500 text-[10px]">✕</span>
            No (col 5 only)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-dashed border-slate-300" />
            Not marked yet
          </span>
          <span className="text-indigo-500 font-medium">🎉 Mark col 5 as ✓ to celebrate a closed deal!</span>
        </div>

        {/* Table — always shown */}
        <HistoryTable
          rows={analyses.map((a) => ({
            ...a,
            createdAt: a.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  )
}
