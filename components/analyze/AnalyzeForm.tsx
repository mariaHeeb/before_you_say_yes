'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileUploadZone } from './FileUploadZone'
import { TextInputArea } from './TextInputArea'
import { AnalysisResult } from './AnalysisResult'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Sparkles, Upload, AlignLeft, Info } from 'lucide-react'

type InputMode = 'file' | 'text'
type AnalysisData = {
  id: string; recommendation: string; reasoning: string; title: string
  flags: { id: string; type: string; title: string; description: string; severity: string | null }[]
}

export function AnalyzeForm() {
  const router = useRouter()
  const [mode, setMode] = useState<InputMode>('file')
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisData | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mode === 'file' && !file) { toast.error('Please select a file to analyze'); return }
    if (mode === 'text' && !text.trim()) { toast.error('Please enter some offer text'); return }
    setLoading(true); setResult(null)
    try {
      const formData = new FormData()
      if (mode === 'file' && file) formData.append('file', file)
      if (mode === 'text') formData.append('text', text)
      if (title.trim()) formData.append('title', title.trim())
      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? 'Analysis failed'); return }
      setResult({ ...data.analysis, flags: data.analysis.flags })
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="surface-card p-7">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Mode toggle */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Input method</p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { m: 'file', icon: Upload, label: 'Upload a File', sub: 'PDF, DOCX, image' },
                { m: 'text', icon: AlignLeft, label: 'Paste Text', sub: 'Type or paste directly' },
              ] as const).map(({ m, icon: Icon, label, sub }) => (
                <button key={m} type="button" onClick={() => setMode(m)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-2xl border-2 py-4 text-center transition-all duration-200',
                    mode === m
                      ? 'border-indigo-400 bg-gradient-to-b from-indigo-50 to-white text-indigo-700 shadow-sm shadow-indigo-100'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  <Icon className={cn('h-5 w-5', mode === m ? 'text-indigo-500' : 'text-slate-400')} />
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-[11px] font-medium opacity-60">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
              Title
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-slate-400">optional</span>
            </Label>
            <Input id="title" placeholder="e.g. Software Engineer — Acme Corp"
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="h-12 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-300 transition-colors focus:border-indigo-300 focus:ring-indigo-100" />
          </div>

          {/* Input area */}
          {mode === 'file' ? <FileUploadZone file={file} onFileChange={setFile} /> : <TextInputArea value={text} onChange={setText} />}

          {/* Tip */}
          <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />
            <span>The more complete the offer text, the more detailed and accurate the analysis will be.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'relative w-full overflow-hidden rounded-2xl px-6 py-5 text-base font-bold text-white transition-all duration-200',
              'bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600',
              'shadow-[0_4px_20px_rgba(79,70,229,0.45)]',
              'hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] hover:-translate-y-0.5',
              'active:translate-y-0 active:shadow-[0_2px_12px_rgba(79,70,229,0.4)]',
              'border border-indigo-500',
              'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0',
            )}
          >
            {/* Shine overlay */}
            {!loading && (
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
            )}
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Groq AI is reading every clause...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2.5">
                <Sparkles className="h-5 w-5" />
                <span>Analyze Offer</span>
                <span className="ml-1 opacity-70">→</span>
              </span>
            )}
          </button>
        </form>
      </div>

      {result && (
        <AnalysisResult
          recommendation={result.recommendation}
          reasoning={result.reasoning}
          flags={result.flags}
          title={result.title}
        />
      )}
    </div>
  )
}
