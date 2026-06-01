import Link from 'next/link'
import { Scale, ArrowRight, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200/60">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-slate-900">Before You Say Yes</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="#features" className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">How it works</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost rounded-lg px-4 py-2 text-sm">Sign In</Link>
            <Link href="/register" className="btn-cta rounded-xl px-5 py-2.5 text-sm">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="hero-bg px-6 pb-24 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="pill-badge mb-8 animate-fade-in">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-indigo-500" />
              Powered by Groq AI · Free to use
            </div>

            <h1 className="animate-fade-up text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[4.5rem]">
              Read every clause.
              <br />
              <span className="gradient-text">Decide with confidence.</span>
            </h1>

            <p className="animate-fade-up delay-100 mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
              Upload any offer — employment contracts, business proposals, partnership agreements —
              and get an instant AI-powered analysis with ranked risks and opportunities.
            </p>

            <div className="animate-fade-up delay-200 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register" className="btn-cta inline-flex items-center gap-2 rounded-xl px-9 py-4 text-base shadow-xl shadow-indigo-300/30">
                Start Analyzing — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base text-slate-600">
                Sign in to your account
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> Results in under 30 seconds</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> Your data stays private</span>
            </div>
          </div>

          {/* ── Demo result preview ── */}
          <div className="animate-fade-up delay-400 mx-auto mt-20 max-w-2xl">
            <div className="surface-card overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
              <div className="px-6 pb-6 pt-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Analysis complete</p>
                    <p className="mt-0.5 text-base font-bold text-slate-800">Senior Software Engineer — TechCorp Inc.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                    <CheckCircle className="h-4 w-4" /> ACCEPT
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flag-card bg-rose-50 ring-1 ring-rose-100">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-rose-600">Non-compete clause</p>
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 ring-1 ring-rose-200">HIGH</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">18-month restriction is significantly broader than the industry standard of 6–12 months...</p>
                  </div>
                  <div className="flag-card bg-emerald-50 ring-1 ring-emerald-100">
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-600">Equity package</p>
                    <p className="text-xs leading-relaxed text-slate-500">0.5% options with 4-year vesting and 1-year cliff is competitive for a Series B company...</p>
                  </div>
                  <div className="flag-card bg-rose-50 ring-1 ring-rose-100">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-rose-600">IP assignment scope</p>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">MEDIUM</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">Clause may include work done outside company hours without carve-out...</p>
                  </div>
                  <div className="flag-card bg-emerald-50 ring-1 ring-emerald-100">
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-600">Remote work policy</p>
                    <p className="text-xs leading-relaxed text-slate-500">Fully remote with home office stipend of $2,000/year is above market standard...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────── */}
        <section id="features" className="section-tinted px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">Features</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Everything you need to decide confidently
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
                Built for anyone who signs contracts — job seekers, founders, freelancers, and executives.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { emoji: '📋', bg: 'bg-indigo-50', title: 'Full document analysis', desc: 'Every clause, paragraph, and condition is read and evaluated — nothing slips through.' },
                { emoji: '🚨', bg: 'bg-rose-50', title: 'Severity-ranked risks', desc: 'Red flags are ranked HIGH, MEDIUM, or LOW so you know exactly what to focus on first.' },
                { emoji: '✅', bg: 'bg-emerald-50', title: 'Green flags too', desc: 'We highlight the positive terms — good clauses and above-market benefits you should know about.' },
                { emoji: '⚡', bg: 'bg-amber-50', title: 'Results in seconds', desc: 'Powered by Groq, the fastest AI inference. Full analysis in under 30 seconds, any time.' },
                { emoji: '🔐', bg: 'bg-violet-50', title: 'Private & secure', desc: 'Your documents are processed for analysis only. Your history is visible to no one but you.' },
                { emoji: '⚖️', bg: 'bg-blue-50', title: 'Clear verdict', desc: 'A direct ACCEPT or DECLINE recommendation, backed by detailed reasoning — not vague suggestions.' },
              ].map(({ emoji, bg, title, desc }) => (
                <div key={title} className="surface-card surface-card-hover p-6">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} text-3xl shadow-sm`}>
                    {emoji}
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section id="how-it-works" className="section-white px-6 py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">How it works</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                From upload to decision in 3 steps
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-[19px] top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-indigo-200 via-violet-200 to-transparent md:block" />
              <div className="space-y-8">
                {[
                  {
                    n: '1',
                    gradient: 'from-indigo-500 to-indigo-600',
                    title: 'Upload or paste your offer',
                    desc: 'Drop a PDF, Word document, image, or paste the offer text directly. We handle every format.',
                    tags: ['PDF', 'DOCX', 'TXT', 'Images'],
                  },
                  {
                    n: '2',
                    gradient: 'from-violet-500 to-violet-600',
                    title: 'Groq AI reads every clause',
                    desc: 'Our AI analyzes the full document — identifying hidden risks, unfair terms, missing protections, and positive clauses.',
                    tags: ['Risk detection', 'Clause analysis', 'Benchmarking'],
                  },
                  {
                    n: '3',
                    gradient: 'from-purple-500 to-purple-600',
                    title: 'Get your verdict instantly',
                    desc: 'A clear ACCEPT or DECLINE recommendation, with ranked red flags and green flags explained in plain English.',
                    tags: ['Plain English', 'Ranked risks', 'Clear verdict'],
                  },
                ].map(({ n, gradient, title, desc, tags }) => (
                  <div key={n} className="relative flex gap-6 md:gap-8">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-black text-white shadow-md`}>
                      {n}
                    </div>
                    <div className="surface-card flex-1 p-6">
                      <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="rounded-lg bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <section className="section-dark px-6 py-20">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 text-center">
            {[
              { value: '< 30s', label: 'Analysis time' },
              { value: '3-tier', label: 'Risk severity levels' },
              { value: '100%', label: 'Free — no card needed' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</p>
                <p className="mt-2 text-sm font-medium text-indigo-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="hero-bg px-6 py-28 text-center">
          <div className="mx-auto max-w-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-300/40">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Don&apos;t sign anything blind.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-slate-500">
              Get a full AI analysis of your offer in under a minute. Free forever, no credit card.
            </p>
            <Link href="/register" className="btn-cta mt-8 inline-flex items-center gap-2 rounded-xl px-10 py-4 text-base shadow-xl shadow-indigo-300/30">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-5 text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:underline">Sign in</Link>
            </p>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <Scale className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Before You Say Yes</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 · Powered by Groq AI · All rights reserved</p>
        </div>
      </footer>

    </div>
  )
}
