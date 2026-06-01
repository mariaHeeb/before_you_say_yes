import Link from 'next/link'
import { Scale, CheckCircle2, ShieldCheck, Zap, Lock } from 'lucide-react'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">

      {/* ── Left panel ─────────────────────────────────────────── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 lg:flex lg:w-[45%]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/5" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03]" />
        </div>

        <div className="relative">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur transition-colors group-hover:bg-white/20">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Before You Say Yes</span>
          </Link>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-tight text-white">
            Make smarter decisions<br />about every offer.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-indigo-200">
            AI-powered analysis of any contract, proposal, or agreement — in under 30 seconds.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: Zap, text: 'Full analysis in under 30 seconds' },
              { icon: ShieldCheck, text: 'Every risk ranked HIGH, MEDIUM, or LOW' },
              { icon: CheckCircle2, text: 'Green flags and positives highlighted too' },
              { icon: Lock, text: 'Your data is private and secure' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-indigo-200" />
                </div>
                <span className="text-sm font-medium text-indigo-100">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-indigo-200">Sample result</p>
              <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 ring-1 ring-emerald-400/30">✓ ACCEPT</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">Software Engineer — TechCorp</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 rounded-lg bg-rose-500/15 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span className="text-[11px] text-rose-200">Non-compete clause — HIGH risk</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-emerald-200">Equity package — above market</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="text-sm text-indigo-300">Free forever · No credit card required · Powered by Groq AI</p>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col bg-white">
        <div className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-slate-400">
            No account?{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700">Sign up free</Link>
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200/60">
                <Scale className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-900">Before You Say Yes</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back</h1>
            <p className="mt-2 text-[15px] text-slate-500">Sign in to continue to your account.</p>
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
