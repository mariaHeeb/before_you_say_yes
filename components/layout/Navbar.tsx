'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Scale, History, LogOut, Scan, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function Navbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Signed out')
    router.push('/login')
  }

  const navLink = (href: string, icon: React.ReactNode, label: string) => {
    const active = pathname.startsWith(href)
    return (
      <Link href={href} className={cn(
        'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all',
        active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
      )}>
        {icon}{label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">

        {/* Logo + Home link */}
        <div className="flex items-center gap-4">
          <Link href="/analyze" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm shadow-indigo-200/60">
              <Scale className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">Before You Say Yes</span>
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <Link href="/" className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-indigo-600">
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:block">Home</span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5">
          {navLink('/analyze', <Scan className="h-3.5 w-3.5" />, 'Analyze')}
          {navLink('/history', <History className="h-3.5 w-3.5" />, 'History')}
        </nav>

        {/* User + sign out */}
        <div className="flex items-center gap-3">
          {userEmail && (
            <span className="hidden max-w-[160px] truncate text-xs text-slate-400 sm:block">
              {userEmail}
            </span>
          )}
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600">
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
