'use client'

import { RedFlagsList } from '@/components/flags/RedFlagsList'
import { GreenFlagsList } from '@/components/flags/GreenFlagsList'
import { CheckCircle2, XCircle } from 'lucide-react'

type Flag = { id?: string; title: string; description: string; type: string; severity?: string | null }
type Props = { recommendation: string; reasoning: string; flags: Flag[]; title?: string }

export function AnalysisResult({ recommendation, reasoning, flags, title }: Props) {
  const redFlags   = flags.filter((f) => f.type === 'RED')
  const greenFlags = flags.filter((f) => f.type === 'GREEN')
  const isAccept   = recommendation === 'ACCEPT'

  return (
    <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Verdict */}
      <div className="surface-card overflow-hidden">
        <div className={`h-1 w-full ${isAccept ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500'}`} />
        <div className="p-6">
          {title && <p className="mb-1 text-base font-semibold text-slate-800">{title}</p>}
          <p className="mb-5 text-xs text-slate-400">{redFlags.length} risk factors · {greenFlags.length} positive factors</p>
          <div className={`inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 text-lg font-bold ${
            isAccept
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
          }`}>
            {isAccept ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            {isAccept ? 'Accept this offer' : 'Decline this offer'}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="surface-card p-6">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">AI Analysis</p>
        <p className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">{reasoning}</p>
      </div>

      {/* Flags */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface-card p-6"><RedFlagsList flags={redFlags} /></div>
        <div className="surface-card p-6"><GreenFlagsList flags={greenFlags} /></div>
      </div>
    </div>
  )
}
