import { AnalyzeForm } from '@/components/analyze/AnalyzeForm'
import { ShieldCheck, Clock, Star } from 'lucide-react'

export default function AnalyzePage() {
  return (
    <div>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="hero-bg -mx-6 mb-12 px-6 pb-12 pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill-badge mb-5 inline-flex">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-indigo-500" />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Analyze an <span className="gradient-text">Offer</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500">
            Upload a file or paste the offer text. Groq AI reads every clause and gives you
            a ranked breakdown of risks, positives, and a clear verdict.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Clock, label: 'Results in under 30 seconds' },
              { icon: ShieldCheck, label: 'Risks ranked by severity' },
              { icon: Star, label: 'Green flags highlighted too' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Icon className="h-3.5 w-3.5 text-indigo-500" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl">
        <AnalyzeForm />
      </div>
    </div>
  )
}
