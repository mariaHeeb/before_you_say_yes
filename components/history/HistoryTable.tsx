'use client'

import { useState } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

type Row = {
  id: string
  title: string
  sourceType: string
  recommendation: string
  createdAt: string
  userAccepted: boolean | null        // col 4 — "I reached out"
  employerReachedOut: boolean | null  // col 5 — "Deal closed" (true=✓ deal, false=✗ no deal, null=empty)
}

async function patchAnalysis(id: string, data: Record<string, boolean | null>) {
  await fetch(`/api/history/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

function fireConfetti() {
  const duration = 2200
  const end = Date.now() + duration

  const colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444']

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 65,
      startVelocity: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      zIndex: 9999,
    })
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 65,
      startVelocity: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      zIndex: 9999,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

// ── Simple ✓ / empty checkbox (col 4) ──────────────────────────────────────
function CheckCell({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      title={checked ? 'Marked — click to unmark' : 'Click to mark ✓'}
      className={cn(
        'mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200',
        checked
          ? 'border-emerald-400 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          : 'border-dashed border-slate-300 bg-white text-slate-300 hover:border-indigo-400 hover:text-indigo-400',
      )}
    >
      {checked && <CheckCircle2 className="h-5 w-5" />}
    </button>
  )
}

// ── ✓ / ✗ / empty tri-state checkbox (col 5) ───────────────────────────────
function DealCell({
  value,
  onChange,
}: {
  value: boolean | null
  onChange: (v: boolean | null) => void
}) {
  function cycle() {
    if (value === null) onChange(true)        // empty → ✓ deal
    else if (value === true) onChange(false)  // ✓ → ✗ no deal
    else onChange(null)                       // ✗ → empty
  }

  return (
    <button
      onClick={cycle}
      title={
        value === null ? 'Click to mark deal closed ✓' :
        value === true ? 'Deal closed! Click to change' :
        'No deal — click to change'
      }
      className={cn(
        'mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200',
        value === null  && 'border-dashed border-slate-300 bg-white text-slate-300 hover:border-indigo-400 hover:text-indigo-400',
        value === true  && 'border-emerald-400 bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
        value === false && 'border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100',
      )}
    >
      {value === true  && <CheckCircle2 className="h-5 w-5" />}
      {value === false && <XCircle className="h-5 w-5" />}
    </button>
  )
}

export function HistoryTable({ rows: initialRows }: { rows: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initialRows)

  async function updateReachedOut(id: string, val: boolean) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, userAccepted: val } : r))
    await patchAnalysis(id, { userAccepted: val })
  }

  async function updateDealClosed(id: string, val: boolean | null) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, employerReachedOut: val } : r))
    if (val === true) fireConfetti()
    await patchAnalysis(id, { employerReachedOut: val })
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">

        {/* ── Header ── */}
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Offer
            </th>
            <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
              Date Checked
            </th>
            <th className="px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
              AI Decision
            </th>
            <th className="px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
              I Reached Out
            </th>
            <th className="px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
              Deal Closed
            </th>
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <p className="text-2xl mb-2">📭</p>
                <p className="font-semibold text-slate-500">No offers analyzed yet</p>
                <p className="mt-1 text-sm text-slate-400">
                  Go to <span className="font-semibold text-indigo-500">Analyze</span> to check your first offer — it appears here instantly.
                </p>
              </td>
            </tr>
          )}
          {rows.map((row) => {
            const date = new Date(row.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })
            const isAccept = row.recommendation === 'ACCEPT'
            const dealClosed = row.employerReachedOut

            return (
              <tr
                key={row.id}
                className={cn(
                  'group transition-colors hover:bg-slate-50/60',
                  dealClosed === true && 'bg-emerald-50/40',
                )}
              >
                {/* Col 1 — Offer name */}
                <td className="px-6 py-4">
                  <Link href={`/history/${row.id}`} className="group/link inline-flex items-start gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 transition-colors group-hover/link:text-indigo-700">
                        {row.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {row.sourceType === 'file' ? '📄 File' : '📝 Text'}
                      </p>
                    </div>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover/link:opacity-100" />
                  </Link>
                </td>

                {/* Col 2 — Date */}
                <td className="px-4 py-4 text-slate-500 whitespace-nowrap">{date}</td>

                {/* Col 3 — AI Decision */}
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1',
                      isAccept
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-rose-50 text-rose-700 ring-rose-200',
                    )}>
                      {isAccept ? '✓ ACCEPT' : '✕ DECLINE'}
                    </span>
                  </div>
                </td>

                {/* Col 4 — I reached out */}
                <td className="px-4 py-4">
                  <CheckCell
                    checked={!!row.userAccepted}
                    onChange={(v) => updateReachedOut(row.id, v)}
                  />
                </td>

                {/* Col 5 — Deal closed */}
                <td className="px-4 py-4">
                  <DealCell
                    value={row.employerReachedOut}
                    onChange={(v) => updateDealClosed(row.id, v)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
